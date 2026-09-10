/* Native link works without JS. Enhancement removes the intro after entry. */
(() => {
  'use strict';
  const welcome=document.querySelector('.space-welcome');
  const site=document.getElementById('site');
  if(!welcome||!site)return;
  function sync(){const entered=Boolean(location.hash);welcome.hidden=entered;document.body.classList.toggle('site-entered',entered);}
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
