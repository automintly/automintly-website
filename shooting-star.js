/* Desktop-only near-camera flyby. Mobile retains its original CSS animation.
   Pixel-space transform/opacity
   tracks are built only on resize; the browser interpolates them, with no JS
   animation loop, video seeking, blur filter, or changes to the native UI. */
(() => {
  'use strict';
  const root=document.querySelector('.space-welcome');
  const meteor=root?.querySelector('.space-shooting-star');
  if(!meteor||typeof meteor.animate!=='function')return;
  const scene=meteor.parentElement||root;
  const desktop=window.matchMedia('(min-width: 769px)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const cycle=18000,flight=2700,delay=4000,samples=180;
  const params=new URLSearchParams(location.search);
  const requestedPhase=params.has('meteor-phase')?Number(params.get('meteor-phase')):NaN;
  const fixedPhase=Number.isFinite(requestedPhase)&&requestedPhase>=0&&requestedPhase<=1?requestedPhase:null;
  let animation=null,width=0,height=0,desktopTime=null;

  function keyframes(w,h){
    const angle=Math.atan2(-.82*h,-1.16*w);
    const frames=[];
    for(let i=0;i<=samples;i++){
      const t=i/samples;
      // Soft projected acceleration replaces the old last-instant velocity
      // spike. Size still tracks perspective: scale=.3*(1+23*progress).
      const progress=t*t*t;
      const x=(.84-1.16*progress)*w,y=(.66-.82*progress)*h;
      const scale=.3+6.9*progress;
      const opacity=t<.07?t/.07:progress>.88?(1-progress)/.12:1;
      frames.push({offset:t*flight/cycle,opacity,
        transform:`translate3d(${x}px,${y}px,0) rotate(${angle}rad) scale(${scale})`});
    }
    frames.push({...frames[frames.length-1],offset:1});
    return frames;
  }
  function sync(){
    if(!desktop.matches){
      // A paused fill:both animation would still override mobile's transform.
      // Cancel it completely so the untouched mobile CSS owns motion again.
      if(animation){desktopTime=animation.currentTime;animation.cancel();animation=null;}
      width=0;height=0;
      delete root.dataset.meteorRenderer;
      delete root.dataset.meteorFrameCount;
      delete root.dataset.meteorMotion;
      return;
    }
    if(root.hidden||document.hidden||reduced.matches){
      if(animation)animation.pause();
      root.dataset.meteorMotion=reduced.matches?'reduced':'paused';
      return;
    }
    const w=scene.clientWidth,h=scene.clientHeight;
    if(!w||!h)return;
    if(!animation||w!==width||h!==height){
      const time=animation?.currentTime??desktopTime;
      if(animation)animation.cancel();
      width=w;height=h;
      animation=meteor.animate(keyframes(w,h),{duration:cycle,delay,iterations:Infinity,easing:'linear',fill:'both'});
      if(Number.isFinite(time))animation.currentTime=time;
      root.dataset.meteorRenderer='compositor';
      root.dataset.meteorFrameCount=String(samples+2);
    }
    if(fixedPhase!==null){
      animation.pause();animation.currentTime=delay+fixedPhase*flight;
      root.dataset.meteorMotion='frozen';
    }else{
      if(animation.playState!=='running')animation.play();
      root.dataset.meteorMotion='running';
    }
  }
  window.addEventListener('resize',sync);
  desktop.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['hidden']});
  if(typeof ResizeObserver==='function')new ResizeObserver(sync).observe(scene);
  sync();
})();
