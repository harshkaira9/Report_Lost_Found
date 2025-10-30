class AccordionSlider {
            constructor() {
                // Select slides using the generic class, which is fine
                this.itemSlides = document.querySelectorAll(".slide"); 
                this.prevBtn = document.querySelector(".nav-prev");
                this.nextBtn = document.querySelector(".nav-next");
                this.currentIndex = -1;

                this.init();
            }

            init() {
                this.itemSlides.forEach((slide, index) => {
                    slide.addEventListener("click", () => this.setActiveSlide(index));
                });

                this.prevBtn.addEventListener("click", () => this.previousSlide());
                this.nextBtn.addEventListener("click", () => this.nextSlide());

                document.addEventListener("keydown", (e) => {
                    if (e.key === "ArrowLeft") this.previousSlide();
                    if (e.key === "ArrowRight") this.nextSlide();
                });
            }

            setActiveSlide(index) {
                if (this.currentIndex === index) {
                    // Clicking the active slide deactivates it
                    this.itemSlides.forEach((slide) => slide.classList.remove("active"));
                    this.currentIndex = -1;
                } else {
                    // Activate the new slide
                    this.itemSlides.forEach((slide) => slide.classList.remove("active"));
                    this.itemSlides[index].classList.add("active");
                    this.currentIndex = index;
                }
            }

            nextSlide() {
                const nextIndex =
                    this.currentIndex === -1 ? 0 : (this.currentIndex + 1) % this.itemSlides.length;
                this.setActiveSlide(nextIndex);
            }

            previousSlide() {
                const prevIndex =
                    this.currentIndex === -1
                        ? this.itemSlides.length - 1
                        : (this.currentIndex - 1 + this.itemSlides.length) % this.itemSlides.length;
                this.setActiveSlide(prevIndex);
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            new AccordionSlider();
        }
);