/* Native link works without JS. Enhancement removes the intro after entry. */
(() => {
  'use strict';
  const welcome=document.querySelector('.space-welcome');
  const site=document.getElementById('site');
  const videos=welcome?[...welcome.querySelectorAll('video')]:[];
  const primary=welcome&&welcome.querySelector('.space-welcome-video');
  const backdrop=welcome&&welcome.querySelector('.space-welcome-backdrop');
  if(!welcome||!site)return;
  const videoSources=primary?[...primary.querySelectorAll('source[src]')].map(source=>({
    source,
    query:source.media?window.matchMedia(source.media):null
  })):[];
  function selectVideoSource(){
    const selected=videoSources.find(({query})=>!query||query.matches);
    if(selected&&primary.src!==selected.source.src){
      primary.src=selected.source.src;
      primary.load();
    }
  }
  videoSources.forEach(({query})=>query&&query.addEventListener('change',sync));
  const meteor=welcome.querySelector('.space-shooting-star');
  function alignMeteor(){
    if(!meteor||!window.matchMedia('(min-width: 769px)').matches)return;
    const width=welcome.clientWidth;
    const height=welcome.clientHeight;
    if(!width||!height)return;
    // From the right-hand horizon to beyond the top-left, tail behind the head.
    const angle=Math.atan2(-.9*height,-1.1*width);
    meteor.style.setProperty('--meteor-angle',angle+'rad');
  }
  window.addEventListener('resize',alignMeteor);
  function alignVideoLayers(){
    if(primary&&backdrop&&Number.isFinite(primary.currentTime)&&Math.abs(primary.currentTime-backdrop.currentTime)>.12){
      backdrop.currentTime=primary.currentTime;
    }
  }
  if(primary){
    primary.addEventListener('playing',alignVideoLayers);
    primary.addEventListener('seeked',alignVideoLayers);
  }
  function sync(){
    const entered=Boolean(location.hash);
    welcome.hidden=entered;
    selectVideoSource();
    alignMeteor();
    document.body.classList.toggle('site-entered',entered);
    videos.forEach(video=>{
      if(entered)video.pause();
      else if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)video.play().catch(()=>{});
    });
  }
  sync();
  welcome.querySelector('.space-enter').addEventListener('click',event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    history.pushState(null,'','#site');
    welcome.hidden=true;
    document.body.classList.add('site-entered');
    site.scrollIntoView({behavior:'instant',block:'start'});
    site.focus({preventScroll:true});
  });
  window.addEventListener('popstate',sync);
  window.addEventListener('hashchange',sync);
})();
