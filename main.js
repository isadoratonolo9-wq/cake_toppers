/* ==========================================
   JavaScript: Interactive Landing Page Logic
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // ----------------------------------------------------
  // 1. Persistent Scarcity Countdown Timer (15 Minutes)
  // ----------------------------------------------------
  const countdownTimer = document.getElementById("countdown-timer");
  const TIMER_DURATION_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
  
  let targetTime = localStorage.getItem("cake_toppers_timer_target");
  
  if (!targetTime) {
    targetTime = Date.now() + TIMER_DURATION_MS;
    localStorage.setItem("cake_toppers_timer_target", targetTime);
  } else {
    // If the saved target time is in the past, reset it to give a new 15-minute window
    if (Date.now() > parseInt(targetTime)) {
      targetTime = Date.now() + TIMER_DURATION_MS;
      localStorage.setItem("cake_toppers_timer_target", targetTime);
    }
  }

  function updateTimer() {
    const remainingTime = parseInt(targetTime) - Date.now();
    
    if (remainingTime <= 0) {
      // Loop: Reset timer to maintain scarcity if it expires
      const newTarget = Date.now() + TIMER_DURATION_MS;
      localStorage.setItem("cake_toppers_timer_target", newTarget);
      targetTime = newTarget;
      return;
    }

    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    countdownTimer.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  // Update immediately and then run interval
  updateTimer();
  setInterval(updateTimer, 1000);


  // ----------------------------------------------------
  // 2. FAQ Accordion Toggle Interaction
  // ----------------------------------------------------
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");
      
      // Close all other FAQ items for a clean accordion effect
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
      });

      // Toggle active state for clicked item
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });


  // ----------------------------------------------------
  // 3. Social Proof Toast Notification System
  // ----------------------------------------------------
  const socialToast = document.getElementById("social-toast");
  const toastBuyerName = document.getElementById("toast-buyer-name");
  const toastBuyerCountry = document.getElementById("toast-buyer-country");

  // Arrays derived from original site content strings
  const buyerNames = [
    "Camila Torres", "Daniela Hernández", "Paula Hernández", "Sofía García", 
    "María González", "Ana López", "Laura Martínez", "Valentina Pérez", 
    "Lucía Ramírez", "Valeria Rodríguez", "Gabriela Castro", "Isabella Vargas"
  ];

  const countries = [
    { name: "Perú", icon: "🇵🇪" },
    { name: "Colombia", icon: "🇨🇴" },
    { name: "Ecuador", icon: "🇪🇨" },
    { name: "México", icon: "🇲🇽" },
    { name: "España", icon: "🇪🇸" },
    { name: "Chile", icon: "🇨🇱" },
    { name: "Argentina", icon: "🇦🇷" }
  ];

  const purchaseTimes = [
    "compró hace 1 minuto",
    "compró hace 2 minutos",
    "compró hace 3 minutos",
    "compró hace 50 segundos",
    "acaba de comprar el pack"
  ];

  function showNotification() {
    // Pick random values
    const randomName = buyerNames[Math.floor(Math.random() * buyerNames.length)];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    const randomTime = purchaseTimes[Math.floor(Math.random() * purchaseTimes.length)];

    // Populate data
    toastBuyerName.textContent = randomName;
    socialToast.querySelector(".toast-action").textContent = randomTime;
    toastBuyerCountry.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${randomCountry.icon} ${randomCountry.name}`;

    // Remove hidden if present, then slide in
    socialToast.classList.remove("hidden");
    setTimeout(() => {
      socialToast.classList.add("show");
    }, 100);

    // Slide out after 5 seconds
    setTimeout(() => {
      socialToast.classList.remove("show");
      
      // Hide completely once transition finishes
      setTimeout(() => {
        socialToast.classList.add("hidden");
      }, 400);

    }, 5000);
  }

  // Initial delay of 6 seconds before first toast
  setTimeout(() => {
    showNotification();
    // Repeat notification cycle every 15 seconds
    setInterval(showNotification, 15000);
  }, 6000);


  // ----------------------------------------------------
  // 4. Video Click Play Overlay Trigger
  // ----------------------------------------------------
  const playOverlay = document.querySelector(".vsl-play-overlay");
  
  if (playOverlay) {
    playOverlay.addEventListener("click", () => {
      // Hide the overlay elements
      playOverlay.style.display = "none";
      
      const thumbnail = document.getElementById("thumb_69c984376983e3eba6dac87b");
      const backdrop = document.getElementById("backdrop_69c984376983e3eba6dac87b");
      
      if (thumbnail) thumbnail.style.display = "none";
      if (backdrop) backdrop.style.display = "none";
      
      // Attempt to play/unmute VTurb or standard video elements if loaded
      const iframe = document.querySelector(".vsl-video-wrapper iframe");
      if (iframe) {
        // Send message to player or append autoplay queries if supported
        let src = iframe.src;
        if (src.indexOf("muted=1") !== -1) {
          iframe.src = src.replace("muted=1", "muted=0").replace("autoplay=0", "autoplay=1");
        }
      }
      
      const video = document.querySelector(".vsl-video-wrapper video");
      if (video) {
        video.muted = false;
        video.play().catch(err => console.log("Video playback started muted due to browser policy", err));
      }
    });
  }

  // ----------------------------------------------------
  // 5. Interactive Birthday Balloon & Celebration System
  // ----------------------------------------------------

  // Curated color palettes
  const BALLOON_PALETTES = [
    { start: "#FF1E6C", end: "#E01058" }, // Pink/Magenta
    { start: "#F36523", end: "#D75218" }, // Orange/Red-Orange
    { start: "#FFD200", end: "#FF9000" }, // Yellow/Gold
    { start: "#00D2FF", end: "#0066FF" }, // Cyan/Blue
    { start: "#9F44D3", end: "#E21E80" }, // Purple/Pink
    { start: "#4CAF50", end: "#2E7D32" }  // Green
  ];

  const CONFETTI_COLORS = ["#FF1E6C", "#F36523", "#FFD200", "#00D2FF", "#9F44D3", "#4CAF50", "#FFFFFF"];

  // SVGs for decorated cakes with cake toppers
  const cakeSvg1 = `
  <svg viewBox="0 0 40 40" width="100%" height="100%">
    <line x1="20" y1="18" x2="20" y2="8" stroke="#F36523" stroke-width="1.5" />
    <path d="M20 3 L22 6 L25 6 L23 8 L24 11 L20 9 L16 11 L17 8 L15 6 L18 6 Z" fill="#FFD200" stroke="#FAF4F0" stroke-width="0.5" />
    <rect x="11" y="18" width="18" height="8" rx="2" fill="#FF1E6C" />
    <path d="M11 21 Q 13 23, 15 21 T 19 21 T 23 21 T 27 21 T 29 21" fill="none" stroke="#FFF" stroke-width="1" />
    <rect x="7" y="26" width="26" height="11" rx="2" fill="#9F44D3" />
    <path d="M7 30 Q 10 32, 13 30 T 19 30 T 25 30 T 31 30 T 33 30" fill="none" stroke="#FFF" stroke-width="1" />
    <circle cx="20" cy="18" r="1.5" fill="#FF3B3B" />
  </svg>
  `;

  const cakeSvg2 = `
  <svg viewBox="0 0 40 40" width="100%" height="100%">
    <line x1="20" y1="18" x2="20" y2="8" stroke="#9F44D3" stroke-width="1.5" />
    <path d="M20 8 C18 5, 14 5, 14 8 C14 11, 20 14, 20 14 C20 14, 26 11, 26 8 C26 5, 22 5, 20 8 Z" fill="#FF1E6C" stroke="#FFF" stroke-width="0.5" />
    <rect x="12" y="18" width="16" height="8" rx="2" fill="#FFAA00" />
    <rect x="8" y="26" width="24" height="11" rx="2" fill="#00D2FF" />
    <circle cx="15" cy="26" r="1.5" fill="#FFF" />
    <circle cx="20" cy="26" r="1.5" fill="#FFF" />
    <circle cx="25" cy="26" r="1.5" fill="#FFF" />
  </svg>
  `;

  const cakeSvg3 = `
  <svg viewBox="0 0 40 40" width="100%" height="100%">
    <line x1="20" y1="20" x2="20" y2="10" stroke="#FF1E6C" stroke-width="1.5" />
    <polygon points="20,10 28,13 20,16" fill="#00D2FF" stroke="#FFF" stroke-width="0.5" />
    <path d="M12 24 C12 18, 28 18, 28 24 C30 24, 30 28, 28 28 C26 30, 14 30, 12 28 C10 28, 10 24, 12 24 Z" fill="#FAF4F0" />
    <polygon points="13,28 27,28 25,38 15,38" fill="#F36523" />
    <line x1="16" y1="28" x2="17" y2="38" stroke="#FFF" stroke-width="0.8" />
    <line x1="20" y1="28" x2="20" y2="38" stroke="#FFF" stroke-width="0.8" />
    <line x1="24" y1="28" x2="23" y2="38" stroke="#FFF" stroke-width="0.8" />
  </svg>
  `;

  // Mouse coordinate trackers
  let mouseX = -9999;
  let mouseY = -9999;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Touch support for mobile interaction
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  class Balloon {
    constructor(container, isInner = false) {
      this.container = container;
      this.isInner = isInner;
      this.el = null;
      this.knotEl = null;
      this.stringEl = null;
      this.init();
    }

    init() {
      // 60% chance balloon, 40% chance decorated cake
      this.type = Math.random() > 0.4 ? "balloon" : "cake";
      this.el = document.createElement("div");
      
      if (this.type === "balloon") {
        this.el.className = "balloon";
        
        this.knotEl = document.createElement("div");
        this.knotEl.className = "balloon-knot";
        this.el.appendChild(this.knotEl);

        // Create SVG string representation
        const stringSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        stringSvg.setAttribute("class", "balloon-string-svg");
        stringSvg.setAttribute("viewBox", "0 0 10 36");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M5 0 Q 2 9, 5 18 T 5 36");
        path.setAttribute("fill", "none");
        // Darker stroke for light background (inside), lighter stroke for dark background (outside)
        path.setAttribute("stroke", this.isInner ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.3)");
        path.setAttribute("stroke-width", "1.2");
        stringSvg.appendChild(path);
        this.el.appendChild(stringSvg);
      } else {
        this.el.className = "cake-element";
        const cakeSvgs = [cakeSvg1, cakeSvg2, cakeSvg3];
        const selectedSvg = cakeSvgs[Math.floor(Math.random() * cakeSvgs.length)];
        this.el.innerHTML = selectedSvg;
      }

      this.container.appendChild(this.el);

      this.reset(true);
      
      // Interactive Click/Tap Pop
      this.el.addEventListener("click", (e) => {
        e.stopPropagation();
        this.pop();
      });
    }

    reset(initial = false) {
      const rect = this.container.getBoundingClientRect();
      this.width = this.isInner ? (35 + Math.random() * 20) : (45 + Math.random() * 25);
      this.height = this.type === "balloon" ? (this.width * 1.22) : this.width;
      
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;

      this.x = Math.random() * (rect.width - this.width);
      
      // If initial, scatter them vertically; else start from bottom
      this.y = initial 
        ? (rect.height + 100 + Math.random() * rect.height)
        : (rect.height + 100 + Math.random() * 100);

      this.vx = 0;
      this.baseSpeed = this.isInner ? (0.5 + Math.random() * 0.8) : (0.8 + Math.random() * 1.2);
      this.vy = this.baseSpeed;
      
      this.angle = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.01 + Math.random() * 0.02;
      this.swayWidth = 0.3 + Math.random() * 0.5;

      if (this.type === "balloon") {
        const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
        this.el.style.setProperty("--balloon-color-start", palette.start);
        this.el.style.setProperty("--balloon-color-end", palette.end);
        this.el.style.setProperty("--knot-color", palette.end);
      }
      
      // Opacity for inner balloons - subtle since they float behind the content/cards
      this.el.style.opacity = this.isInner ? (0.3 + Math.random() * 0.2) : (0.85 + Math.random() * 0.15);
      
      this.isPopped = false;
      this.el.classList.remove("popped");
      this.updateStyle();
    }

    updateStyle() {
      this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.vx * 2.2}deg)`;
    }

    update() {
      if (this.isPopped) return;

      // Apply base vertical speed
      this.y -= this.vy;

      // Apply natural horizontal swaying
      this.angle += this.swaySpeed;
      this.x += Math.sin(this.angle) * this.swayWidth;

      // Mouse interactive push
      const rect = this.container.getBoundingClientRect();
      // Calculate viewport mouse relative to this container
      const cMouseX = mouseX - rect.left;
      const cMouseY = mouseY - rect.top;

      const balloonCenterX = this.x + this.width / 2;
      const balloonCenterY = this.y + this.height / 2;

      const dx = balloonCenterX - cMouseX;
      const dy = balloonCenterY - cMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const pushRadius = 100;

      if (distance < pushRadius && distance > 0) {
        const force = (pushRadius - distance) / pushRadius;
        // Pushing vector away from mouse
        const pushX = (dx / distance) * force * (this.isInner ? 1.5 : 3.0);
        const pushY = (dy / distance) * force * (this.isInner ? 1.0 : 2.5);

        this.vx += pushX;
        // Vertically, we also push, but don't let them go too fast downwards
        this.vy = Math.max(0.2, this.vy - pushY * 0.5);
      }

      // Drag / friction
      this.vx *= 0.94;
      this.x += this.vx;

      // Return vy back to base speed
      this.vy = this.vy * 0.95 + this.baseSpeed * 0.05;

      // Keep inside bounds horizontal
      if (this.x < -20) {
        this.x = -20;
        this.vx *= -0.5;
      } else if (this.x > rect.width - this.width + 20) {
        this.x = rect.width - this.width + 20;
        this.vx *= -0.5;
      }

      this.updateStyle();

      // Reset when floating out of top boundary
      if (this.y < -150) {
        this.reset();
      }
    }

    pop() {
      if (this.isPopped) return;
      this.isPopped = true;
      this.el.classList.add("popped");

      // Spawn Confetti Particles
      const rect = this.container.getBoundingClientRect();
      const balloonCenterX = this.x + this.width / 2;
      const balloonCenterY = this.y + this.height / 2;
      
      // Inside viewport coords
      const burstX = balloonCenterX + (this.isInner ? 0 : rect.left);
      const burstY = balloonCenterY + (this.isInner ? 0 : rect.top);
      
      const particleContainer = this.isInner 
        ? this.container 
        : document.body;

      createConfettiBurst(burstX, burstY, 15, particleContainer);

      // Reset the balloon to bottom after pop animation finishes
      setTimeout(() => {
        this.reset();
      }, 150);
    }
  }

  // Confetti Particle System
  class ConfettiParticle {
    constructor(x, y, container) {
      this.x = x;
      this.y = y;
      this.container = container;
      this.el = null;
      this.init();
    }

    init() {
      this.el = document.createElement("div");
      this.el.className = "confetti-particle";
      
      // Random Shape (square vs circle)
      if (Math.random() > 0.5) {
        this.el.className += " square";
      }

      const size = 6 + Math.random() * 8;
      this.el.style.width = `${size}px`;
      this.el.style.height = `${size}px`;
      this.el.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      
      // Random initial velocities
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = -5 - Math.random() * 12;
      
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 15;
      
      this.gravity = 0.25 + Math.random() * 0.25;
      this.opacity = 1;
      this.decay = 0.015 + Math.random() * 0.015;

      this.container.appendChild(this.el);
      this.updateStyle();
    }

    updateStyle() {
      this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg)`;
      this.el.style.opacity = this.opacity;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.decay;
      
      // Add a bit of air resistance to horizontal velocity
      this.vx *= 0.98;

      this.updateStyle();

      if (this.opacity <= 0) {
        this.destroy();
        return false;
      }
      return true;
    }

    destroy() {
      if (this.el && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }
    }
  }

  const activeConfetti = [];

  function createConfettiBurst(x, y, count, container) {
    for (let i = 0; i < count; i++) {
      activeConfetti.push(new ConfettiParticle(x, y, container));
    }
  }

  // Instantiate Balloon Managers
  const innerContainer = document.getElementById("balloon-container-inner");
  const bgContainer = document.getElementById("balloon-container-bg");
  
  const balloons = [];

  // Spawn initial balloons inside (mobile background)
  if (innerContainer) {
    const innerCount = 8;
    for (let i = 0; i < innerCount; i++) {
      balloons.push(new Balloon(innerContainer, true));
    }
  }

  // Spawn initial balloons outside (desktop margins)
  if (bgContainer) {
    // Only spawn outer balloons if we are on a desktop width viewport to save resources
    const checkOuterBalloons = () => {
      const isDesktop = window.innerWidth > 500;
      const currentBgBalloons = balloons.filter(b => !b.isInner);
      
      if (isDesktop && currentBgBalloons.length === 0) {
        const bgCount = 7;
        for (let i = 0; i < bgCount; i++) {
          balloons.push(new Balloon(bgContainer, false));
        }
      } else if (!isDesktop && currentBgBalloons.length > 0) {
        // Remove bg balloons to optimize mobile performance
        currentBgBalloons.forEach(b => {
          if (b.el && b.el.parentNode) {
            b.el.parentNode.removeChild(b.el);
          }
          const index = balloons.indexOf(b);
          if (index > -1) balloons.splice(index, 1);
        });
      }
    };
    
    checkOuterBalloons();
    window.addEventListener("resize", checkOuterBalloons);
  }

  // Master Physics / Animation loop
  function tick() {
    // Update balloons
    balloons.forEach(b => b.update());

    // Update confetti particles backwards to allow safe removal
    for (let i = activeConfetti.length - 1; i >= 0; i--) {
      const alive = activeConfetti[i].update();
      if (!alive) {
        activeConfetti.splice(i, 1);
      }
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  // Celebration FAB removed.

});
