(function () {
  'use strict';
  function createSubmission(input) {
    var name = String(input.name || '').trim();
    var email = String(input.email || '').trim();
    var company = String(input.company || '').trim();
    var review = String(input.review || '').trim();
    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || company.length > 160 || !review || review.length > 1500 || input.consent !== true) {
      throw new Error('Please complete the required fields and publication permission.');
    }
    return new URLSearchParams({
      'form-name': 'health-check', 'bot-field': String(input.honeypot || ''),
      name: name, email: email, company: company,
      message: 'TESTIMONIAL FOR REVIEW\n' + review,
      current_channels: 'Website testimonial submission',
      outcome_tracking: 'Private submission. Publish only after approval; never publish email.',
      consent: 'yes'
    }).toString();
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { createSubmission: createSubmission };
  if (typeof document === 'undefined') return;
  var toggle = document.getElementById('testimonial-toggle');
  var panel = document.getElementById('testimonial-panel');
  var form = document.getElementById('testimonial-form');
  if (!toggle || !panel || !form) return;
  toggle.addEventListener('click', function () {
    panel.hidden = !panel.hidden;
    toggle.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) document.getElementById('t-name').focus();
  });
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    var status = document.getElementById('testimonial-status');
    var submit = form.querySelector('button[type="submit"]');
    if (submit.disabled) return;
    if (!form.reportValidity()) return;
    try {
      var body = createSubmission({
        name: form.elements.name.value, email: form.elements.email.value,
        company: form.elements.company.value, review: form.elements.review.value,
        consent: form.elements.consent.checked, honeypot: form.elements['bot-field'].value
      });
      submit.disabled = true;
      status.textContent = 'Sending your testimonial for review…';
      var response = await fetch('https://sweet-puffpuff-9243c4.netlify.app/', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body, mode: 'no-cors'
      });
      if (response.type !== 'opaque' && !response.ok) throw new Error('Submission failed');
      status.textContent = response.type === 'opaque'
        ? 'Submission sent for review, but this browser cannot confirm receipt. For confirmation, use the direct-email link below. Your review has not been published.'
        : 'Thank you. Your testimonial was received for review and has not been published.';
      if (response.type !== 'opaque') form.reset();
    } catch (error) {
      status.textContent = 'We could not confirm your submission. Please check the required fields, try again, or use the direct-email link below.';
    } finally {
      submit.disabled = false;
    }
  });
})();
