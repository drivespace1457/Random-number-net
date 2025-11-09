//動畫區

const tl = gsap.timeline();
tl.fromTo(".bg",{opacity:0},{
    opacity: 1,
    duration: 1
})
tl.to(".bline1",{
    scaleY:1,
    opacity:1,
    duration: 1.5,
    ease:"power3.out"
})
tl.to(".bline1",{
    left:0,
    duration: 1.5,
    ease:"power3.out"
})
tl.to("#home",{
    opacity:0.7,
    duration:0.3,
})
tl.to("#intro",{
    opacity:0.7,
    duration:0.3,
},"-=0.2")
tl.to("#paint",{
    opacity:0.7,
    duration:0.3,
},"-=0.2")
tl.to("#none",{
    opacity:0.7,
    duration:0.3,
},"-=0.2")
tl.to("#link",{
    opacity:0.7,
    duration:0.3,
},"-=0.2")
tl.to(".homeTitle",{
    y:-40,
    opacity:1,
    duration:0.6,
    ease:"power3.out"
})
tl.to(".homePhoto",{
    y:-40,
    opacity:1,
    duration:0.6,
    ease:"power3.out"
},"-=0.5")
tl.to(".homeText",{
    y:-40,
    opacity:1,
    duration:0.6,
    ease:"power3.out"
},"-=0.5")

function textColor1(el){
    el.style.opacity = 1;
}
function textColor2(el){
    el.style.opacity = 0.7;
}

//動作區
const bars = document.querySelectorAll(".bar");
const pages = document.querySelectorAll(".page");

bars.forEach(bar => {
    bar.addEventListener("click", (e) => {
        e.preventDefault();

        // 移除所有 Up class
        bars.forEach(b => b.classList.remove("Up"));
        pages.forEach(p => p.classList.remove("Up"));

        // 點擊的加上 Up class
        bar.classList.add("Up");

        // 顯示對應 page
        const targetId = bar.dataset.target;
        document.getElementById(targetId).classList.add("Up");

        // 回到頁面頂部
        window.scrollTo(0,0);

        if (targetId === 'homeC'){
            gsap.fromTo("#homeC",{opacity:0,y:0},{
            y:-40,
            opacity:1,
            duration:1,
            ease:"power3.out"
        });
        }
    });
});

