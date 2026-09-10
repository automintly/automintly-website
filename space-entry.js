/* Native link works without JS. Enhancement removes the intro after entry. */
(() => {
  'use strict';
  const welcome=document.querySelector('.space-welcome');
  const site=document.getElementById('site');
  const videos=welcome?[...welcome.querySelectorAll('video')]:[];
  const primary=welcome&&welcome.querySelector('.space-welcome-video');
  const backdrop=welcome&&welcome.querySelector('.space-welcome-backdrop');
  if(!welcome||!site)return;
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
