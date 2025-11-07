// 導覽列切換
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".content");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // 阻止 href="#" 預設跳轉

    // 切換 active 狀態
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const targetId = link.dataset.target;

    sections.forEach(sec => {
      if(sec.id === targetId){
        sec.classList.add("active");

        // 新內容淡入 + 往上滑動
        gsap.fromTo(sec, 
          {opacity: 0, y: 50}, 
          {opacity: 1, y: 0, duration: 1, ease: "power3.out"}
        );

        // 如果是首頁，加上圖片 & 說明框動畫
        if(sec.id === "home"){
          gsap.fromTo(sec.querySelector(".fade-img"), 
            {opacity: 0, y: 30}, 
            {opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out"}
          );
          gsap.fromTo(sec.querySelector(".info-box"), 
            {opacity: 0, y: 30}, 
            {opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out"}
          );
        }

      } else {
        sec.classList.remove("active");
      }
    });
  });
});

// 頁面載入時首頁淡入動畫
window.addEventListener("load", () => {
  const homeSection = document.querySelector("#home");
  gsap.fromTo(homeSection, {opacity: 0, y:50}, {opacity:1, y:0, duration:1, ease:"power3.out"});
  gsap.fromTo(homeSection.querySelector(".fade-img"), {opacity:0, y:30}, {opacity:1, y:0, duration:1, delay:0.3, ease:"power3.out"});
  gsap.fromTo(homeSection.querySelector(".info-box"), {opacity:0, y:30}, {opacity:1, y:0, duration:1, delay:0.6, ease:"power3.out"});
});

window.scrollTo({
  top: 0,
  behavior: "smooth" // 平滑捲動
});
