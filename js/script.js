let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {

    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

};

new Typed('.multiple-text', {

    strings: [
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

ScrollReveal({

    distance:'80px',
    duration:2000,
    delay:200

});

ScrollReveal().reveal('.home-content, .heading', {
    origin:'top'
});

ScrollReveal().reveal('.home-img, .services-container, .portfolio-box', {
    origin:'bottom'
});

ScrollReveal().reveal('.about-img', {
    origin:'left'
});

ScrollReveal().reveal('.about-content', {
    origin:'right'
});