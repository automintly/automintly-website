'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
let api = {};
try { api = require('./testimonials.js'); } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }
test('testimonial submissions use the registered private form without publishing email', () => {
  assert.equal(typeof api.createSubmission, 'function', 'Testimonial submission support is missing');
  const result = api.createSubmission({ name: ' Alex ', email: ' alex@example.com ', company: ' Roofer ', review: 'Helpful setup.', consent: true });
  const fields = new URLSearchParams(result);
  assert.equal(fields.get('form-name'), 'health-check');
  assert.equal(fields.get('name'), 'Alex');
  assert.equal(fields.get('email'), 'alex@example.com');
  assert.equal(fields.get('message'), 'TESTIMONIAL FOR REVIEW\nHelpful setup.');
  assert.equal(fields.get('consent'), 'yes');
});
test('missing permission and blank reviews cannot be submitted', () => {
  assert.equal(typeof api.createSubmission, 'function');
  assert.throws(() => api.createSubmission({name:'Alex',email:'alex@example.com',review:'Hello',consent:false}));
  assert.throws(() => api.createSubmission({name:'Alex',email:'alex@example.com',review:'   ',consent:true}));
});
test('oversized fields are rejected and review text remains data', () => {
  assert.equal(typeof api.createSubmission, 'function');
  assert.throws(() => api.createSubmission({name:'Alex',email:'alex@example.com',review:'a'.repeat(1501),consent:true}));
  const payload = api.createSubmission({name:'Alex',email:'alex@example.com',review:'<script>alert(1)</script>&x=y',consent:true});
  assert.equal(new URLSearchParams(payload).get('message'), 'TESTIMONIAL FOR REVIEW\n<script>alert(1)</script>&x=y');
});
