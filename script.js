// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Project cards animation
gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      // reverse animation when scrolling back up
      toggleActions: "play reverse play reverse",
      once: false
    },
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.1,
    ease: "power3.out",
    delay: i * 0.1
  });
});

// Process cards
gsap.utils.toArray(".process-card").forEach((card) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play reverse play reverse",
      once: false
    },
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out"
  });
});

// Team members
gsap.utils.toArray(".team-member").forEach((member, i) => {
  gsap.to(member, {
    scrollTrigger: {
      trigger: member,
      start: "top 85%",
      toggleActions: "play reverse play reverse",
      once: false
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: i * 0.15
  });
});

// Mobile nav toggle
const toggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 70;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Close mobile menu
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

// refresh scroll triggers on resize/zoom to maintain correct positions
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });

  // ensure ScrollTrigger re-evaluates positions during zoom/scroll
  ScrollTrigger.update();
});

// Prototype modal logic
const protoModal = document.getElementById('protoModal');
const closeProtoModal = document.getElementById('closeProtoModal');
const protoLink = document.getElementById('protoLink');

document.querySelectorAll('.proto-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault(); // prevent default only if needed
    const link = btn.getAttribute('href');

    if (link && link !== '#' && link.trim() !== '') {
      protoLink.href = link;
      protoLink.textContent = "Open Prototype →";
      protoLink.style.pointerEvents = "auto";
      protoLink.style.opacity = "1";
    } else {
      protoLink.href = "#";
      protoLink.textContent = "No prototype available";
      protoLink.style.pointerEvents = "none";
      protoLink.style.opacity = "0.5";
    }

    protoModal.classList.add('show');
  });
});

if (closeProtoModal) {
  closeProtoModal.onclick = () => {
    protoModal.classList.remove('show');
  };
}

if (protoModal) {
  protoModal.onclick = e => {
    if (e.target === protoModal) {
      protoModal.classList.remove('show');
    }
  };
}