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
    {id:'old-lead-reactivation',name:'Dormant Customer Reactivation',category:'Sales',description:'Finds eligible inactive customers and prepares personal win-back follow-up while respecting replies and opt-outs.',price:995,points:2,goals:['leads','money'],keywords:['old lead','stale lead','reactivate','past customer','inactive customer','dormant customer','win back','win-back'],tools:'CRM and messaging'},
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
    {id:'agent-rehearsal-lab',name:'Agent Rehearsal Lab',category:'Controls',description:'Tests saved automation settings with isolated examples before deployment.',price:1295,points:2,goals:['testing'],keywords:['test automation','rehearsal','before deployment','quality assurance'],tools:'Automintly test environment'},
    {id:'quote-flow',name:'QuoteFlow',category:'Sales',description:'Turns approved price-book items into accurate quote drafts for review before sending.',price:1495,points:2,goals:['leads','money'],keywords:['quote','estimate','proposal','pricing'],tools:'CRM, approved price book, document tool'},
    {id:'onboard-flow',name:'OnboardFlow',category:'Operations',description:'Builds a controlled client onboarding plan and flags missing or stalled steps.',price:1795,points:2,goals:['operations','support'],keywords:['client onboarding','onboard','kickoff','new client'],tools:'CRM, project management, document source'},
    {id:'document-flow',name:'DocumentFlow',category:'Operations',description:'Extracts approved fields from authorized documents and routes uncertain records to review.',price:1495,points:2,goals:['operations','reporting'],keywords:['document extraction','ocr','pdf','invoice data'],tools:'Document source, OCR, CRM or accounting'},
    {id:'inbox-pilot',name:'InboxPilot',category:'Customer service',description:'Classifies inbox items, prepares approved replies, and routes sensitive requests to people.',price:1295,points:2,goals:['support','operations'],keywords:['inbox','email triage','ticket triage','support email'],tools:'Email, help desk, CRM'},
    {id:'meeting-flow',name:'MeetingFlow',category:'Operations',description:'Turns authorized meeting notes into a concise CRM brief, decisions, and task drafts.',price:995,points:1,goals:['operations'],keywords:['meeting notes','action items','meeting tasks','follow up meeting'],tools:'Meeting source, CRM, project management'},
    {id:'lead-intel',name:'LeadIntel',category:'Sales',description:'Scores authorized prospect research against your ideal-customer profile for review.',price:1695,points:3,goals:['leads'],keywords:['prospect research','lead enrichment','lead intelligence','find prospects'],tools:'Authorized research source and CRM'},
    {id:'renew-guard',name:'RenewGuard',category:'Customer success',description:'Flags upcoming renewals with inactivity, unresolved issues, or missing ownership.',price:1495,points:2,goals:['money','support','reporting'],keywords:['renewal','retention','churn risk','customer success'],tools:'CRM, billing source, support source'},
    {id:'spend-guard',name:'Automintly Spend Guard',category:'Finance',description:'Checks incoming supplier invoices against approved rates, active locations, seat limits, and cancellation dates before payment review.',price:1995,points:3,goals:['money','operations','reporting'],keywords:['supplier invoice','vendor invoice','contract rate','overbilling','seat count','cancelled vendor','spend guard','prevent overcharge'],tools:'Invoice source, contracts, accounting system'},
    {id:'advanced-market-research',name:'Advanced Market Research',category:'Analytics',description:'Turns authorized market, competitor, pricing, and customer-signal evidence into a traceable opportunity brief for human review.',price:2495,points:3,goals:['reporting','money','leads','operations'],keywords:['market research','competitor research','competitive analysis','customer demand','pricing research','market trend','market opportunity'],tools:'Approved public sources, customer feedback, internal performance data, or licensed data'},
    {id:'government-opportunity-finder',name:'Government Opportunity Finder & Bid Support',category:'Growth',description:'Screens official government opportunities against your verified capabilities, registration, and eligibility, then prepares a human-reviewed bid-support packet.',price:0,points:0,includedAddon:true,goals:['government'],keywords:['construction','janitorial','facility maintenance','hvac','plumbing','electrical','logistics','transportation','software','cybersecurity','consulting','staffing','training','medical supplies','healthcare','food service','manufacturing','printing','security services','engineering','architecture','accounting','research services','equipment supplier'],tools:'SAM.gov opportunities, capability records, SAM registration, and solicitation documents'}
  ];

  const outcomeBundles = [
    {id:'quote-to-cash-accelerator',name:'Quote-to-Cash Accelerator',description:'Connect inquiry follow-up, CRM handoff, approved quote drafts, and receivables follow-up so work moves toward payment without hidden package pricing.',products:['lead-follow-up','crm-automation','quote-flow','cashchaser']}
  ];

  const outcomeSystems = [
    {id:'revenue-rescue',name:'Revenue Rescue',description:'Recover and move customer demand through response, booking, follow-up, and retention.',products:['ai-receptionist','missed-call-text-back','lead-follow-up','lead-qualification','appointment-booking','appointment-reminders','review-generation','old-lead-reactivation','crm-automation','customer-support-agent','lost-revenue-mystery-shopper','revenue-forensics','slotyield','quote-flow','onboard-flow','inbox-pilot','meeting-flow','renew-guard']},
    {id:'cash-cost-control',name:'Cash & Cost Control',description:'Protect cash and margin with receivables, invoice, supplier, document, and spend controls.',products:['vendorleak-recovery','warrantyminer','business-exception-radar','cashchaser','agent-spend-governor','document-flow','spend-guard']},
    {id:'growth-intelligence',name:'Growth Intelligence',description:'Turn approved market, prospect, operating, and performance evidence into reviewable decisions.',products:['reporting-automation','processclone-audit','agent-rehearsal-lab','lead-intel','advanced-market-research']}
  ];

  const addons = [
    {id:'website-studio-clean-launch',group:'website-studio',name:'Website Studio — Clean Launch',billing:'one-time',price:200,description:'A clean three-section one-page website with a focused offer, services, and contact path.'},
    {id:'website-studio-service-snapshot',group:'website-studio',name:'Website Studio — Service Snapshot',billing:'one-time',price:200,description:'A compact four-section one-page website for local services, proof, and booking or contact.'},
    {id:'website-studio-lead-engine',group:'website-studio',name:'Website Studio — Lead Engine',billing:'one-time',price:400,description:'A five-section one-page website with stronger calls to action, proof placement, and a focused lead path.'},
    {id:'website-studio-trust-builder',group:'website-studio',name:'Website Studio — Trust Builder',billing:'one-time',price:400,description:'A six-section one-page website built around credibility, process, testimonials, FAQs, and inquiry.'},
    {id:'website-studio-brand-story',group:'website-studio',name:'Website Studio — Brand Story',billing:'one-time',price:600,description:'A seven-section editorial-style one-page website with richer brand storytelling, service paths, and proof.'},
    {id:'website-studio-premium-showcase',group:'website-studio',name:'Website Studio — Premium Showcase',billing:'one-time',price:600,description:'An eight-section high-impact one-page website with advanced visual hierarchy, multiple service paths, proof, FAQs, and conversion sections.'},
    {id:'revenue-leak-snapshot',name:'Automation Revenue-Leak Snapshot',billing:'one-time',price:249,description:'A written review of one workflow, its likely leaks and control gaps, and a recommended implementation scope. Credited toward the approved implementation described in the snapshot.'},
    {id:'opportunity-audit',name:'Automation Opportunity Audit',billing:'one-time',price:795,description:'Broader multi-workflow review and prioritized automation plan. This fee may be credited toward an approved setup proposal.'},
    {id:'data-cleanup',name:'Data Cleanup Standard',billing:'one-time',price:995,description:'Prepare one bounded source dataset for setup.'},
    {id:'custom-connector',name:'Custom Integration Connector',billing:'one-time',price:1495,description:'Design and validation for one custom connection. Provider usage is separate.'},
    {id:'white-glove-launch',name:'White-Glove Launch & Training',billing:'one-time',price:750,description:'Guided launch, operator training, and documented handoff.'},
    {id:'managed-optimization',name:'Managed Optimization',billing:'monthly',price:500,description:'Monthly performance review and one bounded tuning cycle.'},
    {id:'managed-optimization-plus',name:'Managed Optimization Plus',billing:'monthly',price:1250,description:'Higher-touch review, tuning, and expansion planning.'},
    {id:'evidence-compliance',name:'Evidence & Compliance Pack',billing:'monthly',price:300,description:'Expanded evidence retention, audit exports, and control reviews; not legal certification.'},
    {id:'priority-support',name:'Priority Support',billing:'monthly',price:250,description:'Priority support queue during the agreed service window.'},
    {id:'extra-location',name:'Multi-Location Pack',billing:'monthly',price:149,description:'Support for one additional approved business location.'}
  ];

  const industryDefaults = {
    'Home services':['missed-call-text-back','appointment-booking','lead-follow-up'],
    'Dental & medical':['ai-receptionist','appointment-reminders','customer-support-agent'],
    'Salons & spas':['appointment-booking','appointment-reminders','slotyield'],
    'Auto':['missed-call-text-back','lead-follow-up','review-generation'],
    'Professional services':['lead-qualification','quote-flow','meeting-flow','onboard-flow'],
    'Real estate':['lead-intel','lead-follow-up','quote-flow','old-lead-reactivation'],
    'Retail & e-commerce':['inbox-pilot','customer-support-agent','renew-guard','reporting-automation'],
    'Creators & media':['lead-follow-up','crm-automation','reporting-automation'],
    'Manufacturing':['business-exception-radar','document-flow','vendorleak-recovery','renew-guard'],
    'Other':['processclone-audit','business-exception-radar','document-flow','reporting-automation']
  };

  const selected = new Set();
  const selectedAddons = new Set();
  let profile = null;
  const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
  const escapeHtml = value => String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const byId = id => products.find(product => product.id === id);
  const addonById = id => addons.find(addon => addon.id === id);
  const systemByProductId = id => outcomeSystems.find(system => system.products.includes(id));
  const addonAliases = {
    'website-upgrader-starter':'website-studio-clean-launch',
    'website-upgrader-growth':'website-studio-lead-engine',
    'website-upgrader-premium':'website-studio-trust-builder'
  };

  const requested = new URLSearchParams(window.location.search);
  const requestedProductIds = requested.getAll('add').filter(id => byId(id));
  const requestedAddonIds = requested.getAll('addon').map(id => addonAliases[id] || id).filter(id => addonById(id));
  const requestedBundle = outcomeBundles.find(bundle => bundle.id === requested.get('bundle'));
  requestedProductIds.forEach(id => selected.add(id));
  requestedAddonIds.forEach(id => {
    const addon = addonById(id);
    if (addon.group) [...selectedAddons].filter(selectedId => addonById(selectedId)?.group === addon.group).forEach(selectedId => selectedAddons.delete(selectedId));
    selectedAddons.add(id);
  });
  requestedBundle?.products.forEach(id => selected.add(id));

  function addonTotals() {
    const chosen = [...selectedAddons].map(addonById);
    return {
      chosen,
      oneTime: chosen.filter(addon=>addon.billing==='one-time').reduce((total,addon)=>total+addon.price,0),
      monthly: chosen.filter(addon=>addon.billing==='monthly').reduce((total,addon)=>total+addon.price,0)
    };
  }

  function dashboardPlan() {
    const points = [...selected].reduce((total,id)=>total+byId(id).points,0);
    if (!selected.size) return {name:'Dashboard plan',price:0};
    if (points <= 3) return {name:'Essentials dashboard',price:299};
    if (points <= 7) return {name:'Growth dashboard',price:599};
    if (points <= 12) return {name:'Scale dashboard',price:999};
    return {name:'Expanded dashboard',price:1499};
  }

  function systemMix(productIds) {
    return outcomeSystems.map(system => ({...system,count:productIds.filter(id=>system.products.includes(id)).length})).filter(system=>system.count>0).sort((a,b)=>b.count-a.count);
  }

  function systemChips(mix) {
    return mix.map(system=>`<span class="system-chip">${escapeHtml(system.name)} · ${system.count}</span>`).join('');
  }

  function renderRecommendedSystemFit(productIds) {
    const mix = systemMix(productIds);
    const panel = document.querySelector('#outcome-fit');
    if (!mix.length) {
      panel.hidden = true;
      return;
    }
    const strongest = mix[0];
    panel.hidden = false;
    document.querySelector('#outcome-fit-title').textContent = mix.length === 1 ? strongest.name : `${strongest.name} leads your system mix`;
    document.querySelector('#outcome-fit-copy').textContent = strongest.description;
    document.querySelector('#outcome-fit-chips').innerHTML = systemChips(mix);
  }

  function renderCart() {
    const chosen = [...selected].map(byId);
    const setup = chosen.reduce((total,product)=>total+product.price,0);
    const dashboard = dashboardPlan();
    const optional = addonTotals();
    document.querySelector('#cart-count').textContent = `${chosen.length} automation${chosen.length===1?'':'s'}`;
    const mix = systemMix(chosen.map(product=>product.id));
    const mixPanel = document.querySelector('#cart-system-mix');
    mixPanel.hidden = !mix.length;
    mixPanel.innerHTML = mix.length ? `<span>OutcomeOS system mix</span><div class="system-chips">${systemChips(mix)}</div>` : '';
    const productRows = chosen.map(product=>`<div class="cart-item"><strong>${escapeHtml(product.name)}</strong><span>${product.includedAddon?'Included':money(product.price)}</span></div>`);
    const addonRows = optional.chosen.map(addon=>`<div class="cart-item optional-item"><strong>${escapeHtml(addon.name)}</strong><span>${money(addon.price)}${addon.billing==='monthly'?'/mo':''}</span></div>`);
    document.querySelector('#cart-items').innerHTML = productRows.length || addonRows.length ? [...productRows,...addonRows].join('') : '<p class="empty">Add an automation to see your tailored price.</p>';
    document.querySelector('#setup-total').textContent = money(setup);
    document.querySelector('#dashboard-tier').textContent = dashboard.name;
    document.querySelector('#monthly-total').textContent = `${money(dashboard.price)}/mo`;
    document.querySelector('#addons-total').textContent = money(optional.oneTime);
    document.querySelector('#addons-monthly').textContent = `${money(optional.monthly)}/mo`;
  }

  function renderContractingRecommendation() {
    const product = byId('government-opportunity-finder');
    const added = selected.has(product.id);
    document.querySelector('#contracting-recommendation').innerHTML = `<div><p class="eyebrow">BEFORE YOU FINISH</p><h3 id="contracting-recommendation-title">Check whether Contracting fits your business</h3><p>Automintly can screen official opportunities against your verified capabilities at no upfront search charge. A percentage-based success fee applies only after a qualifying award, where legally permitted and agreed in writing before bid support begins. No bid is submitted automatically.</p><a href="contracting.html">See how Contracting works</a></div><button type="button" class="${added?'secondary added':'primary'} contracting-action" data-product="${product.id}">${added?'Contracting check added ✓':'Add Contracting check · $0 upfront'}</button>`;
  }

  function renderFinalPlan() {
    const chosen = [...selected].map(byId), optional = addonTotals();
    const setup = chosen.reduce((total,product)=>total+product.price,0), dashboard = dashboardPlan();
    const mix = systemMix(chosen.map(product=>product.id));
    const mixSummary = mix.length ? `<section class="final-system-mix" aria-label="OutcomeOS system mix"><span>OutcomeOS system mix</span><div class="system-chips">${systemChips(mix)}</div><small>System labels organize the work; they do not add another charge.</small></section>` : '';
    document.querySelector('#final-plan').innerHTML = `${mixSummary}<div class="plan-breakdown">${chosen.map(product=>`<div class="plan-row"><span>${escapeHtml(product.name)}${product.includedAddon?'':' setup'}</span><strong>${product.includedAddon?'Included · $0 upfront':money(product.price)}</strong></div>`).join('')}</div><div class="plan-total"><div><span>Automation setup total</span><strong>${money(setup)}</strong></div><div><span>${escapeHtml(dashboard.name)}</span><strong>${money(dashboard.price)}/month</strong></div>${optional.oneTime?`<div><span>Optional one-time services</span><strong>${money(optional.oneTime)}</strong></div>`:''}${optional.monthly?`<div><span>Optional monthly services</span><strong>${money(optional.monthly)}/month</strong></div>`:''}</div><p class="fineprint">Dashboard access is a separate required monthly fee based on automation scope. Contracting adds no setup charge or dashboard scope points. Any award-based success fee requires a legally permitted signed agreement before bid support. Optional services are separate selections. Required phone, messaging, AI, CRM, calendar, hosting, and other third-party charges are paid separately by the customer.</p>`;
    renderContractingRecommendation();
    document.querySelector('#addon-list').innerHTML = addons.map(addon=>`<label class="addon-card"><input type="checkbox" data-addon="${addon.id}" ${selectedAddons.has(addon.id)?'checked':''}><span><strong>${escapeHtml(addon.name)}</strong><small>${escapeHtml(addon.description)}</small></span><b>${money(addon.price)}${addon.billing==='monthly'?'/mo':' once'}</b></label>`).join('');
    const addonLines = optional.chosen.length ? ['', 'Optional services:', ...optional.chosen.map(addon=>`- ${addon.name}: ${money(addon.price)}${addon.billing==='monthly'?'/month':' one-time'}`), `Optional one-time total: ${money(optional.oneTime)}`, `Optional monthly total: ${money(optional.monthly)}/month`] : [];
    const body = [`Business: ${profile.businessName}`,`Industry: ${profile.industry}`,`OutcomeOS system mix: ${mix.length?mix.map(system=>system.name).join(', '):'None assigned'}`,'', 'Selected automations:',...chosen.map(product=>`- ${product.name}: ${product.includedAddon?'$0 upfront search fee':`${money(product.price)} setup`}`),'',`Automation setup total: ${money(setup)}`,`${dashboard.name}: ${money(dashboard.price)}/month`,...addonLines,'','Contracting success-fee terms, if applicable, require a legally permitted signed agreement before bid support. Third-party provider and usage charges are separate. No payment is authorized by this email.',`Business description: ${profile.description}`].join('\n');
    document.querySelector('#email-plan').href = `mailto:automintly@gmail.com?subject=${encodeURIComponent(`Automation plan for ${profile.businessName}`)}&body=${encodeURIComponent(body)}`;
  }

  function scoreProducts(data) {
    const description = data.description.toLowerCase();
    const goals = new Set(data.goals);
    const defaults = new Set(industryDefaults[data.industry] || []);
    return products.map(product => {
      let score = product.goals.filter(goal=>goals.has(goal)).length * 5;
      const matched = product.keywords.filter(keyword=>description.includes(keyword));
      if (product.id === 'government-opportunity-finder' && !matched.length) {
        return {product,score:0,reason:''};
      }
      score += matched.length * 4;
      if (defaults.has(product.id)) score += 2;
      const reasons = [];
      if (matched.length) reasons.push(`Your description mentions ${matched.slice(0,2).join(' and ')}.`);
      if (product.goals.some(goal=>goals.has(goal))) reasons.push('It supports one of the results you selected.');
      if (product.id === 'government-opportunity-finder') reasons.push('NAICS, SAM registration, set-aside eligibility, and the solicitation still require review before any bid work.');
      if (defaults.has(product.id)) reasons.push(`It is commonly useful for ${data.industry.toLowerCase()} businesses.`);
      return {product,score,reason:reasons.join(' ')};
    }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score || a.product.price-b.product.price);
  }

  function productCard(product, reason='', recommended=false) {
    const added = selected.has(product.id);
    return `<article class="product${recommended?' recommended':''}">
      <div><span class="tag">${recommended?'RECOMMENDED':escapeHtml(product.category.toUpperCase())}</span><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description)}</p>${reason?`<p class="why"><strong>Why it fits:</strong> ${escapeHtml(reason)}</p>`:''}<span class="tools">Uses: ${escapeHtml(product.tools)}</span></div>
      <div class="product-side"><strong class="product-price">${product.includedAddon?'Included add-on':money(product.price)}</strong><span class="tools">${product.includedAddon?'$0 upfront search fee':'one-time setup'}</span><button type="button" class="${added?'secondary added':'primary'}" data-product="${product.id}">${added?'Added ✓':'Add to plan'}</button></div>
    </article>`;
  }

  function renderBundles() {
    document.querySelector('#outcome-bundles').innerHTML = outcomeBundles.map(bundle => {
      const included = bundle.products.map(byId), complete = bundle.products.every(id => selected.has(id));
      return `<article class="outcome-bundle"><div><span class="tag">SERVICE BUNDLE</span><h3>${escapeHtml(bundle.name)}</h3><p>${escapeHtml(bundle.description)}</p><p class="bundle-modules">${included.map(product=>escapeHtml(product.name)).join(' + ')}</p><small>Every service stays itemized and can be removed separately.</small></div><div class="bundle-side"><button type="button" class="${complete?'secondary added':'primary'}" data-bundle="${bundle.id}">${complete?'Bundle added ✓':'Add bundle to plan'}</button><span>See the combined total in your cart.</span></div></article>`;
    }).join('');
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
    renderRecommendedSystemFit(recommendations.map(item=>item.product.id));
    renderBundles();
    setStep(2);
  });

  document.querySelector('.builder-panel').addEventListener('click', event => {
    const productButton = event.target.closest('[data-product]');
    if (productButton) {
      const id = productButton.dataset.product;
      selected.has(id) ? selected.delete(id) : selected.add(id);
      document.querySelectorAll(`[data-product="${id}"]`).forEach(button=>{button.textContent=selected.has(id)?'Added ✓':'Add to plan';button.className=selected.has(id)?'secondary added':'primary';});
      renderCart();
      renderBundles();
      if (!document.querySelector('#step-three').hidden) renderContractingRecommendation();
      return;
    }
    const bundleButton = event.target.closest('[data-bundle]');
    if (bundleButton) {
      const bundle = outcomeBundles.find(item=>item.id===bundleButton.dataset.bundle);
      bundle.products.forEach(id=>selected.add(id));
      document.querySelectorAll('[data-product]').forEach(button=>{const added=selected.has(button.dataset.product);button.textContent=added?'Added ✓':'Add to plan';button.className=added?'secondary added':'primary';});
      renderCart(); renderBundles();
      return;
    }
    const addonInput = event.target.closest('[data-addon]');
    if (addonInput) {
      const addon = addonById(addonInput.dataset.addon);
      if (addonInput.checked) {
        if (addon.group) {
          [...selectedAddons].filter(selectedId => addonById(selectedId)?.group === addon.group).forEach(selectedId => selectedAddons.delete(selectedId));
        }
        selectedAddons.add(addon.id);
      } else {
        selectedAddons.delete(addon.id);
      }
      renderCart(); renderFinalPlan();
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
    renderFinalPlan();
    setStep(3);
  });

  const preselected = [...selected].map(byId);
  if (preselected.length || selectedAddons.size) {
    const note = document.querySelector('#preselected-note');
    const addonNames = [...selectedAddons].map(addonById).map(addon => addon.name);
    note.hidden = false;
    note.textContent = requestedBundle
      ? `${requestedBundle.name} is already in your plan as ${preselected.length} itemized automations. Complete these questions to confirm whether the full system fits.`
      : `${[...preselected.map(product=>product.name), ...addonNames].join(', ')} is already in your plan. Complete these questions so we can confirm the fit and recommend anything else you may need.`;
  }
  renderCart();
})();
