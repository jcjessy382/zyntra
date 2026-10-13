/* =====================================================
   ZYNTRA INTERACTIONS
   ===================================================== */


/* ================= BUTTON RIPPLE ================= */

document.addEventListener("click", function(event) {

    let button = event.target.closest("button");

    if (!button) return;

    let ripple = document.createElement("span");

    ripple.classList.add("ripple");

    let rect = button.getBoundingClientRect();

    ripple.style.left =
        (event.clientX - rect.left) + "px";

    ripple.style.top =
        (event.clientY - rect.top) + "px";

    button.appendChild(ripple);

    setTimeout(function() {
        ripple.remove();
    }, 600);

});


/* ================= SCROLL ANIMATION ================= */

const animatedElements =
    document.querySelectorAll(
        ".feature-card, .stats-section div, .dashboard-card, .floating-card"
    );


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach(function(element) {

    element.classList.add("hidden");

    observer.observe(element);

});


/* ================= AI TYPING EFFECT ================= */

const aiText =
    document.querySelector(".ai-card small");


if (aiText) {

    const messages = [
        "Ready to help",
        "Ask me anything",
        "Let's learn together",
        "Your AI assistant"
    ];

    let messageIndex = 0;

    setInterval(function() {

        messageIndex++;

        if (messageIndex >= messages.length) {
            messageIndex = 0;
        }

        aiText.style.opacity = "0";

        setTimeout(function() {

            aiText.textContent =
                messages[messageIndex];

            aiText.style.opacity = "1";

        }, 300);

    }, 3000);

}


/* ================= HERO PARALLAX ================= */

const heroVisual =
    document.querySelector(".hero-visual");


document.addEventListener("mousemove", function(event) {

    if (!heroVisual) return;

    const x =
        (window.innerWidth / 2 - event.clientX) / 70;

    const y =
        (window.innerHeight / 2 - event.clientY) / 70;

    heroVisual.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* ================= CURRENT YEAR ================= */

const yearElement =
    document.querySelector("footer small");


if (yearElement) {

    yearElement.textContent =
        "© " +
        new Date().getFullYear() +
        " ZYNTRA. Built for the next generation.";

}