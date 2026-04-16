// Lấy nút liên hệ để gắn hành động khi người dùng bấm vào
const contactButton = document.getElementById("contactButton");

// Khi bấm nút, mở ứng dụng email mặc định của máy tính
if (contactButton) {
  contactButton.addEventListener("click", () => {
    window.location.href = "mailto:example@gmail.com";
  });
}
