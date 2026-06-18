console.log("BRWC website loaded");

/* carousel */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

let currentSlide = 0;
let autoPlay;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  if (!slides.length) return;

  let nextIndex = currentSlide + 1;

  if (nextIndex >= slides.length) {
    nextIndex = 0;
  }

  showSlide(nextIndex);
}

function prevSlide() {
  if (!slides.length) return;

  let prevIndex = currentSlide - 1;

  if (prevIndex < 0) {
    prevIndex = slides.length - 1;
  }

  showSlide(prevIndex);
}

function startAutoPlay() {
  if (slides.length <= 1) return;

  autoPlay = setInterval(() => {
    nextSlide();
  }, 3600);
}

function restartAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

if (slides.length > 0) {
  showSlide(0);
  startAutoPlay();
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoPlay();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    restartAutoPlay();
  });
});

/* reveal on scroll */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

/* cursor glow */
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
  window.addEventListener("mousemove", event => {
    cursorGlow.classList.add("active");
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  window.addEventListener("mouseleave", () => {
    cursorGlow.classList.remove("active");
  });

  const hoverTargets = document.querySelectorAll("a, button, .magnetic");

  hoverTargets.forEach(target => {
    target.addEventListener("mouseenter", () => {
      cursorGlow.classList.add("hovering");
    });

    target.addEventListener("mouseleave", () => {
      cursorGlow.classList.remove("hovering");
    });
  });
}

/* subtle hero parallax */
const heroStage = document.querySelector(".hero-stage");
const heroArt = document.querySelector(".hero-art");

if (heroStage && heroArt) {
  heroStage.addEventListener("mousemove", event => {
    const rect = heroStage.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroArt.style.transform = `scale(1.04) translate(${x * 16}px, ${y * 12}px)`;
  });

  heroStage.addEventListener("mouseleave", () => {
    heroArt.style.transform = "scale(1.015) translate(0, 0)";
  });
}

/* magnetic hover movement */
const magneticItems = document.querySelectorAll(".magnetic");

magneticItems.forEach(item => {
  item.addEventListener("mousemove", event => {
    const rect = item.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0, 0)";
  });
});

/* copy contract address */
const copyCaBtn = document.getElementById("copy-ca-btn");
const caValue = document.getElementById("ca-value");
const copyFeedback = document.getElementById("copy-feedback");

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

if (copyCaBtn && caValue && copyFeedback) {
  copyCaBtn.addEventListener("click", async () => {
    const textToCopy = caValue.textContent.trim();

    try {
      await copyText(textToCopy);

      copyFeedback.classList.add("show");

      setTimeout(() => {
        copyFeedback.classList.remove("show");
      }, 1400);
    } catch (error) {
      console.error("Failed to copy CA:", error);
    }
  });
}

/* roadmap interactive stops */
const roadStops = document.querySelectorAll(".road-stop");

roadStops.forEach(stop => {
  stop.addEventListener("mouseenter", () => {
    roadStops.forEach(item => item.classList.remove("active"));
    stop.classList.add("active");
  });

  stop.addEventListener("mouseleave", () => {
    stop.classList.remove("active");
  });

  stop.addEventListener("click", () => {
    const isActive = stop.classList.contains("active");

    roadStops.forEach(item => item.classList.remove("active"));

    if (!isActive) {
      stop.classList.add("active");
    }
  });
});