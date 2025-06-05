//preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.opacity = 'opacity 0.5s ease';
    this.setTimeout(() => preloader.style.display = 'none', 500)
});

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({behavior: 'smooth'});
        }
    });
});
