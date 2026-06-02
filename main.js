document.addEventListener("DOMContentLoaded", function () {
    const userAgent = navigator.userAgent;
    if (/MSIE|Trident/.test(userAgent)) {
        document.documentElement.classList.add("browser-legacy");
    }

    const reveals = document.querySelectorAll('.reveal');
    const bgBlob = document.getElementById('bgBlob');
    const bgLines = document.getElementById('bgLines');
    
    function onScroll() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Background effects calculation
        const scrollPercent = Math.min(scrollTop / windowHeight, 2);
        
        if (bgBlob) {
            const scaleX = 1 + scrollPercent * 0.4;
            const scaleY = 1 + scrollPercent * 0.9;
            const opacity = Math.max(1 - scrollPercent * 0.3, 0.3);
            bgBlob.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY}) rotate(${scrollTop * 0.05}deg)`;
            bgBlob.style.opacity = opacity;
        }
        
        if (bgLines) {
            bgLines.style.transform = `translateY(${scrollTop * 0.25}px) scaleY(${1 + scrollPercent * 0.1})`;
        }

        // Reveal elements on scroll
        const triggerBottom = windowHeight * 0.9; // Trigger slightly earlier
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    }

    if (!document.documentElement.classList.contains("browser-legacy")) {
        window.addEventListener('scroll', onScroll, { passive: true });
        // Initial check
        setTimeout(onScroll, 100); 
    }
});
