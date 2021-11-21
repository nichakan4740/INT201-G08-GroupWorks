import { products } from "./products.js"; //import product.js ที่เก็บเป็น Array
//ให้ productList เลือก div product-container จาก index.html
import { showProductsCart } from "./productCart";
import CookieUtil from "./cookies";
import {
 createProductList,
 searchProduct,
 showAllProducts
} from "./productList.js";
import { enableDarkMode, disableDarkMode } from "./darkMode.js";
const cartBtn = document.querySelector("#cartBtn"); //เชื่อมหน้า html ปุ่มตะกร้าสินค้า
const cartMenu = document.querySelector("#cartMenu"); //เชื่อมหน้า html ปุ่มเมนู
const themeToggle = document.querySelector("#theme-toggle"); //สร้าง const เพื่อเก็บ themeToggle เป็นการเชื่อมไปที่ปุ่ม mode
 
createProductList(); //เรียกใช้งานจากหน้า productList.js ที่ได้ทำการสร้างไว้
const search = document.querySelector("#searchBtn"); //เชื่อมไปยัง node ที่มีไอดี searchBtn
search.addEventListener("click", (e) => {
 //หากปุ่มถูก click จะทำอะไรบ้างตามที่กำหนด
 //เพิ่ม event click เพื่อจะแสดง searchBar
 e.preventDefault(); //เพื่อลบฟังก์ชั่นดั่งเดิมของการคลิกปุ่ม search
 const searchBar = document.querySelector("#searchBar"); //เชื่อมไปยัง node ที่มีไอดี searchBar
 //ถ้า searchBar มี class ชื่อ hidden ให้ลบ hidden ออก ถ้าไม่มีให้เพิ่ม
 if (searchBar.classList.contains("hidden")) {
   //hidden คือซ่อน search Bar
   searchBar.classList.remove("hidden");
 } else {
   searchBar.classList.add("hidden");
   //ถ้าไม่มีค่าอะไรเลยใน searchBar จะแสดง product ทุกตัว ถ้ามี จะนำค่าใน searchBar มาแสดง
   if (searchBar.value === null || searchBar.value === "") {
     //เช็คข้อมูลในช่องsearch ถ้าในช่อง= nullหรือเป็นค่าว่าง จะทำตามเงือนไข
     showAllProducts();
   } else {
     searchProduct(searchBar.value); //ใช้ function searchProduct เพื่อแสดง product ที่รับค่ามา (ไว้ให้ User search)
   }
 }
});
 
//เพิ่ม function getProductById เป็นการส่งออก productID
export function getProductById(productId) {
 for (let product of products) {
   //หาสินค้าจาก id
   if (product.productId === productId) {
     return product;
   }
 }
}
cartBtn.addEventListener("click", () => {
 //เชื่อมไปยัง node ที่มี class cartBtn
 if (cartMenu.classList.contains("hidden")) {
   //เช็ค class cartMenu ว่ามี hidden หรือไม่
   showProductsCart(); //ทำการเเสดงสินค้าท้ังหมดในตะกร้า
   cartMenu.classList.remove("hidden"); //ลบ hidden ออกเพื่อเลิกซ่อน
 } else {
   cartMenu.classList.add("hidden"); //ถ้าไม่ตรงกับเงื่อนไขจะเพิ่ม hidden เพื่อเพิ่มการซ้อน
 }
});
// ทำการ checkCookie
checkCookie();
function checkCookie() {
 let username = CookieUtil.get("username");
 if (username != null && username !== "" && username !== "null") {
 } else {
   // let login = prompt("Please enter your name", "");
   let login = "name";
   CookieUtil.set("username", login, 30);
 }
}
themeToggle.addEventListener("click", () => {
 //สร้าง function ให้ปุ่ม
 let darkMode = localStorage.getItem("darkMode"); //เมื่อกดปุ่มจะดึงข้อมูลมาจาก local storage
 if (darkMode !== "enabled") {
   enableDarkMode(); //ถ้า darkmode เปิดอยู่ จะเรียก enabled เพื่อให้เปิดอยู่ต่อ
 } else {
   disableDarkMode(); //ปิดโหมด dark mode
 }
});
