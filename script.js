// Portfolio Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Smooth scrolling for hero buttons
  const heroButtons = document.querySelectorAll(".hero-buttons a");
  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active navigation highlighting
  function highlightActiveNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightActiveNav);

  // Typing Animation
  const typingText = document.getElementById("typing-text");
  const textArray = [
    "Full Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "Problem Solver",
    "Code Enthusiast",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriter() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typeSpeed = 500; // Pause before starting new text
    }

    setTimeout(typeWriter, typeSpeed);
  }

  // Start typing animation
  typeWriter();

  // Scroll animations
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load

  // Add animation classes to elements
  function addAnimationClasses() {
    // About section animations
    const aboutText = document.querySelector(".about-text");
    const aboutStats = document.querySelector(".about-stats");
    if (aboutText) aboutText.classList.add("slide-in-left");
    if (aboutStats) aboutStats.classList.add("slide-in-right");

    // Skills animation
    const skillItems = document.querySelectorAll(".skill-item");
    skillItems.forEach((item, index) => {
      item.classList.add("fade-in");
      item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Projects animation
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
      card.classList.add("fade-in");
      card.style.transitionDelay = `${index * 0.2}s`;
    });

    // Contact section
    const contactInfo = document.querySelector(".contact-info");
    const contactForm = document.querySelector(".contact-form");
    if (contactInfo) contactInfo.classList.add("slide-in-left");
    if (contactForm) contactForm.classList.add("slide-in-right");
  }

  addAnimationClasses();

  // Animated skill bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      const skillItem = bar.closest(".skill-item");
      const skillTop = skillItem.getBoundingClientRect().top;

      if (skillTop < window.innerHeight - 100) {
        bar.style.width = targetWidth + "%";
      }
    });
  }

  let skillsAnimated = false;
  function checkSkillsAnimation() {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const skillsTop = skillsSection.getBoundingClientRect().top;

    if (skillsTop < window.innerHeight - 200 && !skillsAnimated) {
      animateSkillBars();
      skillsAnimated = true;
    }
  }

  window.addEventListener("scroll", checkSkillsAnimation);
  checkSkillsAnimation(); // Check on load

  // Animated counters for stats
  function animateCounters() {
    const statNumbers = document.querySelectorAll(".stat-item h4");

    statNumbers.forEach((stat) => {
      const target = parseInt(stat.textContent.replace(/\D/g, ""));
      const suffix = stat.textContent.replace(/[0-9]/g, "");
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + suffix;
      }, 50);
    });
  }

  let statsAnimated = false;
  function checkStatsAnimation() {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const aboutTop = aboutSection.getBoundingClientRect().top;

    if (aboutTop < window.innerHeight - 200 && !statsAnimated) {
      animateCounters();
      statsAnimated = true;
    }
  }

  window.addEventListener("scroll", checkStatsAnimation);
  checkStatsAnimation(); // Check on load

  // Scroll to top button
  const scrollTopBtn = document.getElementById("scroll-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Contact form handling
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    this.reset();
  });

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === "success" ? "✓" : "⚠"}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add notification styles
    const style = document.createElement("style");
    style.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                z-index: 1001;
                min-width: 300px;
                max-width: 400px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            }

            .notification.show {
                opacity: 1;
                transform: translateX(0);
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                font-family: 'Poppins', sans-serif;
            }

            .notification--success .notification-content {
                background: rgba(33, 128, 141, 0.1);
                border: 1px solid rgba(33, 128, 141, 0.3);
                color: var(--color-success);
            }

            .notification--error .notification-content {
                background: rgba(255, 84, 89, 0.1);
                border: 1px solid rgba(255, 84, 89, 0.3);
                color: var(--color-error);
            }

            .notification-icon {
                font-weight: bold;
                font-size: 18px;
            }

            .notification-message {
                flex: 1;
                font-size: 14px;
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                transition: opacity 0.2s ease;
            }

            .notification-close:hover {
                opacity: 1;
            }
        `;

    if (!document.querySelector(".notification-styles")) {
      style.className = "notification-styles";
      document.head.appendChild(style);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Close button functionality
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => {
          notification.remove();
        }, 300);
      });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove("show");
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const overlay = card.querySelector(".project-overlay");
    const links = card.querySelectorAll(".project-link");

    card.addEventListener("mouseenter", () => {
      links.forEach((link, index) => {
        setTimeout(() => {
          link.style.transform = "scale(1) translateY(0)";
          link.style.opacity = "1";
        }, index * 100);
      });
    });

    card.addEventListener("mouseleave", () => {
      links.forEach((link) => {
        link.style.transform = "scale(0.8) translateY(10px)";
        link.style.opacity = "0";
      });
    });
  });

  // Initialize project link animations
  projectCards.forEach((card) => {
    const links = card.querySelectorAll(".project-link");
    links.forEach((link) => {
      link.style.transform = "scale(0.8) translateY(10px)";
      link.style.opacity = "0";
      link.style.transition = "all 0.3s ease";
    });
  });

  // Parallax effect for hero section
  function parallaxEffect() {
    const hero = document.querySelector(".hero");
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.backgroundPositionY = rate + "px";
    }
  }

  window.addEventListener("scroll", parallaxEffect);

  // Smooth reveal animation for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
      }
    });
  }, observerOptions);

  // Observe all main sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("section-animate");
    observer.observe(section);
  });

  // Add CSS for section animations
  const sectionAnimationStyles = document.createElement("style");
  sectionAnimationStyles.textContent = `
        .section-animate {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }

        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(sectionAnimationStyles);

  // Initialize hero section as visible
  const heroSection = document.getElementById("home");
  if (heroSection) {
    heroSection.classList.add("section-visible");
  }

  // Loading animation (optional)
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Remove any loading spinners or overlays
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.remove();
      }, 500);
    }
  });

  // Performance optimization: Debounced scroll handler
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  //SEND MAIL
  function Mail() {
    let params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
    emailjs
      .send("service_rk2004", "template_brrooo", params)
      .then(function (res) {
        alert("Email Sent!!" + res.status);
      });
  }
  // Apply debouncing to scroll-heavy functions
  const debouncedScrollHandler = debounce(() => {
    highlightActiveNav();
    checkSkillsAnimation();
    checkStatsAnimation();
  }, 10);

  window.addEventListener("scroll", debouncedScrollHandler);

  // Easter egg: Konami code
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.keyCode);

    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      showNotification(
        "🎉 Konami code activated! You found the easter egg!",
        "success"
      );
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => {
        document.body.style.filter = "none";
      }, 3000);
      konamiCode = [];
    }
  });

  console.log("🚀 Portfolio website loaded successfully!");
  console.log("💡 Try the Konami code: ↑↑↓↓←→←→BA");
});
