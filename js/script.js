/* ================= MENU MOBILE ================= */

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ================= STICKY HEADER ================= */

window.onscroll = () => {

    let header = document.querySelector('.header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /* ===== ACTIVE NAV LINK ===== */

    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    sections.forEach(sec => {

        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){

            navLinks.forEach(links => {
                links.classList.remove('active');
            });

            document.querySelector('header nav a[href*=' + id + ']')
            .classList.add('active');
        }
    });

    /* ===== CLOSE MENU MOBILE ===== */

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ================= TYPED JS ================= */

new Typed('.multiple-text', {

    strings:[
        'Cloud Engineer',
        'Cybersecurity Enthusiast',
        'DevOps Learner',
        'Zero Trust Architect'
    ],

    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

/* ================= SCROLL REVEAL ================= */

ScrollReveal({

    reset:false,
    distance:'80px',
    duration:2000,
    delay:200

});

ScrollReveal().reveal('.home-content, .heading', {
    origin:'top'
});

ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .skills-container', {
    origin:'bottom'
});

ScrollReveal().reveal('.about-img', {
    origin:'left'
});

ScrollReveal().reveal('.about-content', {
    origin:'right'
});

ScrollReveal().reveal('.education-box, .pfe-box, .contact form', {
    origin:'bottom'
});