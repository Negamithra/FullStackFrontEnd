// ================================
// VolunteerView Home Page Script
// ================================


// ---------- Smooth Scroll ----------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// ---------- Navbar Shadow ----------

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";

    } else {

        header.style.boxShadow = "0 2px 15px rgba(0,0,0,0.08)";

    }

});


// ---------- Active Navigation ----------

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ---------- Counter Animation ----------

const counters = document.querySelectorAll(".stat-box h1");

let started = false;

window.addEventListener("scroll", () => {

    const statsSection = document.querySelector(".statistics");

    if (!statsSection) return;

    const position = statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight && !started) {

        started = true;

        counters.forEach(counter => {

            const target = parseInt(counter.innerText);

            let count = 0;

            const speed = target / 100;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    counter.innerText = Math.ceil(count) + "+";

                    requestAnimationFrame(updateCounter);

                }

                else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

        });

    }

});


// ---------- Fade In Sections ----------

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});


// ---------- Hero Button ----------

const heroBtn = document.querySelector(".primary-btn");

if (heroBtn) {

    heroBtn.addEventListener("mouseenter", () => {

        heroBtn.style.transform = "scale(1.05)";

    });

    heroBtn.addEventListener("mouseleave", () => {

        heroBtn.style.transform = "scale(1)";

    });

}


// ---------- Console ----------

console.log("VolunteerView Home Loaded Successfully");