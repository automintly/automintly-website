/* A true 3D density field circulates within a spherical
   cloud shell. Fixed camera/planet/sky; no video seek, reverse or crossfade.
   The complete circulation is 24 hours. ?phase=0..1 freezes its exact phase.
   ?time=seconds freezes an elapsed time. Only the cloud canvas is ray-marched. */
(() => {
  'use strict';
  const root = document.querySelector('.cloud-preview');
  const canvas = root?.querySelector('.cloud-surface');
  if (!canvas) return;
  const production = root.dataset.cloudDesktop === 'true';
  const desktop = matchMedia('(min-width: 769px)');
  const eligible = () => !document.hidden && !root.hidden && (!production || desktop.matches);
  const status = root.querySelector('.cloud-status');
  const toggle = document.getElementById('cloud-pause');
  const debug = root.querySelector('.cloud-debug');
  const params = new URLSearchParams(location.search);
  const qualitySelect = document.getElementById('cloud-quality');
  let quality = ['balanced', 'high', '4k'].includes(params.get('quality')) ? params.get('quality') : production ? '4k' : 'balanced';
  if (qualitySelect) qualitySelect.value = quality;
  const cycleSeconds = 86400;
  const wrap = value => ((value % 1) + 1) % 1;
  const phaseArg = params.has('phase') ? Number(params.get('phase')) : NaN;
  const timeArg = params.has('time') ? Number(params.get('time')) : NaN;
  const fixedPhase = Number.isFinite(phaseArg) ? wrap(phaseArg)
    : Number.isFinite(timeArg) ? wrap(timeArg / cycleSeconds) : null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let running = fixedPhase === null && !reduced.matches;
  let elapsed = 0, lastTime = null, frame = 0, renderer = null, lost = false;
  let frameCount = 0, frameWindow = 0, measuredFps = 0;

  const vertex = `#version 300 es
    in vec2 aPosition;
    out vec2 vUV;
    void main(){ vUV = aPosition * .5 + .5; gl_Position = vec4(aPosition,0.,1.); }`;
  const fragment = `#version 300 es
    precision highp float;
    precision highp sampler3D;
    in vec2 vUV;
    uniform sampler3D uNoise;
    uniform sampler3D uBillow;
    uniform vec2 uCover;
    uniform vec2 uRotation;
    out vec4 outColor;
    const float R = 500.;
    const float INNER = 500.12;
    const float OUTER = 501.4;
    const vec3 EYE = vec3(0.,504.,0.);
    float noise3(vec3 p) {
      vec3 f=fract(p); f=f*f*(3.-2.*f);
      return texture(uNoise,(floor(p)+f+.5)/64.).r;
    }
    vec3 wind(vec3 p) {
      // Sampling the field with the opposite rotation advects the visible
      // formations toward the camera (negative z at the visible north pole).
      return vec3(p.x, uRotation.x*p.y-uRotation.y*p.z,
                         uRotation.y*p.y+uRotation.x*p.z);
    }
    float body(vec3 p) {
      float h = (length(p) - INNER) / (OUTER - INNER);
      if (h <= 0. || h >= 1.) return 0.;
      vec3 q = wind(p);
      float weather = noise3(q * .10 + 17.);
      // Connected broad forms plus rounded cellular billows; finer cellular
      // erosion affects their edges. All fields share the same rigid wind.
      float broad = noise3(q * 1.15) * .57 + noise3(q * 2.35 + 9.2) * .28
                  + noise3(q * 4.79 + 1.3) * .15;
      float billow = texture(uBillow,q * .17).r;
      float detail = texture(uBillow,q * .59 + .21).r * .65
                   + texture(uBillow,q * 1.19 + .13).r * .35;
      float n = broad*.58 + billow*.42;
      float localHeight = h / (.48 + .75*weather);
      float threshold = .32 + .23*localHeight*localHeight - .09*weather;
      float erosion = (1.-detail)*.17;
      float shape = smoothstep(threshold+erosion,threshold+erosion+.13,n);
      float edge = smoothstep(0., .12, h) * (1.-smoothstep(.57, 1., localHeight));
      return shape * edge;
    }
    vec2 sphere(vec3 ro, vec3 rd, float radius) {
      float b = dot(ro,rd), c = dot(ro,ro)-radius*radius;
      float d = b*b-c;
      if(d < 0.) return vec2(-1.);
      d = sqrt(d); return vec2(-b-d,-b+d);
    }
    float shadowBody(vec3 p) {
      // Lighting needs the broad optical mass, not every eroded edge. This
      // lower-frequency estimate keeps full detail on camera-facing samples.
      float h=(length(p)-INNER)/(OUTER-INNER);
      if(h<=0.||h>=1.) return 0.;
      vec3 q=wind(p);
      float weather=noise3(q*.10+17.);
      float broad=noise3(q*1.15)*.57+noise3(q*2.35+9.2)*.28+.075;
      float billow=texture(uBillow,q*.17).r;
      float localHeight=h/(.48+.75*weather);
      float threshold=.32+.23*localHeight*localHeight-.09*weather+.085;
      float shape=smoothstep(threshold,threshold+.13,broad*.58+billow*.42);
      return shape*smoothstep(0.,.12,h)*(1.-smoothstep(.57,1.,localHeight));
    }
    float sunlight(vec3 p, vec3 sun) {
      float optical = 0.;
      for(int j=0;j<5;j++) {
        float t = .15 + float(j)*.5;
        optical += shadowBody(p + sun*t) * .5;
      }
      return exp(-optical * 4.2);
    }
    void main() {
      vec2 scene = (vec2(vUV.x,1.-vUV.y)-.5)*uCover+.5;
      // This camera places the shell limb at the photographed curved horizon.
      vec3 rd = normalize(vec3((scene.x-.68)*2.05, .620-scene.y, 1.));
      float b=dot(EYE,rd), discriminant=b*b-dot(EYE,EYE)+OUTER*OUTER;
      float edgeWidth=max(fwidth(discriminant)*1.25,.001);
      float limb=smoothstep(-edgeWidth,edgeWidth,discriminant);
      if(b >= 0. || limb <= 0.) { outColor=vec4(0.); return; }
      float rootDistance=sqrt(max(discriminant,.001));
      vec2 outer=vec2(-b-rootDistance,-b+rootDistance);
      vec2 inner = sphere(EYE,rd,INNER);
      float start = max(outer.x,0.);
      float end = inner.x > start ? inner.x : outer.y;
      end = min(end, start + 28.);
      vec3 sun = normalize(vec3(-.76,.07,.65));
      float warm = exp(-pow((scene.x-.38)/.42,2.));
      vec3 ambient = vec3(.08,.14,.215);
      vec3 direct = mix(vec3(.72,.84,.97),vec3(1.25,.68,.27),warm);
      vec3 accumulation = vec3(0.);
      float transmittance = 1.;
      float stepSize = (end-start)/96.;
      for(int i=0;i<96;i++) {
        float t=start+(float(i)+.5)*stepSize;
        vec3 p=EYE+rd*t;
        float density=body(p);
        if(density>.002) {
          float h=clamp((length(p)-INNER)/(OUTER-INNER),0.,1.);
          float light=sunlight(p,sun);
          vec3 color=ambient*(.65+.50*h)+direct*(.08+.92*light);
          // Multiple scattering within the cloud, not an overlaid fog sheet.
          color+=direct*.06*(1.-light);
          float alpha=1.-exp(-density*stepSize*8.0);
          accumulation+=transmittance*color*alpha;
          transmittance*=1.-alpha;
          if(transmittance<.008) break;
        }
      }
      vec3 ground=vec3(.018,.044,.068);
      vec3 result=accumulation+transmittance*ground;
      float distanceAir=smoothstep(12.,48.,start);
      vec3 air=mix(vec3(.13,.26,.36),vec3(.87,.42,.15),warm);
      result=mix(result,air,distanceAir*.86);
      vec2 sunUV=(scene-vec2(.379,.744))/vec2(.029,.040);
      result+=vec3(1.2,.85,.39)*exp(-dot(sunUV,sunUV));
      result=pow(max(result,vec3(0.)),vec3(.80));
      // Subpixel edge blending at the curved limb; opaque below it so no
      // original stationary cloud photograph shows through the moving layer.
      outColor=vec4(result,limb);
    }`;

  function fail(message, error) {
    lost=true;stop();root.dataset.cloudState='unavailable';
    if(status)status.textContent=message;
    if(toggle)toggle.disabled=true;
    if(error) console.error('Volumetric cloud preview:',error);
  }
  function compile(gl,type,source) {
    const shader=gl.createShader(type); gl.shaderSource(shader,source); gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }
  function noiseVolume() {
    // Deterministic volumetric data generated locally, no image or video edits.
    let seed=14892;
    const bytes=new Uint8Array(64*64*64);
    for(let i=0;i<bytes.length;i++) {
      seed^=seed<<13; seed^=seed>>>17; seed^=seed<<5;
      bytes[i]=(seed>>>0)&255;
    }
    return bytes;
  }
  function billowVolume() {
    // Seamless inverted cellular distance: every neighbor uses wrapped feature
    // indices while distances stay in the unwrapped neighboring cell.
    const size=64,cells=8,features=new Float32Array(cells*cells*cells*3);
    let seed=781245;
    for(let i=0;i<features.length;i++) {
      seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;
      features[i]=.15+.70*(seed>>>0)/4294967296;
    }
    const bytes=new Uint8Array(size*size*size);
    for(let z=0;z<size;z++) for(let y=0;y<size;y++) for(let x=0;x<size;x++) {
      const px=(x+.5)*cells/size,py=(y+.5)*cells/size,pz=(z+.5)*cells/size;
      const ix=Math.floor(px),iy=Math.floor(py),iz=Math.floor(pz);
      let nearest=3;
      for(let dz=-1;dz<=1;dz++) for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) {
        const cx=ix+dx,cy=iy+dy,cz=iz+dz;
        const index=(((cz+cells)%cells*cells+(cy+cells)%cells)*cells+(cx+cells)%cells)*3;
        const ox=cx+features[index]-px,oy=cy+features[index+1]-py,oz=cz+features[index+2]-pz;
        nearest=Math.min(nearest,ox*ox+oy*oy+oz*oz);
      }
      bytes[(z*size+y)*size+x]=Math.round(Math.max(0,1-Math.sqrt(nearest)/1.15)*255);
    }
    return bytes;
  }
  function phase(){ return fixedPhase===null ? wrap(elapsed/cycleSeconds) : fixedPhase; }
  function label(){ if(toggle){toggle.textContent=running?'Pause clouds':'Play clouds'; toggle.setAttribute('aria-pressed',String(!running));} }
  function render() {
    if(!renderer||lost) return;
    const {gl,rotation}=renderer, p=phase(), angle=p*Math.PI*2;
    gl.uniform2f(rotation,Math.cos(angle),Math.sin(angle));
    gl.drawArrays(gl.TRIANGLES,0,3);
    root.dataset.cloudPhase=p.toFixed(9);
    root.dataset.cloudElapsed=elapsed.toFixed(3);
    root.dataset.cloudFps=measuredFps.toFixed(1);
    root.dataset.cloudQuality=quality;
    if(debug&&params.has('debug')) {
      debug.hidden=false;
      debug.value=`phase ${p.toFixed(9)} · forward volume\n${canvas.width} × ${canvas.height} · ${measuredFps.toFixed(1)} fps`;
    }
  }
  function resize() {
    if(!renderer||!eligible()||lost) return;
    const box=canvas.getBoundingClientRect();
    const limit=quality==='4k'?3840:quality==='high'?1920:1280;
    const pixelBudget=quality==='4k'?3840*2160:quality==='high'?1920*1080:1280*720;
    // Explicit 4K supersamples a 16:9 scene to 3840x2160 without changing its
    // CSS framing. Other modes retain their device-density performance caps.
    const density=quality==='4k'?limit/Math.max(1,box.width):(window.devicePixelRatio||1);
    const heightLimit=quality==='4k'?2160:Infinity;
    const scale=Math.min(density,limit/Math.max(1,box.width),heightLimit/Math.max(1,box.height),Math.sqrt(pixelBudget/Math.max(1,box.width*box.height)));
    canvas.width=Math.max(1,Math.round(box.width*scale));
    canvas.height=Math.max(1,Math.round(box.height*scale));
    const aspect=box.width/box.height;
    renderer.gl.viewport(0,0,canvas.width,canvas.height);
    renderer.gl.uniform2f(renderer.cover,Math.min(1,aspect/(16/9)),Math.min(1,(16/9)/aspect));
    render();
  }
  function tick(time) {
    frame=0;
    if(!running||!eligible()||lost) {lastTime=null;return;}
    if(lastTime!==null) {
      const delta=Math.min((time-lastTime)/1000,.1);
      elapsed+=delta; frameWindow+=(time-lastTime)/1000; frameCount++;
      if(frameWindow>=1) {measuredFps=frameCount/frameWindow;frameWindow=0;frameCount=0;}
    }
    lastTime=time; render(); frame=requestAnimationFrame(tick);
  }
  function resume(){lastTime=null;if(renderer&&running&&eligible()&&!lost&&!frame)frame=requestAnimationFrame(tick);}
  function stop(){cancelAnimationFrame(frame);frame=0;lastTime=null;}
  function start() {
    const gl=canvas.getContext('webgl2',{alpha:true,antialias:false,depth:false,stencil:false,premultipliedAlpha:false});
    if(!gl){fail('Animated clouds unavailable here. Showing the still scene.');return;}
    try {
      const program=gl.createProgram();
      const vs=compile(gl,gl.VERTEX_SHADER,vertex),fs=compile(gl,gl.FRAGMENT_SHADER,fragment);
      gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
      gl.deleteShader(vs);gl.deleteShader(fs);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      const texture=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_3D,texture);
      gl.texImage3D(gl.TEXTURE_3D,0,gl.R8,64,64,64,0,gl.RED,gl.UNSIGNED_BYTE,noiseVolume());
      gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      for(const direction of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T,gl.TEXTURE_WRAP_R])gl.texParameteri(gl.TEXTURE_3D,direction,gl.REPEAT);
      gl.uniform1i(gl.getUniformLocation(program,'uNoise'),0);
      const billowTexture=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_3D,billowTexture);
      gl.texImage3D(gl.TEXTURE_3D,0,gl.R8,64,64,64,0,gl.RED,gl.UNSIGNED_BYTE,billowVolume());
      gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      for(const direction of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T,gl.TEXTURE_WRAP_R])gl.texParameteri(gl.TEXTURE_3D,direction,gl.REPEAT);
      gl.uniform1i(gl.getUniformLocation(program,'uBillow'),1);
      renderer={gl,program,buffer,texture,billowTexture,rotation:gl.getUniformLocation(program,'uRotation'),cover:gl.getUniformLocation(program,'uCover')};
      root.dataset.cloudState='ready';root.dataset.cloudCycleSeconds=String(cycleSeconds);
      if(status)status.textContent='';if(toggle)toggle.disabled=fixedPhase!==null;label();resize();resume();
    } catch(error){fail('Animated clouds could not start. Showing the still scene.',error);}
  }
  function lifecycle(){
    if(!eligible()){stop();return;}
    if(lost)return;
    if(!renderer)start();
    else {resize();resume();}
  }
  toggle?.addEventListener('click',()=>{userPaused=running;running=!running;label();if(running)resume();else stop();});
  reduced.addEventListener('change',event=>{if(fixedPhase!==null)return;running=!event.matches&&!userPaused;label();if(running)resume();else stop();});
  document.addEventListener('visibilitychange',lifecycle);
  desktop.addEventListener('change',lifecycle);
  new MutationObserver(lifecycle).observe(root,{attributes:true,attributeFilter:['hidden']});
  window.addEventListener('resize',resize);
  qualitySelect?.addEventListener('change',()=>{quality=qualitySelect.value;resize();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fail('Graphics paused. Reload the page to resume.');});
  lifecycle();
})();
