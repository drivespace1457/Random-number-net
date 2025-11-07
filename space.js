function option1(elem){
    elem.style.background="#ded4d4ff";
}
function option2(elem){
    elem.style.background="#726c6cff";
}
// 亂數產生器
function rollNumber(){
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    document.getElementById("point").innerText = diceNumber;
}



const tl = gsap.timeline();
tl.fromTo(".title",{opacity:0,y:50},{
    opacity:1,
    y:0,
    duration:1.5,
    ease:"power3.out"
})
tl.to(".title",{
    opacity:1,
    duration:1.5
})
tl.to(".title",{
    opacity:0,
    duration:1
})