(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const page = document.body.dataset.page || 'home';
  const headerHost = $('#site-header');
  const footerHost = $('#site-footer');
  const navItems = [['Home','index.html','home'],['Rooms & Suites','rooms.html','rooms'],['Experiences','experiences.html','experiences'],['Our Story','about.html','about'],['Contact','contact.html','contact']];
  if (headerHost) {
    headerHost.innerHTML = `<header class="site-header" id="header"><a class="brand" href="index.html" aria-label="Vesper House home"><span class="brand-mark">v</span><span class="brand-word">VESPER<small>H O U S E</small></span></a><nav class="nav-links" id="primary-navigation" aria-label="Main navigation">${navItems.map(([label,href,key])=>`<a href="${href}" ${page===key?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="nav-book" href="booking.html">Book your stay ↗</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">MENU +</button></header>`;
  }
  if (footerHost) {
    footerHost.innerHTML = `<footer class="site-footer"><div class="footer-top"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">v</span><span class="brand-word">VESPER<small>H O U S E</small></span></a><p>A quieter kind of extraordinary.</p><span class="eyebrow">A FICTIONAL HOTEL CONCEPT BY FORM11</span></div><div class="footer-col"><h4>FIND YOUR STAY</h4><a href="rooms.html">Rooms & suites</a><a href="booking.html">Plan your stay</a><a href="experiences.html">Experiences</a><a href="about.html">Our story</a></div><div class="footer-col"><h4>THE GOOD THINGS</h4><a href="experiences.html#the-table">Dining</a><a href="experiences.html#the-coast">Coastal walks</a><a href="experiences.html#slow-hours">Wellbeing</a><a href="contact.html">Contact</a></div><div class="footer-col"><h4>THE HOUSE</h4><p>14 Shoreline Lane<br>Northumberland Coast<br>United Kingdom<br><small>Fictional concept address</small></p><a href="contact.html#location">Find the coast ↗</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} VESPER HOUSE · INDEPENDENT CONCEPT PROJECT</span><span>DESIGNED FOR THE FORM11 TECH STUDIOS PORTFOLIO</span></div></footer>`;
  }
  const header = $('#header');
  const menuToggle = $('.menu-toggle');
  const nav = $('#primary-navigation');
  const setHeader = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 35); };
  setHeader(); window.addEventListener('scroll', setHeader, {passive:true});
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); document.body.classList.toggle('menu-open', open); menuToggle.textContent = open ? 'CLOSE ×' : 'MENU +';
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.textContent='MENU +'; }));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.textContent='MENU +'; menuToggle.focus(); } });
  }
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:0.12, rootMargin:'0px 0px -35px 0px'});
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  const isoDate = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
  const datePlus = (iso, n) => { const d = new Date(`${iso}T12:00:00`); d.setDate(d.getDate()+n); return isoDate(d); };
  const dateNights = (a,b) => { if(!a||!b) return 0; return Math.round((new Date(`${b}T12:00:00`)-new Date(`${a}T12:00:00`))/86400000); };
  const setStatus = (el, message, kind='') => { if (!el) return; el.textContent=message; el.className='booking-status'+(kind?' '+kind:''); };
  const rooms = {
    garden:{name:'The Garden Room',rate:245,meta:'2 guests · Private terrace',image:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=500&q=80',max:2},
    sea:{name:'The Sea Room',rate:310,meta:'2 guests · Sea view',image:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80',max:2},
    suite:{name:'The House Suite',rate:420,meta:'2 guests · Separate sitting room',image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80',max:2}
  };
  const params = new URLSearchParams(location.search);
  const quick = $('#quick-book');
  if (quick) {
    const qa = $('#quick-arrival'), qd = $('#quick-departure');
    qa.min=isoDate(tomorrow); qa.value=isoDate(tomorrow); qd.min=datePlus(qa.value,1); qd.value=datePlus(qa.value,2);
    qa.addEventListener('change',()=>{ qd.min=datePlus(qa.value,1); if(!qd.value || qd.value<=qa.value) qd.value=datePlus(qa.value,2); });
    qd.addEventListener('change',()=>{ if(qa.value && qd.value<=qa.value) qd.value=datePlus(qa.value,1); });
    quick.addEventListener('submit', e=>{e.preventDefault(); if(!quick.reportValidity()) return; const fd=new FormData(quick); location.href=`booking.html?arrival=${encodeURIComponent(fd.get('arrival'))}&departure=${encodeURIComponent(fd.get('departure'))}&guests=${encodeURIComponent(fd.get('guests'))}`;});
  }
  const bookingForm = $('#booking-form');
  if (bookingForm) {
    const arrival=$('#arrival'), departure=$('#departure'), guests=$('#guest-count'), room=$('#room-choice'), name=$('#guest-name'), email=$('#guest-email'), status=$('#booking-status');
    arrival.min=isoDate(tomorrow); arrival.value=params.get('arrival')||isoDate(tomorrow); departure.min=datePlus(arrival.value,1); departure.value=params.get('departure')||datePlus(arrival.value,2); guests.value=params.get('guests')||'2';
    const roomParam=params.get('room'); if(roomParam && rooms[roomParam]) room.value=roomParam;
    if(departure.value<=arrival.value) departure.value=datePlus(arrival.value,2);
    const fmt = n => new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(n);
    const calc = () => {
      const selected=rooms[room.value], nights=dateNights(arrival.value,departure.value), count=Number(guests.value);
      $('#summary-room-name').textContent=selected.name; $('#summary-room-meta').textContent=`${count} guest${count===1?'':'s'} · ${selected.meta.split('· ')[1]}`; $('#summary-image').src=selected.image; $('#summary-rate').textContent=fmt(selected.rate); $('#summary-nights').textContent=nights>0?`${nights} night${nights===1?'':'s'}`:'Choose dates'; $('#summary-total').innerHTML=`${fmt(Math.max(0,nights)*selected.rate)}<small> / stay</small>`;
      if(nights>0 && arrival.value>=isoDate(tomorrow)) setStatus(status,`Dates look valid for this demo: ${nights} night${nights===1?'':'s'}, ${fmt(nights*selected.rate)} estimated. Live availability is not connected.`);
      else setStatus(status,'Choose a valid arrival and departure date. Departure must be after arrival.','error');
    };
    [arrival,departure,guests,room].forEach(el=>el.addEventListener('change',()=>{if(el===arrival){departure.min=datePlus(arrival.value,1);if(departure.value<=arrival.value)departure.value=datePlus(arrival.value,2);}calc();}));
    calc();
    bookingForm.addEventListener('submit',e=>{
      e.preventDefault();
      if(!bookingForm.reportValidity()) {setStatus(status,'Please complete the required fields and check your dates.','error');return;}
      const nights=dateNights(arrival.value,departure.value);
      if(arrival.value<isoDate(tomorrow)||nights<1){setStatus(status,'Please choose a future arrival and a departure at least one day later.','error');return;}
      const chosen=rooms[room.value];
      if(Number(guests.value)>chosen.max){setStatus(status,'This room category is designed for up to 2 guests in this demo. Please choose a different guest count or contact the fictional front desk.','error');return;}
      $('#review-details').innerHTML=`<p><strong>${escapeHTML(chosen.name)}</strong></p><p>${escapeHTML(name.value)} · ${escapeHTML(email.value)}</p><p>${formatDate(arrival.value)} to ${formatDate(departure.value)} · ${nights} night${nights===1?'':'s'}</p><p>${guests.value} guest${guests.value==='1'?'':'s'} · Breakfast included</p><p><strong>${fmt(nights*chosen.rate)} estimated total</strong></p>${$('#guest-note').value.trim()?`<p>Note: ${escapeHTML($('#guest-note').value.trim())}</p>`:''}`;
      $('#booking-step-form').classList.add('hidden'); $('#review-screen').classList.add('active'); setStatus($('#confirmation-status'),'Review your details, then complete the demo. No reservation or payment will be created.');
      $('#review-screen').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    });
    $('#edit-booking').addEventListener('click',()=>{$('#review-screen').classList.remove('active');$('#booking-step-form').classList.remove('hidden');$('#confirmation-status').textContent='';bookingForm.scrollIntoView({behavior:'smooth',block:'start'});});
    $('#confirm-demo').addEventListener('click',()=>{const ref='VH-DEMO-'+Math.random().toString(36).slice(2,8).toUpperCase();setStatus($('#confirmation-status'),`Demo complete. Reference ${ref}. No room has been reserved and no email or payment was sent. Thank you for trying the Vesper House concept.`,'success');$('#confirm-demo').disabled=true;$('#confirm-demo').textContent='Demo completed ✓';});
  }
  function formatDate(iso){return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric'}).format(new Date(`${iso}T12:00:00`));}
  function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

  const contactForm=$('#contact-form');
  if(contactForm){const msg=$('#contact-message');contactForm.addEventListener('submit',e=>{e.preventDefault();msg.className='form-message';if(!contactForm.checkValidity()){contactForm.reportValidity();msg.textContent='Please check the highlighted fields and try again.';msg.classList.add('error');return;}msg.textContent='Your message passed the demo validation. It has not been sent because this concept has no connected inbox.';msg.classList.add('success');});contactForm.addEventListener('input',()=>{if(msg.textContent){msg.textContent='';msg.className='form-message';}});}

  const testimonials=[{quote:'It felt as though someone had quietly taken the world off my shoulders for a weekend.',by:'CONCEPT TESTIMONIAL'},{quote:'The sort of place where breakfast becomes lunch, and nobody minds in the slightest.',by:'CONCEPT TESTIMONIAL'},{quote:'Every detail felt considered, but nothing ever felt like it was trying too hard.',by:'CONCEPT TESTIMONIAL'}];
  let testimonialIndex=0; const testimonialQuote=$('.testimonial blockquote'), testimonialByline=$('.testimonial-byline');
  $$('[data-testimonial]').forEach(btn=>btn.addEventListener('click',()=>{testimonialIndex=(testimonialIndex+(btn.dataset.testimonial==='next'?1:-1)+testimonials.length)%testimonials.length;if(testimonialQuote)testimonialQuote.textContent=testimonials[testimonialIndex].quote;if(testimonialByline)testimonialByline.innerHTML=`<span>${testimonials[testimonialIndex].by}</span><span>·</span><span>FICTIONAL PORTFOLIO CONTENT</span>`;}));
})();
