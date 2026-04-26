document.addEventListener('DOMContentLoaded', () => {

   
    const timeElement = document.getElementById('local-time');
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-CO', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        timeElement.textContent = `MEDELLÍN ${timeStr}`;
    }, 1000);

   
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.preloader').classList.add('hidden');
        }, 500); 
    });

    
    const heroSection = document.querySelector('.hero');
    const container = document.getElementById('trail-container');

   
    const images = [
        'img/vetanatomy.png',
        'img/trail_3.png',
        'img/trail_4.png',
        'img/imagen_BodyRun_Logo.png'
    ];

    let imageIndex = 0;
    let lastMousePos = { x: 0, y: 0 };
    const distanceThreshold = 240; 

    
    window.addEventListener('mousemove', (e) => {
       
        if (window.scrollY > window.innerHeight) return;

        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > distanceThreshold) {
            createTrailImage(e.clientX, e.clientY);
            lastMousePos = { x: e.clientX, y: e.clientY };
        }
    });

    function createTrailImage(x, y) {
        const img = document.createElement('img');
        img.src = images[imageIndex];
        img.className = 'trail-img';

       
        const rotation = 0;

       
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

        container.appendChild(img);

       
        img.getBoundingClientRect();

      
        img.style.transition = 'opacity 0.8s ease-out';
        img.style.opacity = '1';
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

  
        setTimeout(() => {
          
            img.style.transition = 'opacity 0.8s ease-out';
            img.style.opacity = '0';
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

           
            setTimeout(() => {
                if (img.parentNode === container) {
                    container.removeChild(img);
                }
            }, 400); 
        }, 500); 

        imageIndex = (imageIndex + 1) % images.length;
    }


    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        const blurValue = Math.min(scrollY / 20, 20);
       
        const opacityValue = Math.max(1 - (scrollY / 500), 0);

        if (scrollY < window.innerHeight) {
            heroTitle.style.filter = `blur(${blurValue}px)`;
            heroTitle.style.opacity = opacityValue;
            heroSubtitle.style.filter = `blur(${blurValue}px)`;
            heroSubtitle.style.opacity = opacityValue;
        }
    });

   
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

});
