//สร้างฟังก์ชั่นเพื่อเปิด DarkMode
export function enableDarkMode() {
  buyBtnBGDark();
  cartBtnDark();
  cartHeaderDark();
  document.body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled"); // set item darkMode เป็นค่า darkmode
}

//สร้างฟังก์ชั่นเพื่อปิด DarkMode
export function disableDarkMode() {
  buyBtnBGNormal();
  cartBtnNormal();
  cartHeaderNormal();
  document.body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", null);
}

updateDarkMode();

//สร้างฟังก์ชั่นเพื่อมา update ส่วนต่างๆให้เป็น dark mode เมื่อปรับเป็น dark mode เมื่อทำการเปิดbrowser
export function updateDarkMode() {
  let darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

//เพิ่มฟังก์ชั่น cartBtnNormal เพื่อจะเปลี่ยนเป็นธีม dark
function cartBtnNormal() {
  let cartBtn = document.querySelector(".cartBtnDark");
  if (cartBtn !== null) {
    cartBtn.classList.remove("cartBtnDark");
  }
}

//เพิ่มฟังก์ชั่น cartBtnDark เพื่อจะเปลี่ยนปุ่มcartเป็นธีม dark
function cartBtnDark() {
  let cartBtn = document.querySelector(".cartBtn"); //เเก้
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
