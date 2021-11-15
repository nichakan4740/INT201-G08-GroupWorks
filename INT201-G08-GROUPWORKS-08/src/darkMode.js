let darkMode = localStorage.getItem("darkMode"); // สร้าง let เพื่อเก็บ darkmode
const themeToggle = document.querySelector("#theme-toggle"); //สร้าง const เพื่อเก็บ themeToggle

// ทำการใช้ export เพื่อส่งออก enableDarkMode และทำการปรับเป็น dark-mode
export const enableDarkMode = () => {
  buyBtnBGDark();
  cartBtnDark();
  cartHeaderDark();
  document.body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled");
};

export const disableDarkMode = () => {
  buyBtnBGNormal();
  cartBtnNormal();
  cartHeaderNormal();
  document.body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", null);
};

themeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
    console.log(darkMode);
  } else {
    disableDarkMode();
    console.log(darkMode);
  }
});

if (darkMode === "enabled") {
  enableDarkMode();
}

//เพิ่มฟังก์ชั่น cartBtnNormal เพื่อจะเปลี่ยนเป็นธีม dark
function cartBtnNormal() {
  let cartBtn = document.querySelector(".cartBtnDark");
  if (cartBtn !== null) {
    cartBtn.classList.remove("cartBtnDark");
  }
}

//เพิ่มฟังก์ชั่น cartBtnDark เพื่อจะเปลี่ยนเป็นธีม dark
function cartBtnDark() {
  let cartBtn = document.querySelector(".cartBtn");
  if (cartBtn !== null) {
    cartBtn.classList.add("cartBtnDark");
  }
}

//เพิ่มฟังก์ชั่น buyBtnBGNormal เพื่อจะเปลี่ยนเป็นธีม dark
function buyBtnBGNormal() {
  let NormalBtnBG = document.querySelectorAll(".buyBtnBGdark");
  NormalBtnBG.forEach((btn) => {
    btn.classList.remove("buyBtnBGdark");
  });
}

//เพิ่มฟังก์ชั่น buyBtnBGDark เพื่อจะเปลี่ยนเป็นธีม dark
function buyBtnBGDark() {
  let DarkBtnBG = document.querySelectorAll(".buyBtnBG");
  DarkBtnBG.forEach((btn) => {
    btn.classList.add("buyBtnBGdark");
  });
}

//เพิ่มฟังก์ชั่น cartHeaderNormal เพื่อจะเปลี่ยนเป็นธีม dark
function cartHeaderNormal() {
  let cartHeaderNormal = document.querySelector(".cartHeaderDark");
  if (cartHeaderNormal !== null) {
    cartHeaderNormal.classList.remove("cartHeaderDark");
  }
}

//เพิ่มฟังก์ชั่น cartHeaderDark เพื่อจะเปลี่ยนเป็นธีม dark
function cartHeaderDark() {
  let cartHeaderDark = document.querySelector(".cartHeader");
  if (cartHeaderDark !== null) {
    cartHeaderDark.classList.add("cartHeaderDark");
  }
}
