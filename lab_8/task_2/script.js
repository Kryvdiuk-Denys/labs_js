
class Slider {

    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.error('Контейнер не знайдено:', selector);
            return;
        }


        const defaults = {
            images: [
                'https://picsum.photos/id/1015/800/500',
                'https://picsum.photos/id/104/800/500',
                'https://picsum.photos/id/106/800/500'
            ],
            duration: 500,
            autoplay: false,
            showArrows: true,
            showDots: true
        };


        this.config = { ...defaults, ...options };
        this.images = this.config.images;
        this.duration = this.config.duration;
        this.autoplay = this.config.autoplay;
        this.showArrows = this.config.showArrows;
        this.showDots = this.config.showDots;

        this.currentIndex = 0;
        this.slideCount = this.images.length;
        this.autoplayTimer = null;
        this.track = null;

        this.init();
    }


    init() {
        this.container.innerHTML = '';

        this.track = document.createElement('div');
        this.track.className = 'slider-track';

        this.images.forEach((imgSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Слайд ${index + 1}`;
            img.loading = 'lazy';
            
            slide.appendChild(img);
            this.track.appendChild(slide);
        });

        this.container.appendChild(this.track);

        if (this.showArrows) {
            this.addArrows();
        }

        if (this.showDots) {
            this.addDots();
        }

        this.updateSlidePosition(false);

        this.addKeyboardEvents();

        if (this.autoplay) {
            this.startAutoplay();
            this.addHoverEvents();
        }
    }


    addArrows() {
        const leftArrow = document.createElement('div');
        leftArrow.className = 'slider-arrow arrow-left';
        leftArrow.innerHTML = '‹';
        leftArrow.addEventListener('click', () => this.prev());

        const rightArrow = document.createElement('div');
        rightArrow.className = 'slider-arrow arrow-right';
        rightArrow.innerHTML = '›';
        rightArrow.addEventListener('click', () => this.next());

        this.container.appendChild(leftArrow);
        this.container.appendChild(rightArrow);
    }


    addDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        this.dots = [];

        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === this.currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }

        this.container.appendChild(dotsContainer);
    }


    updateActiveDot() {
        if (!this.dots) return;
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }


    updateSlidePosition(animate = true) {
        const offset = -this.currentIndex * 100;
        
        if (animate) {
            this.track.style.transition = `transform ${this.duration}ms ease`;
        } else {
            this.track.style.transition = 'none';
        }
        
        this.track.style.transform = `translateX(${offset}%)`;
        
        if (this.dots) {
            this.updateActiveDot();
        }
    }


    next() {
        if (this.currentIndex + 1 >= this.slideCount) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.updateSlidePosition(true);
    }


    prev() {
        if (this.currentIndex - 1 < 0) {
            this.currentIndex = this.slideCount - 1;
        } else {
            this.currentIndex--;
        }
        this.updateSlidePosition(true);
    }


    goToSlide(index) {
        if (index < 0 || index >= this.slideCount) return;
        this.currentIndex = index;
        this.updateSlidePosition(true);
    }


    addKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
                if (this.autoplay) {
                    this.restartAutoplay();
                }
            } else if (e.key === 'ArrowRight') {
                this.next();
                if (this.autoplay) {
                    this.restartAutoplay();
                }
            }
        });
    }


    startAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
        }
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, 3000);
    }


    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }


    restartAutoplay() {
        if (this.autoplay) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }


    addHoverEvents() {
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
}