document.addEventListener('DOMContentLoaded', () => {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Run core engine initializations
    runCinematicPreloader();
    initializeHeaderSystem();
});

/* ==========================================================================
   1. CINEMATIC INTRO PRELOADER & HERO REVEAL STREAM (IMMEDIATE COUNTERS)
   ========================================================================== */
function runCinematicPreloader() {
    const tl = gsap.timeline({
        onComplete: () => {
            document.getElementById('introLoader').remove();
            initializeScrollAnimations();
            // IMMEDIATE EVENT INJECTION: Trigger numerical tallies right here without waiting for scroll
            runNumericCounters(); 
        }
    });

    tl.to('.intro-text', {
        y: '-120%',
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.5
    })
    .to('.brand-bar', {
        width: '100%',
        duration: 1,
        ease: 'power3.inOut'
    }, '-=0.4')
    .from('.brand-mask', {
        yPercent: 100,
        duration: 1.2,
        ease: 'expo.out'
    }, '-=0.2')
    .to('.brand-bar, .brand-mask', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.6
    })
    .to('.intro-loader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
    }, '-=0.2');

    tl.from('.site-header', {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out'
    }, '-=0.3')
    .to('.reveal-el', {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power4.out'
    }, '-=0.9');
}

/* ==========================================================================
   2. SCROLL VIEW TRIGGER MAPS
   ========================================================================== */
function initializeScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Fade reveal blocks
    const structuralCards = document.querySelectorAll('.matrix-card, .future-showcase');
    structuralCards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Timeline Node Highlighting Tracks
    const pipelineNodes = document.querySelectorAll('.pipeline-node');
    pipelineNodes.forEach((node, idx) => {
        ScrollTrigger.create({
            trigger: node,
            start: 'top 65%',
            end: 'bottom 65%',
            onEnter: () => node.classList.add('node-active'),
            onEnterBack: () => node.classList.add('node-active'),
            onLeave: () => { if(idx !== pipelineNodes.length - 1) node.classList.remove('node-active'); },
            onLeaveBack: () => { if(idx !== 0) node.classList.remove('node-active'); }
        });
    });

    // Vertical Timeline tracker alignment metrics
    const pipelineWrapper = document.querySelector('.pipeline-wrapper');
    if (pipelineWrapper) {
        gsap.timeline({
            scrollTrigger: {
                trigger: pipelineWrapper,
                start: 'top 65%',
                end: 'bottom 65%',
                scrub: true
            }
        }).to(pipelineWrapper, {
            style: '--scroll-track-height: 100%',
            ease: 'none'
        });
    }

    // Navigation track bindings
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 40%',
            end: 'bottom 40%',
            onEnter: () => updateActiveNavLink(section.getAttribute('id')),
            onEnterBack: () => updateActiveNavLink(section.getAttribute('id'))
        });
    });
}

function updateActiveNavLink(id) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
}

/* ==========================================================================
   3. IMMEDIATE NUMERIC COUNTERS SEQUENCE
   ========================================================================== */
function runNumericCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        
        const countObj = { value: 0 };
        gsap.to(countObj, {
            value: target,
            duration: 1.8, // Slightly faster pacing for snap layout responses
            ease: 'power4.out',
            onUpdate: () => {
                counter.innerHTML = isDecimal ? 
                    countObj.value.toFixed(2) : 
                    Math.floor(countObj.value).toString();
            }
        });
    });
}

/* ==========================================================================
   4. HEADER SCROLL CONTEXT SIGNALS
   ========================================================================== */
function initializeHeaderSystem() {
    const header = document.getElementById('siteHeader');
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            menu.classList.toggle('open');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                menu.classList.remove('open');
            });
        });
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: { y: targetSection, offsetTop: 20 },
                        ease: 'power4.out'
                    });
                }
            }
        });
    });
}

/* ==========================================================================
   5. DISPATCH FORM CONTROLS
   ========================================================================== */
const form = document.getElementById('dispatchForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.form-submit-btn');
        const originalText = btn.querySelector('span').innerText;
        
        btn.querySelector('span').innerText = "SENDING...";
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.6";

        setTimeout(() => {
            btn.querySelector('span').innerText = "MESSAGE SENT";
            btn.style.backgroundColor = "#8B7355";
            
            setTimeout(() => {
                btn.querySelector('span').innerText = originalText;
                btn.style.background = "";
                btn.style.pointerEvents = "";
                btn.style.opacity = "";
                form.reset();
            }, 3000);
        }, 1200);
    });
}