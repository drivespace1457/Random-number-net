let activeIndex = null; // 記錄被點擊的方框

// 選取方框與 clipPath、圖片、文字
const rects = [
    {el: document.querySelector('rect.b1'), clip: document.querySelector('#clip1 rect'), dir:'right', initX:'1vw', initW:'78vw', textClass:'b1-text', img: document.querySelector('.backR1')},
    {el: document.querySelector('rect.b2'), clip: document.querySelector('#clip2 rect'), dir:'left', initX:'21vw', initW:'78vw', textClass:'b2-text', img: document.querySelector('.backR2')},
    {el: document.querySelector('rect.b3'), clip: document.querySelector('#clip3 rect'), dir:'right', initX:'1vw', initW:'78vw', textClass:'b3-text', img: document.querySelector('.backR3')},
    {el: document.querySelector('rect.b4'), clip: document.querySelector('#clip4 rect'), dir:'left', initX:'21vw', initW:'78vw', textClass:'b4-text', img: document.querySelector('.backR4')}
];

rects.forEach((item, index) => {
    const {el, img, clip, dir, initX, initW, textClass} = item;
    const textEl = document.querySelector(`.${textClass}`);

    // Hover 動畫
    el.addEventListener('mouseenter', () => {
        if(activeIndex !== null && activeIndex !== index) return; // 已點擊其他方框，不 hover
        gsap.to(el, {
            duration: 1,
            attr: dir==='right' ? {width:"98vw"} : {width:"98vw", x:"1vw"},
            ease: "power4.out",
            filter: "blur(0px)"
        });
        gsap.to(clip, {
            duration: 1,
            attr: dir==='right' ? {width:"98vw"} : {width:"98vw", x:"1vw"},
            ease: "power4.out"
        });
        if(textEl) gsap.to(textEl, {duration:0.5, opacity:1});
        if(img) gsap.to(img, {duration:0.5, opacity:1});
    });

    el.addEventListener('mouseleave', () => {
        if(activeIndex !== null && activeIndex !== index) return; // 已點擊其他方框，不縮回
        if(activeIndex === index) return; // 被點擊方框保持拉長
        gsap.to(el, {
            duration: 1,
            attr: dir==='right' ? {width:initW} : {width:initW, x:initX},
            ease: "power4.out",
            filter: "blur(1px)"
        });
        gsap.to(clip, {
            duration: 1,
            attr: dir==='right' ? {width:initW} : {width:initW, x:initX},
            ease: "power4.out"
        });
        if(textEl) gsap.to(textEl, {duration:0.5, opacity:0});
        if(img) gsap.to(img, {duration:0.5, opacity:0.7});
    });

    // Click 動畫
    el.addEventListener('click', () => {
        // 如果已點擊其他方框且不是自己，直接 return
        if(activeIndex !== null && activeIndex !== index) return;

        if(activeIndex === index){
            // 再次點擊同一方框 → 重置所有
            activeIndex = null;
            rects.forEach((other) => {
                const otherText = document.querySelector(`.${other.textClass}`);

                // 恢復大小
                gsap.to(other.el, {
                    duration: 1,
                    attr: other.dir==='right' ? {width:other.initW} : {width:other.initW, x:other.initX},
                    ease: "power4.out",
                    filter: "blur(1px)"
                });
                gsap.to(other.clip, {
                    duration:1,
                    attr: other.dir==='right' ? {width:other.initW} : {width:other.initW, x:other.initX},
                    ease:"power4.out"
                });

                // 恢復透明度（手動指定）
                if(other.img) gsap.to(other.img, {duration:0.5, opacity:0.7});
                if(otherText) gsap.to(otherText, {duration:0.5, opacity:0});

                // 方框本身恢復可見
                gsap.to(other.el, {duration:0.5, opacity:0.5});
                gsap.to(other.clip, {duration:0.5, opacity:1});
            });
            return;
        }

        activeIndex = index; // 記錄被點擊的方框

        // 被點擊方框拉長固定
        gsap.to(el, {
            duration: 1,
            attr: dir==='right' ? {width:"98vw"} : {width:"98vw", x:"1vw"},
            ease: "power4.out",
            filter: "blur(0px)"
        });
        gsap.to(clip, {
            duration: 1,
            attr: dir==='right' ? {width:"98vw"} : {width:"98vw", x:"1vw"},
            ease: "power4.out"
        });
        if(textEl) gsap.to(textEl, {duration:0.5, opacity:1});
        if(img) gsap.to(img, {duration:0.5, opacity:1});

        // 其他方框消失
        rects.forEach((other, i) => {
            if(i !== index){
                const otherText = document.querySelector(`.${other.textClass}`);
                gsap.to([other.el, other.clip, other.img, otherText], {duration:0.5, opacity:0});
            }
        });
    });
});
