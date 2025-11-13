let activeIndex = null; // 記錄被點擊的方框

// 選取方框與 clipPath、圖片、文字
const rects = [
    {el: document.querySelector('rect.b1'), clip: document.querySelector('#clip1 rect'), dir:'right', initX:'1vw', initW:'78vw', textClass:'b1-text', img: document.querySelector('.backR1')},
    {el: document.querySelector('rect.b2'), clip: document.querySelector('#clip2 rect'), dir:'left', initX:'21vw', initW:'78vw', textClass:'b2-text', img: document.querySelector('.backR2')},
    {el: document.querySelector('rect.b3'), clip: document.querySelector('#clip3 rect'), dir:'right', initX:'1vw', initW:'78vw', textClass:'b3-text', img: document.querySelector('.backR3')},
    {el: document.querySelector('rect.b4'), clip: document.querySelector('#clip4 rect'), dir:'left', initX:'21vw', initW:'78vw', textClass:'b4-text', img: document.querySelector('.backR4')}
];

// === 共用返回按鈕 ===
const backButtons = document.querySelectorAll('.info .infoBack, .art .infoBack, .link .infoBack, .other .infoBack');
backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        activeIndex = null; // 清掉記錄

        rects.forEach((item) => {
            const {el, clip, img, textClass, dir, initX, initW} = item;
            const textEl = document.querySelector(`.${textClass}`);

            // 恢復方框大小和模糊
            gsap.to(el, {
                duration: 1,
                attr: dir==='right' ? {width:initW} : {width:initW, x:initX},
                filter: "blur(1px)",
                opacity:0.5
            });
            gsap.to(clip, {
                duration:1,
                attr: dir==='right' ? {width:initW} : {width:initW, x:initX},
                opacity:1
            });

            // 恢復圖片和文字透明度
            if(img) gsap.to(img, {duration:0.5, opacity:0.4});
            if(textEl) gsap.to(textEl, {duration:0.5, opacity:0});
        });

        // 淡出 info、art 覆蓋層
        gsap.to(['.info', '.art' , '.link' , '.other'], {
            duration:0.5,
            opacity:0,
            zIndex:0
        });
    });
});

// === 方框 hover / click ===
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
        if(textEl) gsap.to(textEl, {duration:0.5, opacity:0.8});
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

        activeIndex = index; // 記錄被點擊的方框

        // 顯示對應覆蓋層
        if (index === 0) {
            const info = document.querySelector('.info');
            info.style.zIndex = 99;
            gsap.to(info, {
                duration: 0.5,
                opacity: 0.9,
                ease: "power2.out"
            });
        }
        if (index === 1) {
            const art = document.querySelector('.art');
            art.style.zIndex = 99;
            gsap.to(art, {
                duration: 0.5,
                opacity: 0.9,
                ease: "power2.out"
            });
        }

        if (index === 2) {
            const link = document.querySelector('.link');
            link.style.zIndex = 99;
            gsap.to(link, {
                duration: 0.5,
                opacity: 0.9,
                ease: "power2.out"
            });
        }

        if (index === 3) {
            const other = document.querySelector('.other');
            other.style.zIndex = 99;
            gsap.to(other, {
                duration: 0.5,
                opacity: 0.9,
                ease: "power2.out"
            });
        }

        // 被點擊方框拉長固定
        gsap.to(el, {
            duration: 0,
            attr: dir==='right' ? {width:"98vw"} : {width:"98vw", x:"1vw"},
            ease: "power4.out",
            filter: "blur(0px)"
        });
        gsap.to(clip, {
            duration: 0,
            attr: dir==='right' ? {width:"98vw"} : {width:"98vw", x:"1vw"},
            ease: "power4.out"
        });
        if(textEl) gsap.to(textEl, {duration:0, opacity:1});
        if(img) gsap.to(img, {duration:0, opacity:1});

        // 其他方框淡出
        rects.forEach((other, i) => {
            if(i !== index){
                const otherText = document.querySelector(`.${other.textClass}`);
                gsap.to([other.el, other.clip, other.img, otherText], {duration:0.5, opacity:0});
            }
        });
    });
});
