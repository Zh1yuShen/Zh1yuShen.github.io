const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealOnScroll.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => revealOnScroll.observe(element));
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sectionMap = new Map(
  navLinks.map((link) => [link.getAttribute("href").slice(1), link])
);
const observedSections = Array.from(document.querySelectorAll("main section[id]"));

if ("IntersectionObserver" in window && observedSections.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        .forEach((entry) => {
          const activeLink = sectionMap.get(entry.target.id);
          if (!activeLink) {
            return;
          }

          navLinks.forEach((link) => link.classList.remove("is-active"));
          activeLink.classList.add("is-active");
        });
    },
    {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: "-25% 0px -55% 0px",
    }
  );

  observedSections.forEach((section) => navObserver.observe(section));
}

if (navLinks.length > 0) {
  navLinks[0].classList.add("is-active");
}

const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxClose = document.getElementById("lightbox-close");
const figureTriggers = Array.from(
  document.querySelectorAll(".publication-figure-interactive")
);

const closeLightbox = () => {
  if (!lightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxTitle.textContent = "";
  document.body.style.overflow = "";
};

const openLightbox = (figure) => {
  if (!lightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  const image = figure.querySelector("img");
  if (!image) {
    return;
  }

  const fullSource = figure.dataset.lightboxSrc || image.src;
  lightboxImage.src = fullSource;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = figure.dataset.title || "Figure Preview";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

figureTriggers.forEach((figure) => {
  figure.addEventListener("click", () => openLightbox(figure));
  figure.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(figure);
    }
  });
});

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
