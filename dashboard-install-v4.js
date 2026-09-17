'use strict';

(function () {
  const downloadLink = document.getElementById('download-dashboard');
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

  downloadLink.addEventListener('click', function () {
    status.textContent = 'Download started. Open automintly-dashboard.html from your Downloads folder to reach protected sign-in.';
  });
})();
