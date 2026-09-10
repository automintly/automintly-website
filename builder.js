(() => {
  'use strict';

  const products = [
    {id:'ai-receptionist',name:'AI Receptionist',category:'Customer service',description:'Answers calls, handles approved questions, captures leads, and prepares booking handoffs.',price:1995,points:3,goals:['calls','support','booking'],keywords:['answer calls','phone','receptionist','after hours'],tools:'Phone provider, calendar, CRM'},
    {id:'missed-call-text-back',name:'Missed-Call Text Back',category:'Customer service',description:'Texts eligible callers after an unanswered call and responds using approved FAQs.',price:995,points:2,goals:['calls','leads'],keywords:['missed call','unanswered call','call back','text back'],tools:'Twilio or compatible phone provider'},
    {id:'lead-follow-up',name:'Lead Follow-Up',category:'Sales',description:'Prepares timely, personalized follow-up and stops when a lead replies or opts out.',price:1295,points:2,goals:['leads'],keywords:['follow up','new lead','estimate','inquiry'],tools:'Lead source, CRM, email or messaging'},
    {id:'lead-qualification',name:'Lead Qualification',category:'Sales',description:'Asks the right questions, scores explicit criteria, and sends qualified leads to the right person.',price:1295,points:2,goals:['leads'],keywords:['qualify','screen leads','bad leads','lead quality'],tools:'Lead source and CRM'},
    {id:'appointment-booking',name:'Appointment Booking',category:'Scheduling',description:'Checks working hours and availability before preparing or completing a booking.',price:1495,points:2,goals:['booking','calls'],keywords:['book appointment','scheduling','calendar','availability'],tools:'Calendar, CRM, messaging'},
    {id:'appointment-reminders',name:'Appointment Reminders',category:'Scheduling',description:'Sends scheduled reminders and cancels them automatically when an appointment changes.',price:795,points:1,goals:['booking'],keywords:['reminder','no show','reschedule','appointment'],tools:'Calendar and messaging'},
    {id:'review-generation',name:'Review Generation',category:'Growth',description:'Requests an honest review after completed work and tracks each request.',price:695,points:1,goals:['leads'],keywords:['review','reputation','google rating'],tools:'CRM or job system, messaging'},
    {id:'old-lead-reactivation',name:'Old Lead Reactivation',category:'Sales',description:'Finds eligible stale leads and prepares personal follow-up while respecting opt-outs.',price:1195,points:2,goals:['leads'],keywords:['old lead','stale lead','reactivate','past customer'],tools:'CRM and messaging'},
    {id:'crm-automation',name:'CRM Automation',category:'Operations',description:'Cleans contact data and prepares assignments, notes, stages, and follow-up tasks.',price:1795,points:3,goals:['leads','operations'],keywords:['crm','data entry','duplicate contact','pipeline'],tools:'CRM'},
    {id:'customer-support-agent',name:'Customer Support Agent',category:'Customer service',description:'Answers from approved business knowledge and prepares tickets when a person is needed.',price:1995,points:3,goals:['support'],keywords:['customer question','customer support','faq','help desk','chat'],tools:'Website or support channel, help desk'},
    {id:'reporting-automation',name:'Reporting Automation',category:'Analytics',description:'Builds repeatable reports from connected records and flags meaningful changes.',price:1495,points:2,goals:['reporting','operations'],keywords:['report','analytics','kpi','spreadsheet','dashboard'],tools:'Approved data source'},
    {id:'vendorleak-recovery',name:'VendorLeak',category:'Finance',description:'Checks supplied invoices for duplicates, unexpected fees, price changes, and missed credits.',price:1495,points:2,goals:['money','reporting'],keywords:['vendor','overcharge','duplicate invoice','fee'],tools:'Invoice or accounting source'},
    {id:'warrantyminer',name:'WarrantyMiner',category:'Finance',description:'Matches incidents with warranty and service-level terms to find possible credits.',price:1495,points:2,goals:['money'],keywords:['warranty','service credit','sla','contract credit'],tools:'Contracts and incident records'},
    {id:'lost-revenue-mystery-shopper',name:'Lost-Revenue Mystery Shopper',category:'Analytics',description:'Checks an authorized customer-response process and shows where opportunities may be lost.',price:1295,points:2,goals:['leads','testing'],keywords:['mystery shopper','response time','missed opportunity'],tools:'Authorized test channel'},
    {id:'processclone-audit',name:'ProcessClone',category:'Operations',description:'Maps an approved workflow and identifies repetitive steps worth automating.',price:1995,points:3,goals:['operations','testing'],keywords:['repetitive','manual process','copy paste','workflow'],tools:'Approved workflow evidence'},
    {id:'business-exception-radar',name:'Business Exception Radar',category:'Operations',description:'Finds overdue, stalled, or unassigned work before it becomes a larger problem.',price:1495,points:2,goals:['operations','reporting'],keywords:['overdue','unassigned','stalled','mistake','exception'],tools:'Operations data source'},
    {id:'revenue-forensics',name:'Revenue Forensics',category:'Sales',description:'Finds unanswered inquiries and stalled quotes that may represent missed sales.',price:1695,points:3,goals:['leads','money','reporting'],keywords:['missed sale','stalled quote','unanswered inquiry','lost revenue'],tools:'CRM and lead source'},
    {id:'cashchaser',name:'CashChaser',category:'Finance',description:'Identifies overdue balances and prepares polite payment reminders for approval.',price:1295,points:2,goals:['money'],keywords:['unpaid','late invoice','receivable','collect payment'],tools:'Invoice source and messaging'},
    {id:'slotyield',name:'SlotYield',category:'Scheduling',description:'Matches eligible waiting customers to future openings and prepares an offer.',price:1395,points:2,goals:['booking','money'],keywords:['empty slot','unused capacity','waitlist','cancellation'],tools:'Calendar, CRM, messaging'},
    {id:'agent-spend-governor',name:'AgentSpend Governor',category:'Controls',description:'Checks proposed AI work against a monthly budget and per-task spending cap.',price:995,points:1,goals:['testing','reporting'],keywords:['ai cost','agent spend','budget','usage cost'],tools:'AI usage source'},
    {id:'agent-rehearsal-lab',name:'Agent Rehearsal Lab',category:'Controls',description:'Tests saved automation settings with isolated examples before deployment.',price:1295,points:2,goals:['testing'],keywords:['test automation','rehearsal','before deployment','quality assurance'],tools:'Automintly test environment'}
  ];

  const industryDefaults = {
    'Home services':['missed-call-text-back','appointment-booking','lead-follow-up'],
    'Dental & medical':['ai-receptionist','appointment-reminders','customer-support-agent'],
    'Salons & spas':['appointment-booking','appointment-reminders','slotyield'],
    'Auto':['missed-call-text-back','lead-follow-up','review-generation'],
    'Professional services':['lead-qualification','appointment-booking','crm-automation'],
    'Real estate':['lead-follow-up','lead-qualification','old-lead-reactivation'],
    'Retail & e-commerce':['customer-support-agent','review-generation','reporting-automation'],
    'Creators & media':['lead-follow-up','crm-automation','reporting-automation'],
    'Manufacturing':['business-exception-radar','vendorleak-recovery','reporting-automation'],
    'Other':['processclone-audit','business-exception-radar','reporting-automation']
  };

  const selected = new Set();
  let profile = null;
  const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
  const escapeHtml = value => String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const byId = id => products.find(product => product.id === id);

  function dashboardPlan() {
    const points = [...selected].reduce((total,id)=>total+byId(id).points,0);
    if (!points) return {name:'Dashboard plan',price:0};
    if (points <= 3) return {name:'Essentials dashboard',price:299};
    if (points <= 7) return {name:'Growth dashboard',price:599};
    if (points <= 12) return {name:'Scale dashboard',price:999};
    return {name:'Expanded dashboard',price:1499};
  }

  function renderCart() {
    const chosen = [...selected].map(byId);
    const setup = chosen.reduce((total,product)=>total+product.price,0);
    const dashboard = dashboardPlan();
    document.querySelector('#cart-count').textContent = `${chosen.length} selected`;
    document.querySelector('#cart-items').innerHTML = chosen.length ? chosen.map(product=>`<div class="cart-item"><strong>${escapeHtml(product.name)}</strong><span>${money(product.price)}</span></div>`).join('') : '<p class="empty">Add an automation to see your tailored price.</p>';
    document.querySelector('#setup-total').textContent = money(setup);
    document.querySelector('#dashboard-tier').textContent = dashboard.name;
    document.querySelector('#monthly-total').textContent = `${money(dashboard.price)}/mo`;
  }

  function scoreProducts(data) {
    const description = data.description.toLowerCase();
    const goals = new Set(data.goals);
    const defaults = new Set(industryDefaults[data.industry] || []);
    return products.map(product => {
      let score = product.goals.filter(goal=>goals.has(goal)).length * 5;
      const matched = product.keywords.filter(keyword=>description.includes(keyword));
      score += matched.length * 4;
      if (defaults.has(product.id)) score += 2;
      const reasons = [];
      if (matched.length) reasons.push(`Your description mentions ${matched.slice(0,2).join(' and ')}.`);
      if (product.goals.some(goal=>goals.has(goal))) reasons.push('It supports one of the results you selected.');
      if (defaults.has(product.id)) reasons.push(`It is commonly useful for ${data.industry.toLowerCase()} businesses.`);
      return {product,score,reason:reasons.join(' ')};
    }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score || a.product.price-b.product.price);
  }

  function productCard(product, reason='', recommended=false) {
    const added = selected.has(product.id);
    return `<article class="product${recommended?' recommended':''}">
      <div><span class="tag">${recommended?'RECOMMENDED':escapeHtml(product.category.toUpperCase())}</span><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description)}</p>${reason?`<p class="why"><strong>Why it fits:</strong> ${escapeHtml(reason)}</p>`:''}<span class="tools">Uses: ${escapeHtml(product.tools)}</span></div>
      <div class="product-side"><strong class="product-price">${money(product.price)}</strong><span class="tools">one-time setup</span><button type="button" class="${added?'secondary added':'primary'}" data-product="${product.id}">${added?'Added ✓':'Add to plan'}</button></div>
    </article>`;
  }

  function setStep(step) {
    ['one','two','three'].forEach((name,index)=>document.querySelector(`#step-${name}`).hidden=index+1!==step);
    document.querySelectorAll('[data-step-indicator]').forEach(indicator=>indicator.classList.toggle('active',Number(indicator.dataset.stepIndicator)===step));
    window.scrollTo({top:document.querySelector('.builder-layout').offsetTop-90,behavior:'smooth'});
  }

  document.querySelector('#business-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const error = document.querySelector('#form-error');
    const goals = form.getAll('goals');
    if (!goals.length) {
      error.textContent = 'Choose at least one result so we can recommend the right automations.';
      error.hidden = false;
      return;
    }
    error.hidden = true;
    profile = {businessName:String(form.get('businessName')).trim(),industry:String(form.get('industry')),description:String(form.get('description')).trim(),goals,volume:String(form.get('volume')),tools:String(form.get('tools')).trim(),website:String(form.get('website')).trim()};
    const ranked = scoreProducts(profile);
    const recommendations = ranked.slice(0,5);
    document.querySelector('#recommendation-summary').textContent = `Based on what you told us about ${profile.businessName}, these are the strongest starting points. Add, remove, or compare anything before reviewing the price.`;
    document.querySelector('#recommendation-list').innerHTML = recommendations.map(item=>productCard(item.product,item.reason,true)).join('');
    const recommendedIds = new Set(recommendations.map(item=>item.product.id));
    document.querySelector('#catalog-list').innerHTML = products.filter(product=>!recommendedIds.has(product.id)).map(product=>productCard(product)).join('');
    setStep(2);
  });

  document.querySelector('.builder-panel').addEventListener('click', event => {
    const productButton = event.target.closest('[data-product]');
    if (productButton) {
      const id = productButton.dataset.product;
      selected.has(id) ? selected.delete(id) : selected.add(id);
      document.querySelectorAll(`[data-product="${id}"]`).forEach(button=>{button.textContent=selected.has(id)?'Added ✓':'Add to plan';button.className=selected.has(id)?'secondary added':'primary';});
      renderCart();
      return;
    }
    const back = event.target.closest('[data-back]');
    if (back) setStep(Number(back.dataset.back));
  });

  document.querySelector('#review-plan').addEventListener('click', () => {
    if (!selected.size) {
      document.querySelector('#recommendation-summary').textContent = 'Add at least one automation before reviewing your plan.';
      return;
    }
    const chosen = [...selected].map(byId);
    const setup = chosen.reduce((total,product)=>total+product.price,0);
    const dashboard = dashboardPlan();
    document.querySelector('#final-plan').innerHTML = `<div class="plan-breakdown">${chosen.map(product=>`<div class="plan-row"><span>${escapeHtml(product.name)} setup</span><strong>${money(product.price)}</strong></div>`).join('')}</div><div class="plan-total"><div><span>One-time setup total</span><strong>${money(setup)}</strong></div><div><span>${escapeHtml(dashboard.name)}</span><strong>${money(dashboard.price)}/month</strong></div></div><p class="fineprint">Profit Meter, Optimize, setup guides, activity logs, and health monitoring are included. Required phone, messaging, AI, CRM, calendar, hosting, and other third-party charges are paid separately by the customer.</p>`;
    const body = [`Business: ${profile.businessName}`,`Industry: ${profile.industry}`,'', 'Selected automations:',...chosen.map(product=>`- ${product.name}: ${money(product.price)} setup`),'',`One-time setup total: ${money(setup)}`,`${dashboard.name}: ${money(dashboard.price)}/month`,'',`Business description: ${profile.description}`].join('\n');
    document.querySelector('#email-plan').href = `mailto:automintly@gmail.com?subject=${encodeURIComponent(`Automation plan for ${profile.businessName}`)}&body=${encodeURIComponent(body)}`;
    setStep(3);
  });

  renderCart();
})();
