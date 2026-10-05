/**
 * Yadav's Homeopathy & Aesthetic Clinic - Main Script
 * Award-Winning Global Medical UI/UX Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* -------------------------------------------------------------------------
   * 1. Scroll Progress Bar & ScrollSpy Navigation (Passive, Throttled)
   * ------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navbar = document.getElementById('navbar');
  let lastScrollSpy = '';
  let scrollTicking = false;

  const onScroll = () => {
    if (navbar) {
      navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    }

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrolled}%`;
    }

    // Scroll To Top button visibility
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    }

    // ScrollSpy active link highlighting (only update DOM when section changes)
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId !== lastScrollSpy) {
      lastScrollSpy = currentSectionId;
      desktopNavLinks.forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('nav-link-active');
        }
      });
    }
    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------------------------------
   * 2. Mobile Menu Toggle
   * ------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------------------------------------------------------------------
   * 3. 4 Clinical Pillars Interactive Switcher
   * ------------------------------------------------------------------------- */
  const pillarBtns = document.querySelectorAll('.pillar-tab-btn');
  const pillarTag = document.getElementById('pillarTag');
  const pillarTitle = document.getElementById('pillarTitle');
  const pillarText = document.getElementById('pillarText');
  const pillarList = document.getElementById('pillarList');

  const pillarData = {
    p1: {
      tag: 'Pillar I • Root Cause Homeopathy',
      title: 'Constitutional Root Cause Analysis',
      text: "Unlike superficial suppressive treatments, constitutional homeopathy evaluates your unique genetic profile, immune health, stress triggers, and metabolic history. We prescribe individualized natural German remedies that stimulate your body's self-healing mechanisms from within.",
      list: [
        '100% natural, non-toxic remedies safe for all ages',
        'Permanent remission without drug dependence',
        'Addresses internal hormonal and immune imbalances'
      ]
    },
    p2: {
      tag: 'Pillar II • Follicular Stimulating Care',
      title: 'Follicular PRP & Hair Regrowth',
      text: 'Our specialized PRP hair restoration protocol extracts potent growth factors from your blood to revitalize dormant hair follicles. Combined with homeopathic cellular nourishment, patients experience rapid scalp density improvement.',
      list: [
        'Stimulates weak & dormant hair roots naturally',
        'Improves scalp blood circulation and hair shaft thickness',
        'Zero downtime and completely non-surgical'
      ]
    },
    p3: {
      tag: 'Pillar III • Cosmetic Dermatology',
      title: 'Non-Invasive Medical Aesthetic Glow',
      text: 'Achieve radiant, smooth, and youthful skin texture through advanced aesthetic procedures. We specialize in anti-aging collagen restoration, clinical acne scar remodeling, and hyperpigmentation clearing.',
      list: [
        'Dermatology-grade aesthetic protocols tailored to your skin type',
        'Targeted dark spot, scar, and pigmentation reduction',
        'Immediate glow with long-term structural skin health'
      ]
    },
    p4: {
      tag: 'Pillar IV • Endocrine & Metabolic Wellness',
      title: 'Female Endocrine & PCOS Balance',
      text: 'PCOS, thyroid dysfunction, and hormonal flare-ups require delicate constitutional balance rather than synthetic hormone pills. Our targeted homeopathic protocols regulate menstrual cycles and relieve hormonal acne and weight gain.',
      list: [
        'Natural endocrine regulation without side effects',
        'Helps restore regular menstrual cycles & ovulation',
        'Controls facial hair, cystic acne, and metabolic weight'
      ]
    }
  };

  if (pillarBtns.length > 0) {
    pillarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pillarBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.getAttribute('data-pillar');
        const data = pillarData[key];

        if (data && pillarTitle) {
          pillarTag.textContent = data.tag;
          pillarTitle.textContent = data.title;
          pillarText.textContent = data.text;
          
          pillarList.innerHTML = data.list.map(item => `
            <li class="flex items-center gap-2.5">
              <i data-lucide="check-circle" class="w-4 h-4 text-amber-500"></i> ${item}
            </li>
          `).join('');
          
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
   * 4. Interactive 3-Step Self-Diagnostic Quiz Widget
   * ------------------------------------------------------------------------- */
  const quizStep1 = document.getElementById('quizStep1');
  const quizStep2 = document.getElementById('quizStep2');
  const quizResult = document.getElementById('quizResult');
  const quizStepLabel = document.getElementById('quizStepLabel');
  const quizPercentLabel = document.getElementById('quizPercentLabel');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizBackBtn = document.getElementById('quizBackBtn');
  const quizResetBtn = document.getElementById('quizResetBtn');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultText = document.getElementById('quizResultText');
  const quizWhatsAppBtn = document.getElementById('quizWhatsAppBtn');

  let selectedConcern = '';
  let selectedDuration = '';

  const concernOptions = document.querySelectorAll('#quizStep1 .quiz-option-card');
  const durationOptions = document.querySelectorAll('#quizStep2 .quiz-option-card');

  const quizRecommendations = {
    hair: {
      title: 'Constitutional Homeopathy + Follicular PRP Therapy',
      text: 'Dr. Poonam & Dr. Rahul Yadav recommend starting with natural German homeopathic doses to halt root scalp shedding, paired with 3-4 sessions of PRP hair rejuvenation for rapid density recovery.'
    },
    acne: {
      title: 'Hormonal Detox Homeopathy + Clinical Scar Remodeling',
      text: 'Recommended protocol focuses on cleansing internal blood toxins and regulating sebum production using constitutional remedies, combined with medical skin brightening care.'
    },
    pigmentation: {
      title: 'Melanin Regulation Homeopathy + Aesthetic Brightening',
      text: 'Targeted homeopathic remedies desensitize hyperactive melanocytes internally while aesthetic facial treatments lighten surface dark spots and sun damage.'
    },
    pcos: {
      title: 'Endocrine Balancing Homeopathy + Lifestyle Protocol',
      text: 'Constitutional therapy designed to balance ovarian hormones, normalize menstrual cycles, and eliminate hormonal acne & facial hair growth naturally.'
    }
  };

  if (concernOptions.length > 0) {
    concernOptions.forEach(card => {
      card.addEventListener('click', () => {
        concernOptions.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedConcern = card.getAttribute('data-concern');

        // Advance to Step 2
        quizStep1.classList.add('hidden');
        quizStep2.classList.remove('hidden');
        if (quizStepLabel) quizStepLabel.textContent = 'Step 2 of 2: Symptom Duration';
        if (quizPercentLabel) quizPercentLabel.textContent = '50% Completed';
        if (quizProgressBar) quizProgressBar.style.width = '50%';
      });
    });
  }

  if (durationOptions.length > 0) {
    durationOptions.forEach(card => {
      card.addEventListener('click', () => {
        durationOptions.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedDuration = card.getAttribute('data-duration');

        // Show Result
        quizStep2.classList.add('hidden');
        quizResult.classList.remove('hidden');
        if (quizStepLabel) quizStepLabel.textContent = 'Diagnostic Assessment Complete';
        if (quizPercentLabel) quizPercentLabel.textContent = '100% Completed';
        if (quizProgressBar) quizProgressBar.style.width = '100%';

        const rec = quizRecommendations[selectedConcern] || quizRecommendations['hair'];
        if (quizResultTitle) quizResultTitle.textContent = rec.title;
        if (quizResultText) quizResultText.textContent = rec.text;

        const waText = encodeURIComponent(`Hello Dr. Rahul Yadav, I took the self-diagnostic quiz on your website for ${selectedConcern} (${selectedDuration} duration). I would like to book the recommended treatment plan.`);
        if (quizWhatsAppBtn) quizWhatsAppBtn.setAttribute('href', `https://wa.me/919892688901?text=${waText}`);
      });
    });
  }

  if (quizBackBtn) {
    quizBackBtn.addEventListener('click', () => {
      quizStep2.classList.add('hidden');
      quizStep1.classList.remove('hidden');
      if (quizStepLabel) quizStepLabel.textContent = 'Step 1 of 2: Select Primary Concern';
      if (quizPercentLabel) quizPercentLabel.textContent = '0% Completed';
      if (quizProgressBar) quizProgressBar.style.width = '0%';
    });
  }

  if (quizResetBtn) {
    quizResetBtn.addEventListener('click', () => {
      quizResult.classList.add('hidden');
      quizStep1.classList.remove('hidden');
      concernOptions.forEach(c => c.classList.remove('selected'));
      durationOptions.forEach(c => c.classList.remove('selected'));
      if (quizStepLabel) quizStepLabel.textContent = 'Step 1 of 2: Select Primary Concern';
      if (quizPercentLabel) quizPercentLabel.textContent = '0% Completed';
      if (quizProgressBar) quizProgressBar.style.width = '0%';
    });
  }

  /* -------------------------------------------------------------------------
   * 5. Treatment Category Filters
   * ------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.treatment-filter-btn');
  const treatmentCards = document.querySelectorAll('.treatment-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-medical-navy', 'text-amber-300', 'border-amber-400/40', 'shadow-sm');
          b.classList.add('bg-white', 'text-stone-700', 'border', 'border-amber-900/15');
        });

        btn.classList.remove('bg-white', 'text-stone-700', 'border', 'border-amber-900/15');
        btn.classList.add('bg-medical-navy', 'text-amber-300', 'border-amber-400/40', 'shadow-sm');

        const filter = btn.getAttribute('data-filter');

        treatmentCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || filter === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    const initialTreatmentFilter = document.querySelector('.treatment-filter-btn[data-filter="hair"]');
    if (initialTreatmentFilter) initialTreatmentFilter.click();
  }

  /* -------------------------------------------------------------------------
   * 6. Multi-Case Before & After Interactive Gallery & Slider Switcher
   * ------------------------------------------------------------------------- */
  const caseBtns = document.querySelectorAll('.case-study-btn');
  const thumbCards = document.querySelectorAll('.ba-thumb-card');
  const caseCategoryBadge = document.getElementById('caseCategoryBadge');
  const caseNumberBadge = document.getElementById('caseNumberBadge');
  const caseTitle = document.getElementById('caseTitle');
  const caseMeta = document.getElementById('caseMeta');
  const caseDescription = document.getElementById('caseDescription');
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baAfterImg = document.getElementById('baAfterImg');
  const sideBySideBeforeImg = document.getElementById('sideBySideBeforeImg');
  const sideBySideAfterImg = document.getElementById('sideBySideAfterImg');
  
  const metric1 = document.getElementById('metric1');
  const metric2 = document.getElementById('metric2');
  const metric3 = document.getElementById('metric3');

  const baViewModeSlider = document.getElementById('baViewModeSlider');
  const baViewModeSideBySide = document.getElementById('baViewModeSideBySide');
  const baSliderContainer = document.getElementById('baSliderContainer');
  const baSideBySideContainer = document.getElementById('baSideBySideContainer');

  const caseData = {
    hair: {
      category: 'Hair Care',
      num: 'Case #01',
      title: 'Scalp Hair Regrowth & Density',
      meta: 'Patient: 32 Year Old Male | Duration: 4 Months Homeopathy + Scalp PRP',
      beforeImg: 'assets/images/ba/hair-before.png',
      afterImg: 'assets/images/ba/hair-after.png',
      m1: 'Halted in 6 Wks',
      m2: '+45% Density',
      m3: 'Zero Side Effects',
      desc: '<strong>Clinical Outcome:</strong> Significant thickening of hair follicles along the crown area, complete halt of active shedding within 6 weeks, and visible new hair density achieved with zero side effects.'
    },
    acne: {
      category: 'Skin Care',
      num: 'Case #02',
      title: 'Severe Hormonal Acne Clearance',
      meta: 'Patient: 24 Year Old Female | Duration: 3 Months Constitutional Remedy',
      beforeImg: 'assets/images/ba/acne-before.png',
      afterImg: 'assets/images/ba/acne-after.png',
      m1: '100% Cleared',
      m2: '85% Scar Reduction',
      m3: 'Non-Comedogenic',
      desc: '<strong>Clinical Outcome:</strong> Elimination of deep cystic breakouts on cheeks and jawline. Post-inflammatory pigmentation lightened by 85% with zero scarring.'
    },
    melasma: {
      category: 'Aesthetic Dermatology',
      num: 'Case #03',
      title: 'Deep Melasma & Hyperpigmentation',
      meta: 'Patient: 38 Year Old Female | Duration: 3 Months Brightening Therapy',
      beforeImg: 'assets/images/ba/melasma-before.png',
      afterImg: 'assets/images/ba/melasma-after.png',
      m1: 'Sun Patches Faded',
      m2: 'Even Tone Restored',
      m3: 'Melanin Regulated',
      desc: '<strong>Clinical Outcome:</strong> Deep brown sun patches on cheeks and forehead successfully faded. Even skin tone and radiant natural glow restored.'
    },
    eczema: {
      category: 'Chronic Homeopathy',
      num: 'Case #04',
      title: 'Chronic Eczema & Scaling Patch Relief',
      meta: 'Patient: 45 Year Old Male | Duration: 2 Months Anti-Allergic Therapy',
      beforeImg: 'assets/images/ba/eczema-before.png',
      afterImg: 'assets/images/ba/eczema-after.png',
      m1: 'Itching Relief 48h',
      m2: 'Redness Cleared',
      m3: 'Steroid-Free Cured',
      desc: '<strong>Clinical Outcome:</strong> Complete resolution of intense redness, flaking, and skin itching on arms and neck with constitutional German homeopathy.'
    }
  };

  const switchCaseStudy = (caseKey) => {
    const data = caseData[caseKey];
    if (!data) return;

    // Update filter tabs UI
    caseBtns.forEach(b => {
      if (b.getAttribute('data-case') === caseKey) {
        b.classList.remove('bg-white', 'text-stone-700', 'border', 'border-amber-900/15');
        b.classList.add('bg-medical-navy', 'text-amber-300', 'border-amber-400/40', 'shadow-sm');
      } else {
        b.classList.remove('bg-medical-navy', 'text-amber-300', 'border-amber-400/40', 'shadow-sm');
        b.classList.add('bg-white', 'text-stone-700', 'border', 'border-amber-900/15');
      }
    });

    // Update thumbnail cards UI
    thumbCards.forEach(tc => {
      if (tc.getAttribute('data-case') === caseKey) {
        tc.classList.add('active', 'border-2', 'border-[#D4A017]');
        tc.classList.remove('border-amber-900/15');
      } else {
        tc.classList.remove('active', 'border-2', 'border-[#D4A017]');
        tc.classList.add('border-amber-900/15');
      }
    });

    // Update Content
    if (caseCategoryBadge) caseCategoryBadge.textContent = data.category;
    if (caseNumberBadge) caseNumberBadge.textContent = data.num;
    if (caseTitle) caseTitle.textContent = data.title;
    if (caseMeta) caseMeta.textContent = data.meta;
    if (caseDescription) caseDescription.innerHTML = data.desc;
    if (metric1) metric1.textContent = data.m1;
    if (metric2) metric2.textContent = data.m2;
    if (metric3) metric3.textContent = data.m3;

    // Update Slider Images
    if (baBeforeImg) baBeforeImg.style.backgroundImage = `url('${data.afterImg}')`;
    if (baAfterImg) baAfterImg.style.backgroundImage = `url('${data.beforeImg}')`;

    // Update Side-by-Side Images
    if (sideBySideBeforeImg) sideBySideBeforeImg.style.backgroundImage = `url('${data.beforeImg}')`;
    if (sideBySideAfterImg) sideBySideAfterImg.style.backgroundImage = `url('${data.afterImg}')`;
  };

  caseBtns.forEach(btn => {
    btn.addEventListener('click', () => switchCaseStudy(btn.getAttribute('data-case')));
  });

  thumbCards.forEach(card => {
    card.addEventListener('click', () => switchCaseStudy(card.getAttribute('data-case')));
  });

  // View Mode Toggle (Slider vs Side-by-Side)
  if (baViewModeSlider && baViewModeSideBySide && baSliderContainer && baSideBySideContainer) {
    baViewModeSlider.addEventListener('click', () => {
      baViewModeSlider.classList.add('bg-white', 'text-medical-navy', 'shadow-sm');
      baViewModeSlider.classList.remove('text-stone-500');

      baViewModeSideBySide.classList.remove('bg-white', 'text-medical-navy', 'shadow-sm');
      baViewModeSideBySide.classList.add('text-stone-500');

      baSliderContainer.classList.remove('hidden');
      baSideBySideContainer.classList.add('hidden');
    });

    baViewModeSideBySide.addEventListener('click', () => {
      baViewModeSideBySide.classList.add('bg-white', 'text-medical-navy', 'shadow-sm');
      baViewModeSideBySide.classList.remove('text-stone-500');

      baViewModeSlider.classList.remove('bg-white', 'text-medical-navy', 'shadow-sm');
      baViewModeSlider.classList.add('text-stone-500');

      baSideBySideContainer.classList.remove('hidden');
      baSliderContainer.classList.add('hidden');
    });
  }

  // Drag slider calculation
  const baContainer = document.querySelector('.ba-view-container');
  const baAfter = document.querySelector('.ba-after');
  const baHandle = document.querySelector('.ba-slider-handle');

  if (baContainer && baAfter && baHandle) {
    let isDragging = false;

    const updateSlider = (x) => {
      const rect = baContainer.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;
      if (position < 0) position = 0;
      if (position > 100) position = 100;

      baAfter.style.width = `${position}%`;
      baHandle.style.left = `${position}%`;
      baHandle.setAttribute('aria-valuenow', Math.round(position));
    };

    const stopDragging = () => {
      isDragging = false;
    };

    baHandle.addEventListener('pointerdown', (event) => {
      isDragging = true;
      baHandle.setPointerCapture(event.pointerId);
      updateSlider(event.clientX);
    });
    baHandle.addEventListener('pointermove', (event) => {
      if (isDragging) updateSlider(event.clientX);
    });
    baHandle.addEventListener('pointerup', stopDragging);
    baHandle.addEventListener('pointercancel', stopDragging);
    baHandle.addEventListener('keydown', (event) => {
      const current = Number(baHandle.getAttribute('aria-valuenow')) || 50;
      let next = current;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= 5;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += 5;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = 100;
      if (next !== current) {
        event.preventDefault();
        const rect = baContainer.getBoundingClientRect();
        updateSlider(rect.left + (rect.width * next / 100));
      }
    });

    updateSlider(baContainer.getBoundingClientRect().left + baContainer.getBoundingClientRect().width / 2);
  }

  /* -------------------------------------------------------------------------
   * 7. Slide-Over Quick Appointment Drawer Modal
   * ------------------------------------------------------------------------- */
  const bookingDrawer = document.getElementById('bookingDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const openDrawerBtns = document.querySelectorAll('.open-drawer-btn');
  const timeSlotChips = document.querySelectorAll('.time-slot-chip');
  const selectedTimeSlotInput = document.getElementById('selectedTimeSlot');
  const drawerForm = document.getElementById('drawerForm');
  const dateInputs = document.querySelectorAll('#drawerDate, #formDate');
  const timeSlotAvailability = document.getElementById('timeSlotAvailability');

  const getLocalDateString = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getLocalDateString();
  const getSlotMinutes = (slot) => {
    const match = slot.match(/^(\d+):(\d+)\s(AM|PM)$/i);
    if (!match) return Number.POSITIVE_INFINITY;
    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return (hours * 60) + minutes;
  };

  const updateAvailableTimeSlots = () => {
    if (timeSlotChips.length === 0) return;

    const selectedDate = document.getElementById('drawerDate')?.value || '';
    const isToday = selectedDate === getLocalDateString();
    const currentTime = new Date();
    const currentMinutes = (currentTime.getHours() * 60) + currentTime.getMinutes();
    let availableCount = 0;
    let selectedSlotIsUnavailable = false;

    timeSlotChips.forEach(chip => {
      const slot = chip.getAttribute('data-slot') || '';
      const isPast = isToday && getSlotMinutes(slot) <= currentMinutes;
      chip.disabled = isPast;
      chip.classList.toggle('is-unavailable', isPast);

      if (isPast) {
        if (chip.classList.contains('selected')) selectedSlotIsUnavailable = true;
      } else {
        availableCount += 1;
      }
    });

    if (selectedSlotIsUnavailable) {
      timeSlotChips.forEach(chip => chip.classList.remove('selected'));
      if (selectedTimeSlotInput) selectedTimeSlotInput.value = '';
    }

    if (timeSlotAvailability) {
      if (!isToday) {
        timeSlotAvailability.textContent = 'All listed slots are available for this date.';
      } else if (availableCount === 0) {
        timeSlotAvailability.textContent = 'Today’s consultation slots have ended. Please choose another date.';
      } else {
        timeSlotAvailability.textContent = 'Only slots still available today are shown.';
      }
    }
  };

  dateInputs.forEach(input => input.setAttribute('min', today));
  const drawerDate = document.getElementById('drawerDate');
  if (drawerDate) drawerDate.addEventListener('change', updateAvailableTimeSlots);

  const openDrawer = () => {
    if (bookingDrawer) {
      bookingDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (drawerDate && !drawerDate.value) drawerDate.value = today;
      updateAvailableTimeSlots();
    }
  };

  const closeDrawer = () => {
    if (bookingDrawer) {
      bookingDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openDrawerBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

  if (bookingDrawer) {
    bookingDrawer.addEventListener('click', (e) => {
      if (e.target === bookingDrawer) closeDrawer();
    });
  }

  if (timeSlotChips.length > 0) {
    timeSlotChips.forEach(chip => {
      chip.addEventListener('click', () => {
        timeSlotChips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        if (selectedTimeSlotInput) selectedTimeSlotInput.value = chip.getAttribute('data-slot');
      });
    });
  }

  if (drawerForm) {
    drawerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      updateAvailableTimeSlots();
      if (!drawerForm.checkValidity()) {
        drawerForm.reportValidity();
        return;
      }
      const name = document.getElementById('drawerName').value.trim();
      const phone = document.getElementById('drawerPhone').value.trim();
      const treatment = document.getElementById('drawerTreatment').value;
      const date = document.getElementById('drawerDate').value;
      const slot = selectedTimeSlotInput ? selectedTimeSlotInput.value : '';

      if (date === today && slot && getSlotMinutes(slot) <= ((new Date().getHours() * 60) + new Date().getMinutes())) {
        if (timeSlotAvailability) {
          timeSlotAvailability.textContent = 'That time has just passed. Please choose the next available slot.';
        }
        return;
      }

      if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById('drawerPhoneError').classList.remove('hidden');
        return;
      }
      document.getElementById('drawerPhoneError').classList.add('hidden');

      closeDrawer();

      const message = `Hello Yadav Clinic, I would like to book an appointment.\nName: ${name}\nPhone: ${phone}\nTreatment: ${treatment}\nDate: ${date || 'Earliest Available'}\nPreferred Time Slot: ${slot || 'Any'}`;
      window.open(`https://wa.me/919892688901?text=${encodeURIComponent(message)}`, '_blank');
    });
  }

  /* -------------------------------------------------------------------------
   * 8. Main Appointment Form Logic & Validation
   * ------------------------------------------------------------------------- */
  const appointmentForm = document.getElementById('appointmentForm');
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const confirmWhatsAppBtn = document.getElementById('confirmWhatsAppBtn');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
      }
      
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const treatment = document.getElementById('formTreatment').value;
      const date = document.getElementById('formDate').value;
      const userMessage = document.getElementById('formMessage').value.trim();
      const phoneError = document.getElementById('phoneError');

      if (!/^[0-9]{10}$/.test(phone)) {
        if (phoneError) phoneError.classList.remove('hidden');
        return;
      }
      if (phoneError) phoneError.classList.add('hidden');

      const waText = `Hello Doctor, I want to book an appointment at Yadav Clinic.\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nTreatment: ${treatment}\nPreferred Date: ${date || 'Earliest'}\nNotes: ${userMessage || 'None'}`;
      
      if (confirmWhatsAppBtn) {
        confirmWhatsAppBtn.setAttribute('href', `https://wa.me/919892688901?text=${encodeURIComponent(waText)}`);
      }

      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
      }

      appointmentForm.reset();
    });
  }

  if (closeSuccessModal && successModal) {
    closeSuccessModal.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });
  }

  /* -------------------------------------------------------------------------
   * 9. FAQ Accordion Accessibility & Keyboard Navigation
   * ------------------------------------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Close all accordions
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const q = item.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* -------------------------------------------------------------------------
   * 10. Clinic Gallery Lightbox & Category Filtering
   * ------------------------------------------------------------------------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const closeLightbox = document.getElementById('closeLightbox');
  const prevLightbox = document.getElementById('prevLightbox');
  const nextLightbox = document.getElementById('nextLightbox');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');

  let currentGalleryIndex = 0;
  let activeGalleryItems = [...galleryItems];

  const updateLightboxContent = (index) => {
    if (!activeGalleryItems || activeGalleryItems.length === 0) return;
    if (index < 0) index = activeGalleryItems.length - 1;
    if (index >= activeGalleryItems.length) index = 0;
    currentGalleryIndex = index;

    const item = activeGalleryItems[currentGalleryIndex];
    if (!item) return;

    const src = item.getAttribute('data-src');
    const title = item.getAttribute('data-title');
    const desc = item.getAttribute('data-desc') || '';
    const badge = item.getAttribute('data-badge') || 'Clinic Gallery';

    if (lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = title || 'Clinic Photo';
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;
    if (lightboxCategory) lightboxCategory.textContent = badge;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentGalleryIndex + 1} of ${activeGalleryItems.length}`;
    }
  };

  const openLightboxModal = (index) => {
    if (!lightboxModal) return;
    updateLightboxContent(index);
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  };

  const closeLightboxModal = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const showNextLightbox = () => {
    updateLightboxContent(currentGalleryIndex + 1);
  };

  const showPrevLightbox = () => {
    updateLightboxContent(currentGalleryIndex - 1);
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = activeGalleryItems.indexOf(item);
      openLightboxModal(idx !== -1 ? idx : 0);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = activeGalleryItems.indexOf(item);
        openLightboxModal(idx !== -1 ? idx : 0);
      }
    });
  });

  if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxModal);
  if (prevLightbox) prevLightbox.addEventListener('click', (e) => { e.stopPropagation(); showPrevLightbox(); });
  if (nextLightbox) nextLightbox.addEventListener('click', (e) => { e.stopPropagation(); showNextLightbox(); });

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightboxModal();
    });
  }

  // Gallery Category Filter Tabs
  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        galleryFilterBtns.forEach(b => {
          b.classList.remove('active', 'bg-medical-navy', 'text-amber-300', 'border-amber-400/40', 'shadow-sm');
          b.classList.add('bg-white', 'text-stone-700', 'border-amber-900/15');
        });
        btn.classList.add('active', 'bg-medical-navy', 'text-amber-300', 'border-amber-400/40', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-stone-700', 'border-amber-900/15');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });

        activeGalleryItems = galleryItems.filter(item => {
          const category = item.getAttribute('data-category');
          return filter === 'all' || category === filter;
        });
      });
    });
  }

  // Global Keyboard Navigation (Arrows for Lightbox & ESC for all modals)
  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowRight') {
        showNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrevLightbox();
      }
    }

    if (e.key === 'Escape') {
      closeLightboxModal();
      closeDrawer();
      if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
      }
    }
  });

  /* -------------------------------------------------------------------------
   * 11. Premium Scroll Reveal Animation System
   *
   * - Triggers slightly before element reaches viewport center (rootMargin -12%)
   * - Replays on re-entry after leaving viewport (with debounce)
   * - Auto-staggers sibling animated elements in containers
   * - Cleans up will-change after animation completes to free GPU memory
   * - GPU-accelerated via translate3d in CSS
   * ------------------------------------------------------------------------- */

  const ANIM_SELECTORS = '.fade-up, .fade-down, .fade-left, .fade-right, .zoom-in';
  const ANIM_DURATION_MS = 900; // matches CSS --anim-duration
  const STAGGER_MS = 80;

  // Auto-stagger: assign stagger-N classes to consecutive animated siblings
  const staggerContainers = document.querySelectorAll(
    '.grid, .flex, [class*="gap-"], [class*="space-"]'
  );
  staggerContainers.forEach(container => {
    const animChildren = Array.from(container.children).filter(
      child => child.matches(ANIM_SELECTORS)
    );
    if (animChildren.length > 1 && animChildren.length <= 8) {
      animChildren.forEach((child, i) => {
        if (i > 0) child.classList.add(`stagger-${i}`);
      });
    }
  });

  // Debounce map to prevent rapid toggling at viewport boundary
  const debounceMap = new WeakMap();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Clear any pending hide timeout
        const existingTimeout = debounceMap.get(el);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
          debounceMap.delete(el);
        }

        el.classList.add('visible');

        // Clean up will-change after animation settles
        setTimeout(() => {
          el.style.willChange = 'auto';
        }, ANIM_DURATION_MS + 100);
      } else {
        // Debounce the hide to prevent flickering at boundary
        const timeout = setTimeout(() => {
          el.classList.remove('visible');
          // Restore will-change for next animation
          el.style.willChange = 'transform, opacity';
          debounceMap.delete(el);
        }, 150);
        debounceMap.set(el, timeout);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -12% 0px'
  });

  document.querySelectorAll(ANIM_SELECTORS).forEach(el => {
    revealObserver.observe(el);
  });

  /* -------------------------------------------------------------------------
   * 12. Counter Number Animations
   * ------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = count.toFixed(decimals) + suffix;
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target.toFixed(decimals) + suffix;
        }
      };
      updateCount();
    });
  };

  const statisticsSection = document.getElementById('statistics');
  if (statisticsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    }, { threshold: 0.2 });
    statsObserver.observe(statisticsSection);
  }
});
