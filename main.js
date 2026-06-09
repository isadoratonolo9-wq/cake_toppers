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



});
