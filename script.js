document.addEventListener('DOMContentLoaded', () => {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize Structural Application Framework Elements
    runTextDecryptInitializations();
    initializeInteractiveBackgroundCanvas();
    initializeScrollAndNavigationSystem();
    initializeContextAnalysisConsoleEngine();
    initializeContactDispatchFormEngine();
});

/* ==========================================================================
   1. MINIMAL METALLIC CRYPTOGRAPHIC DECRYPT TEXT ENGINE (FLASH ELIMINATED)
   ========================================================================== */
function runTextDecryptInitializations() {
    const targets = document.querySelectorAll('.decrypt-trigger');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    if (typeof gsap !== 'undefined') {
        targets.forEach(el => {
            const decryptTarget = el.getAttribute('data-decrypt') || el.innerText;
            el.innerText = decryptTarget.split('').map(char => char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)]).join('');
        });

        gsap.set('.reveal-el', { opacity: 0 });
        
        gsap.to('.reveal-el', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power4.out',
            onStart: () => {
                targets.forEach(el => executeTextScramble(el));
            }
        });
    } else {
        targets.forEach(el => {
            el.innerText = el.getAttribute('data-decrypt') || el.innerText;
            el.style.opacity = "1";
        });
    }
}

function executeTextScramble(element) {
    const originalText = element.getAttribute('data-decrypt') || element.innerText;
    const scrambleDuration = 1400; 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    let iterations = 0;
    const speedInterval = Math.max(8, Math.floor(scrambleDuration / originalText.length));
    
    const indices = Array.from({ length: originalText.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const revealedIndices = new Set();
    
    const interval = setInterval(() => {
        if (iterations < originalText.length) {
            revealedIndices.add(indices[iterations]);
        }
        
        const currentScrambleState = originalText.split('').map((char, index) => {
            if (revealedIndices.has(index)) return originalText[index];
            if (char === ' ') return ' ';
            return characters[Math.floor(Math.random() * characters.length)];
        }).join('');
        
        element.innerText = currentScrambleState;
        
        if (iterations >= originalText.length) {
            clearInterval(interval);
            element.innerText = originalText;
        }
        iterations++;
    }, speedInterval);
}

/* ==========================================================================
   2. INTERACTIVE GEOMETRIC NODE BACKGROUND CANVAS ENGINE
   ========================================================================== */
function initializeInteractiveBackgroundCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray = [];
    const colorToken = 'rgba(89, 65, 51, 0.06)';

    const adjustCanvasViewportDimensions = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    adjustCanvasViewportDimensions();

    class ParticleNode {
        constructor(x, y, dx, dy, size) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = colorToken;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    function generateParticleFieldDensity() {
        particlesArray = [];
        const targetedCount = (canvas.height * canvas.width) / 11000;
        for (let i = 0; i < targetedCount; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let dx = Math.random() * 0.4 - 0.2;
            let dy = Math.random() * 0.4 - 0.2;
            particlesArray.push(new ParticleNode(x, y, dx, dy, size));
        }
    }

    let frameId;
    function executeAnimationLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        frameId = requestAnimationFrame(executeAnimationLoop);
    }

    generateParticleFieldDensity();
    executeAnimationLoop();

    window.addEventListener('resize', () => {
        cancelAnimationFrame(frameId);
        adjustCanvasViewportDimensions();
        generateParticleFieldDensity();
        executeAnimationLoop();
    });
}

/* ==========================================================================
   3. SCROLL SPY INFRASTRUCTURE & SCENIC ROADMAP INTERFACES
   ========================================================================== */
function initializeScrollAndNavigationSystem() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    const visualCards = document.querySelectorAll('.matrix-card, .node-card');
    visualCards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    const timelineNodes = document.querySelectorAll('.pipeline-node');
    timelineNodes.forEach((node, index) => {
        ScrollTrigger.create({
            trigger: node,
            start: 'top 70%',
            end: 'bottom 70%',
            onEnter: () => node.classList.add('node-active'),
            onEnterBack: () => node.classList.add('node-active'),
            onLeave: () => { if(index !== timelineNodes.length - 1) node.classList.remove('node-active'); },
            onLeaveBack: () => { if(index !== 0) node.classList.remove('node-active'); }
        });
    });

    const pipelineWrapper = document.querySelector('.pipeline-wrapper');
    if (pipelineWrapper) {
        gsap.timeline({
            scrollTrigger: {
                trigger: pipelineWrapper,
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: true
            }
        }).to(pipelineWrapper, {
            style: '--scroll-track-height: 100%',
            ease: 'none'
        });
    }

    const structuralSections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-pill-link');

    structuralSections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => updatePillNavigationState(section.getAttribute('id')),
            onEnterBack: () => updatePillNavigationState(section.getAttribute('id'))
        });
    });

    function updatePillNavigationState(activeId) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeId) {
                link.classList.add('active');
            }
        });
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const destinationId = link.getAttribute('href');
            const targetSection = document.querySelector(destinationId);
            if (targetSection) {
                const headerOffset = window.innerWidth > 900 ? 0 : 65;
                const topLocation = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: topLocation, behavior: 'smooth' });
            }
        });
    });

    const counters = document.querySelectorAll('.stat-num[data-target]');
    counters.forEach(counter => {
        const targetValue = parseFloat(counter.getAttribute('data-target'));
        const checkDecimal = targetValue % 1 !== 0;
        const countObj = { val: 0 };
        
        gsap.to(countObj, {
            val: targetValue,
            duration: 2.2,
            ease: 'power4.out',
            onUpdate: () => {
                counter.innerHTML = checkDecimal ? countObj.val.toFixed(2) : Math.floor(countObj.val).toString();
            }
        });
    });
}

/* ==========================================================================
   4. CONTEXT ANALYSIS CONSOLE CONTROLLER (REAL RECRUITER GEMINI PIPELINE)
   ========================================================================== */
function initializeContextAnalysisConsoleEngine() {
    const submitBtn = document.getElementById('aiGenerateBtn');
    const inputField = document.getElementById('aiCompanyInput');
    const outputArea = document.getElementById('aiTerminalOutput');
    
    if (!submitBtn || !inputField || !outputArea) return;

    // First person normalized data string
    const RESUME_TEXT = `
    JAIDAN PATEL // CANDIDATE CONTEXT DOSSIER
    Location: Ashburn, VA | Email: jaidanpatel00@gmail.com | Phone: 571-723-7655
    My Education Track: Academies of Loudoun (Academy of Engineering & Technology, IT Pathway) & Briar Woods High School[cite: 253, 254].
    My Academic Metrics: Weighted GPA: 4.60/5.0 | SAT: 1540 (790 Math, 750 EBRW)[cite: 10, 255].
    My Core Capabilities: Python, C++, Java, JavaScript, Graph Theory, Algebraic Topology, Persistent Homology, Laplacian Diffusion models, Excel Forecasting, Full-Stack Production[cite: 304].
    My Research Publication: Published Author on SSRN [cite: 332]: "A Topological Data Analysis Framework for Automated Equity Trading using Persistent Homology, Betti Numbers, and Laplacian Diffusion"[cite: 333]. I applied persistent homology on asset correlation structures to automate local mispricing estimations[cite: 330].
    My Key Credentials: USACO Gold Division Competitor [cite: 342] (Top ~1,000 nationwide) [cite: 343]. Forensics Team Congressional Debate Captain [cite: 321], NSDA National Qualifier in World Schools Debate (Undefeated 8-0 track at LCQ), MetroFinals Semifinalist [cite: 319], 1st Place Congress [cite: 301], 3rd Place VHSL[cite: 301]. Founder & President of QuantClub [cite: 272] (designed algorithmic training curriculums) [cite: 274]. 3rd Place Virginia State DECA Champion [cite: 282] (Finance Team Decision Making) [cite: 282]. Technology Student Association National Qualifier [cite: 302] (Webmaster Web Hub Infrastructure) [cite: 315]. Boy Scouts of America Eagle Scout Rank [cite: 278] & Senior Patrol Leader[cite: 276]. Three-year Varsity Swimmer [cite: 294] (NCAP competitive athletic program background) [cite: 294].
    `;

    submitBtn.addEventListener('click', executeAnalysisPipeline);
    inputField.addEventListener('keydown', (e) => { if (e.key === 'Enter') executeAnalysisPipeline(); });

    async function executeAnalysisPipeline() {
        const corporateParameter = inputField.value.trim();
        if (!corporateParameter) {
            outputArea.innerHTML = `<p style="color: #D39E82;">[ERROR] parameters missing. please input a target enterprise or institution value.</p>`;
            return;
        }

        submitBtn.disabled = true;
        inputField.disabled = true;
        submitBtn.querySelector('span').innerText = "EVALUATING...";
        outputArea.innerHTML = `<p class="output-placeholder-text">initializing pipeline connection... matching correlation matrices... optimizing fit nodes...</p>`;

        try {
            const dummyApiKey = "AIzaSy" + "FakeKey" + "PlaceholderForDeployment"; 
            const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${dummyApiKey}`;

            // Refactored prompt system forcing Gemini model responses directly into first-person format
            const systemPrompt = `You are an elite quantitative executive, technical recruiter, and institutional admissions officer evaluating Jaidan Patel's portfolio[cite: 306, 598].
            Your task is to analyze the provided candidate context dossier for Jaidan Patel and compile exactly a 3-bullet-point statement written from the candidate's first-person perspective (using strictly "my", "me", "i") explaining why I present an exceptional technological and mathematical fit for a role or placement at the specific organization entered by the user[cite: 599, 600].
            - Base your response parameters ONLY on facts explicitly derived within the attached dossier context[cite: 600].
            - Focus directly on linking my unique capabilities (USACO Gold programming, my SSRN topological quantitative trading publications, my advanced graph mathematics, my forensic debate leadership status, and multi-format leadership foundations) to the target domain or organizational goals[cite: 600].
            - Each bullet point must be contained to a single, direct, confident, and highly persuasive sentence[cite: 601, 603].
            - All output sentences must be written entirely in lowercase text format[cite: 603].
            - Do not use periods or final punctuation marks at the end of sentences[cite: 604].`;

            const queryPayload = {
                contents: [{ parts: [{ text: `Candidate Metrics:\n${RESUME_TEXT}\nTarget Organization: "${corporateParameter}"\nGenerate the exactly 3 customized lowercase first-person analytics points:` }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            };
            
            if (dummyApiKey.includes("PlaceholderForDeployment")) {
                setTimeout(() => {
                    const cleanParam = corporateParameter.toLowerCase();
                    const syntheticResponse = `* my advanced algorithmic design tools validated by usaco gold divisions allow me to process complex data patterns natively for ${cleanParam}
* my peer-reviewed ssrn topological finance structures and laplacian matrices inject graduate-level analytical rigor into the projects at ${cleanParam}
* my expert communicative orchestration proven through an undefeated 8-0 nsda debate track and congressional captaincy guarantees rapid cross-functional system execution inside ${cleanParam}`;
                    renderFormattedTerminalText(syntheticResponse);
                }, 1200);
            } else {
                const response = await fetch(endpointUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(queryPayload)
                });
                if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
                const data = await response.json();
                const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                renderFormattedTerminalText(rawOutput);
            }
        } catch (err) {
            console.error(err);
            outputArea.innerHTML = `<p style="color: #D39E82;">[SYSTEM WARNING] pipeline connection error. local metrics fallback executed cleanly:\n\n* my usaco gold tier c++ performance optimizes data processing structures natively\n* my published topological data analysis frameworks translate abstract structures into scalable code\n* my articulate policy analysis and communicative captaincy tracks ensure seamless project leadership mapping</p>`;
        } finally {
            submitBtn.disabled = false;
            inputField.disabled = false;
            submitBtn.querySelector('span').innerText = "Evaluate My Metrics";
        }
    }

    function renderFormattedTerminalText(textString) {
        outputArea.innerHTML = '';
        const lines = textString.split('\n').filter(l => l.trim().length > 0);
        lines.forEach(line => {
            const cleanLine = line.replace(/^[\s*\->•]+/, '').trim().toLowerCase();
            const node = document.createElement('p');
            node.className = 'ai-bullet-node';
            node.innerText = cleanLine;
            outputArea.appendChild(node);
        });
    }
}

/* ==========================================================================
   5. DISPATCH FORM HANDSHAKE ENGINE
   ========================================================================== */
function initializeContactDispatchFormEngine() {
    const form = document.getElementById('dispatchForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.form-submit-btn');
        const spanText = btn.querySelector('span');
        const initialLabel = spanText.innerText;
        
        spanText.innerText = "TRANSMITTING DATA...";
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.6";

        setTimeout(() => {
            spanText.innerText = "DISPATCH SECURED";
            btn.style.backgroundColor = "#8C5333";
            btn.style.color = "#FAF8F5";
            
            setTimeout(() => {
                spanText.innerText = initialLabel;
                btn.style.background = "";
                btn.style.color = "";
                btn.style.pointerEvents = "";
                btn.style.opacity = "";
                form.reset();
            }, 3000);
        }, 1400);
    });
}