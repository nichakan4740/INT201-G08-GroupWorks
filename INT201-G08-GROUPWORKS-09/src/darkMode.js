let darkMode = localStorage.getItem("darkMode"); // สร้าง let เพื่อเก็บ darkmode ซึ่งใช้ local storage
export function enableDarkMode() { //เปลี่ยนให้เป็น dark mode
 buyBtnBGDark();
 cartBtnDark();
 cartHeaderDark();
 document.body.classList.add("dark-mode");//เพื่อชื่อ class ใน body ตรงพื้นหลังให้เป็น dark
 localStorage.setItem("darkMode", "enabled"); // set ค่า darkmode
}
 
export function disableDarkMode() { //ยกเลิก dark mode
 buyBtnBGNormal();
 cartBtnNormal();
 cartHeaderNormal();
 document.body.classList.remove("dark-mode");//ลบ darkmode ออกหาก user กดอีกครั้ง
 localStorage.setItem("darkMode", null);
}
 
//ทุกครั้งที่ refresh หน้าหรือออก website เข้าใหม่จะปรับเป็น darkMode(หากเปิดไว้)
if (darkMode === "enabled") {
 enableDarkMode();
}
 
//สร้างฟังก์ชั่นเพื่อมา update ส่วนต่างๆให้เป็น dark mode เมื่อปรับเป็น dark mode
export function updateDarkMode() {
 let darkMode = localStorage.getItem("darkMode");
 if (darkMode === "enabled") {
   enableDarkMode();
 } else {
   disableDarkMode();
 }
}
 
//เพิ่มฟังก์ชั่น cartBtnNormal เพื่อจะเปลี่ยนปุ่มcart กลับเป็นธีมเดิม (สีฟ้า)
function cartBtnNormal() {
 let cartBtn = document.querySelector(".cartBtnDark");
 if (cartBtn !== null) {
   cartBtn.classList.remove("cartBtnDark");
 }
}
 
//เพิ่มฟังก์ชั่น cartBtnDark เพื่อจะเปลี่ยนปุ่ม cart เป็นธีม dark
function cartBtnDark() {
 let cartBtn = document.querySelector(".cartBtn"); 
 if (cartBtn !== null) {
   cartBtn.classList.add("cartBtnDark");
 }
}
 
//เพิ่มฟังก์ชั่น buyBtnBGNormal เพื่อจะเปลี่ยนปุ่มซื้อสินค้าทุกอันกลับไปธีมเดิม (สีฟ้า)
function buyBtnBGNormal() {
 let NormalBtnBG = document.querySelectorAll(".buyBtnBGdark");
 NormalBtnBG.forEach((btn) => {
   btn.classList.remove("buyBtnBGdark");
 });
}
 
//เพิ่มฟังก์ชั่น buyBtnBGDark เพื่อจะเปลี่ยนปุ่มซื้อสินค้าทุกอันเป็นธีม dark
function buyBtnBGDark() {
 let DarkBtnBG = document.querySelectorAll(".buyBtnBG");//เลือกทุกปุ่มให้เปลี่ยนเป็น dark
 DarkBtnBG.forEach((btn) => {
   btn.classList.add("buyBtnBGdark"); //เพิ่ม class ให้แต่ละปุ่ม
 });
}
 
//เพิ่มฟังก์ชั่น cartHeaderNormal เพื่อจะเปลี่ยนcartHeaderกลับเป็นธีมเดิม (สีฟ้า)
function cartHeaderNormal() {
 let cartHeaderNormal = document.querySelector(".cartHeaderDark");
 if (cartHeaderNormal !== null) {
   cartHeaderNormal.classList.remove("cartHeaderDark");
 }
}
 
//เพิ่มฟังก์ชั่น cartHeaderDark เพื่อจะเปลี่ยนcartHeaderเป็นธีม dark
function cartHeaderDark() {
 let cartHeaderDark = document.querySelector(".cartHeader");
 if (cartHeaderDark !== null) {
   cartHeaderDark.classList.add("cartHeaderDark");
 }
}
 
