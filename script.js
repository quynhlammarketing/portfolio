// Láº¥y nÃºt liÃªn há»‡ Ä‘á»ƒ gáº¯n hÃ nh Ä‘á»™ng khi ngÆ°á»i dÃ¹ng báº¥m vÃ o
const contactButton = document.getElementById("contactButton");

// Khi báº¥m nÃºt, má»Ÿ á»©ng dá»¥ng email máº·c Ä‘á»‹nh cá»§a mÃ¡y tÃ­nh
if (contactButton) {
  contactButton.addEventListener("click", () => {
    window.location.href = "mailto:hpdquynh.work@gmail.com";
  });
}
