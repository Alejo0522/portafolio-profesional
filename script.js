document.addEventListener('DOMContentLoaded', () => {

    // 1. Reloj en tiempo real
    const timeElement = document.getElementById('local-time');
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-CO', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        timeElement.textContent = `MEDELLÍN ${timeStr}`;
    }, 1000);

    // 2. Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.preloader').classList.add('hidden');
        }, 500); // Pequeño retraso para que se vea el logo
    });

    // 3. Efecto Mouse Trail en la sección Hero
    const heroSection = document.querySelector('.hero');
    const container = document.getElementById('trail-container');

    // Rutas a las imágenes generadas para el trail
    const images = [
        'img/vetanatomy.png',
        'img/trail_3.png',
        'img/trail_4.png',
        'img/imagen_BodyRun_Logo.png'
    ];

    let imageIndex = 0;
    let lastMousePos = { x: 0, y: 0 };
    const distanceThreshold = 240; // Distancia en px para mostrar nueva imagen (mayor valor = menos frecuente)

    // Aplicar a toda la ventana para que tenga más rango, pero solo mientras estemos arriba
    window.addEventListener('mousemove', (e) => {
        // Solo si el scroll está en la parte superior (hero visible)
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

        // Sin rotación (siempre rectas)
        const rotation = 0;

        // Establecer posición inicial (tamaño real, sin escalar)
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

        container.appendChild(img);

        // Forzar reflow para que la transición funcione
        img.getBoundingClientRect();

        // Animar entrada (más lenta en aparecer, solo cambia opacidad)
        img.style.transition = 'opacity 0.8s ease-out';
        img.style.opacity = '1';
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

        // Animar salida después de un momento
        setTimeout(() => {
            // Desaparecer rápido a la velocidad actual (0.4s)
            img.style.transition = 'opacity 0.8s ease-out';
            img.style.opacity = '0';
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

            // Eliminar del DOM una vez termine la transición rápida
            setTimeout(() => {
                if (img.parentNode === container) {
                    container.removeChild(img);
                }
            }, 400); // Coincide con la transición rápida (0.4s)
        }, 500); // Le damos un poco más de tiempo para que termine de aparecer (0.5s)

        imageIndex = (imageIndex + 1) % images.length;
    }

    // 4. Efecto de desenfoque al scrollear (Overlap Effect)
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Desenfoque basado en el scroll (máx blur de 20px)
        const blurValue = Math.min(scrollY / 20, 20);
        // Opacidad basada en el scroll (desaparece gradualmente)
        const opacityValue = Math.max(1 - (scrollY / 500), 0);

        if (scrollY < window.innerHeight) {
            heroTitle.style.filter = `blur(${blurValue}px)`;
            heroTitle.style.opacity = opacityValue;
            heroSubtitle.style.filter = `blur(${blurValue}px)`;
            heroSubtitle.style.opacity = opacityValue;
        }
    });

    // 5. Animación de revelado al scrollear (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

});
