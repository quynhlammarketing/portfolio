// Lấy nút liên hệ để mở email nhanh từ trang portfolio
const contactButton = document.getElementById("contactButton");

// Lấy nút đổi giao diện sáng/tối
const themeToggle = document.getElementById("themeToggle");

// Lấy phần bản quyền trong footer để cập nhật năm hiện tại
const copyrightText = document.getElementById("copyrightText");

// Lấy các khối cần hiện ra nhẹ khi cuộn trang
const revealItems = document.querySelectorAll(".hero, .section, .footer");

// Lấy các link trong menu để highlight theo section đang xem
const navLinks = document.querySelectorAll(".nav-links a");
const trackedSections = document.querySelectorAll("#home, #about, #projects, #contact");

// Tên khóa dùng để lưu lựa chọn giao diện vào trình duyệt
const themeStorageKey = "portfolio-theme";

// Cập nhật chữ trên nút theo chế độ hiện tại
function updateThemeButton() {
  if (!themeToggle) {
    return;
  }

  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
}

// Áp dụng giao diện và ghi nhớ lựa chọn
function setTheme(theme) {
  const isDarkMode = theme === "dark";
  document.body.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem(themeStorageKey, isDarkMode ? "dark" : "light");
  updateThemeButton();
}

// Đọc giao diện đã lưu trước đó khi tải trang
const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}
updateThemeButton();

// Khi bấm nút, mở ứng dụng email mặc định của máy tính
if (contactButton) {
  contactButton.addEventListener("click", () => {
    window.location.href = "mailto:hpdquynh.work@gmail.com";
  });
}

// Khi bấm nút Dark Mode, đổi giao diện giữa sáng và tối
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    setTheme(nextTheme);
  });
}

// Tự động cập nhật năm hiện tại trong footer
if (copyrightText) {
  const currentYear = new Date().getFullYear();
  copyrightText.textContent = "© " + currentYear + " Hồ Phạm Diễm Quỳnh. All rights reserved.";
}

// Gắn class mặc định và tạo độ trễ nhẹ để các khối hiện lần lượt
revealItems.forEach((item, index) => {
  item.classList.add("reveal-on-scroll");
  item.style.transitionDelay = Math.min(index * 0.08, 0.24) + "s";
});

// Dùng IntersectionObserver để hiện dần các section khi cuộn tới
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

// Cập nhật link active trong menu theo section hiện tại
function setActiveNavLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + sectionId;
    link.classList.toggle("active", isActive);
  });
}

// Theo dõi section nào đang ở vùng nhìn chính của người dùng
const navObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (visibleEntry) {
      setActiveNavLink(visibleEntry.target.id);
    }
  },
  {
    threshold: [0.25, 0.5, 0.7],
    rootMargin: "-20% 0px -55% 0px"
  }
);

trackedSections.forEach((section) => {
  navObserver.observe(section);
});
