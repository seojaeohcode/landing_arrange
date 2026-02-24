document.addEventListener('DOMContentLoaded', () => {
    // Tab switching (메인 / 패치노트)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panelMain = document.getElementById('panel-main');
    const panelPatch = document.getElementById('panel-patch');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            tabBtns.forEach(b => {
                b.classList.toggle('active', b.dataset.tab === tab);
                b.setAttribute('aria-selected', b.dataset.tab === tab);
            });
            if (tab === 'main') {
                panelMain.classList.add('active');
                panelMain.removeAttribute('hidden');
                panelPatch.classList.remove('active');
                panelPatch.setAttribute('hidden', '');
            } else {
                panelPatch.classList.add('active');
                panelPatch.removeAttribute('hidden');
                panelMain.classList.remove('active');
                panelMain.setAttribute('hidden', '');
            }
        });
    });

    // Patch notes timeline: click to expand/collapse
    document.querySelectorAll('.timeline-item').forEach(item => {
        const head = item.querySelector('.timeline-head');
        if (!head) return;
        head.addEventListener('click', () => {
            const isExpanded = item.classList.toggle('expanded');
            head.setAttribute('aria-expanded', isExpanded);
        });
    });

    // Fade-in animations (only for elements in main panel)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .purpose-item, .hero-content, .video-embed-wrap');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
