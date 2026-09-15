'use strict';

(function () {
  const installButton = document.getElementById('install-dashboard');
  const status = document.getElementById('install-status');
  let installPrompt = null;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('dashboard-sw.js').catch(function () {
        status.textContent = 'The dashboard remains available in your browser. Installation is not available on this device right now.';
      });
    });
  }

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    installPrompt = event;
    status.textContent = 'This browser is ready to install the Automintly dashboard launcher.';
  });

  window.addEventListener('appinstalled', function () {
    installPrompt = null;
    installButton.textContent = 'Dashboard app installed';
    status.textContent = 'Automintly has been added to this device.';
  });

  installButton.addEventListener('click', async function () {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      installPrompt = null;
      status.textContent = choice.outcome === 'accepted'
        ? 'Installation accepted. Automintly will appear in your app list shortly.'
        : 'Installation was cancelled. You can keep using the browser link.';
      return;
    }

    const isAppleMobile = /iphone|ipad|ipod/i.test(navigator.userAgent);
    status.textContent = isAppleMobile
      ? 'On iPhone or iPad: tap Share, then choose Add to Home Screen.'
      : 'Open your browser menu and choose Install app or Add to home screen. You can also keep using the dashboard demo in your browser.';
  });
})();
