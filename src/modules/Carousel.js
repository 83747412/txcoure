import $ from 'jquery';
export default class Carousel {
    constructor (options) {

        this.autoplay = options.autoplay;
        this.duration = options.duration;

        this.$carousel = $('.J_carousel');
        this.$carList = this.$carousel.find('.carousel-list');
        this.$carItems = this.$carList.children('.car-item');
        this.$indicatorItems = this.$carousel.find('.indicator-item');
        this.curIndx = 0;
    }
    init () {
        this.autoplay && this.autoPlay();
        this.bindEvent();
    }

    bindEvent () {
        this.$carousel.on('mouseover', $.proxy(this.mouseInOut, this));
        this.$carousel.on('mouseout', $.proxy(this.mouseInOut, this));
        this.$carousel.on('click', $.proxy(this.onCarouselClick, this));
    }

    mouseInOut (ev) {
        const e = ev || window.event,
              eventType = e.type;

        switch(eventType){
            case 'mouseover':
                clearInterval(this.timer);
                this.timer = null;
                break;
            case 'mouseout':
                this.autoplay && this.autoPlay();
                break;
        }
    }

    onCarouselClick (ev) {
        const e = ev || window.event,
              tar = e.target || e.srcElement,
              className = tar.className;
        if(className === 'indicator-item') {
            this.curIndx = $(tar).index();
            this.setSlider(this.curIndx, '', false);
        }
    }

    autoPlay () {
        this.timer = setInterval($.proxy(this.run, this), this.duration);
    }

    run () {
        this.slideAction('next');
    }

    slideAction (dir) {
        let t = null;

        switch (dir){
            case 'next':
            if(this.curIndx == this.$carItems.length - 1){
                this.curIndx = 1;
                this.setSlider(this.curIndx, dir, true);

                t = setTimeout(() => {
                    this.setSlider(this.curIndx, dir, true);
                    clearTimeout(t);
                }, 100);
            }else {
                this.curIndx ++;
                this.setSlider(this.curIndx, dir, false);
            }
            break;

            case 'prev':
                if(this.curIndx === 0){
                    this.curIndx = (this.$carItems.length - 1);
                    this.setSlider(this.curIndx, dir, true);

                    t = setTimeout(() => {
                        this.setSlider(this.curIndx, dir, false);
                        clearTimeout(t);
                    }, 100);
                }else {
                    this.curIndx --;
                    this.setSlider(this.curIndx, dir, false);
                }
                break;
            default:
                break;
        }
    }

    setSlider (index, dir, isInitial) {
        this.$carList.css({
            transform: `translate3d(${isInitial ? (dir === 'next' ? 0 : -(this.$carItems.length - 1)* 1200) : -1200 * index}px, 0px, 0px)`,
            transitionDuration: `${isInitial ? 'initial' : '.5s'}`
        });

        this.setIdicator((index === this.$carItems.length - 1 || index === 0) ? 0 : index);
    }

    setIdicator (index) {
        this.$indicatorItems.eq(index).addClass('current').siblings('.indicator-item').removeClass('current');
    }
}