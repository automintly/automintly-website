'use strict';

(function () {
  const downloadButton = document.getElementById('download-dashboard');
  const status = document.getElementById('install-status');
  const protectedDashboardUrl = 'https://automintly-platform-staging.onrender.com/platform/login';
  const localDashboardUrl = new URL('/platform', location.origin);
  localDashboardUrl.port = '3100';
  const localPreview = ['localhost', '127.0.0.1'].includes(location.hostname);
  const dashboardUrl = localPreview ? localDashboardUrl.href : protectedDashboardUrl;
  document.querySelectorAll('[data-dashboard-access]').forEach(function (link) { link.href = dashboardUrl; });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('dashboard-sw.js').catch(function () {
        status.textContent = 'The dashboard shortcut is still available. Offline launcher caching is not available on this device.';
      });
    });
  }

  downloadButton.addEventListener('click', function () {
    const safeTarget = dashboardUrl.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
    const launcher = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="0;url=${safeTarget}"><title>Open Automintly Dashboard</title></head>
<body><p>Opening your protected Automintly dashboard…</p><p><a href="${safeTarget}">Continue to secure sign-in</a></p></body></html>`;
    const blob = new Blob([launcher], { type: 'text/html;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = 'automintly-dashboard.html';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 0);
    status.textContent = 'Downloaded automintly-dashboard.html. Open that file to sign in to your own workspace.';
  });
})();
