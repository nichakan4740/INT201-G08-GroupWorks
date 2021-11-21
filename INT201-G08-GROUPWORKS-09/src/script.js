import { products } from "./products.js"; //import product.js ที่เก็บเป็น Array
//ให้ productList เลือก div product-container จาก index.html
import { addProduct, showProductsCart, closeProductCart } from "./productCart";
import CookieUtil from "./cookies";
import { enableDarkMode, disableDarkMode } from "./darkMode.js";

const productList = document.querySelector("#product-container");
const cartBtn = document.querySelector(".cartBtn");
const cartMenu = document.querySelector(".cartMenu");

showProducts(products); //แสดง product ทั้งหมด
function showProducts(products) {
  //สร้าง function showAllProduct
  products.forEach((product, index) => {
    //ใช้ forEach เพื่อนำค่าใน products มาใช้ โดยวิธีการ loop ข้อมูล
    const productItem = document.createElement("div"); //สร้าง Element

    productItem.setAttribute("id", `ITEM${index + 1}`); //set id
    const productName = document.createElement("h3"); //ชื่อของ product
    const productID = document.createElement("p"); //id ของ product
    const price = document.createElement("p"); //ราคาสินค้า
    const stocks = document.createElement("p"); //stock ของสินค้า
    const image = document.createElement("img"); //รูปของ product
    const buyBtn = document.createElement("img"); //ปุ่มซื้อ (ใช้รูปรถเข็น)
    const buyBtnBG = document.createElement("div"); //พื้นหลังไอคอนรถเข็น(สีฟ้า)
    const info = document.createElement("div"); //สร้างเพื่อคลุม productName, price, stocks
    const infoWrap = document.createElement("div"); //สร้างเพื่อคลุม info และ buyBtn

    productName.textContent = product.productName; //นำชื่อจาก products มาใส่ใน productName
    productID.textContent = product.productId; //นำ id จาก products มาใส่ใน productID
    price.textContent = `${product.price} ฿`; //นำ price จาก products มาใส่ใน price
    stocks.textContent = `Stocks: ${product.stocks}`; // นำค่า stocks จาก products มาใส่ใน stocks
    image.src = product.image; //นำ src(link) ของรูปจาก products มาใส่ใน image
    buyBtn.src = "../img/cart.png"; //เอารูปรถเข็นมาใส่ใน buyBtn

    productItem.appendChild(image); //เพิ่มรูปเข้าไปใน div ของ productItem
    info.appendChild(productName); //เพิ่ม productName เข้าไปใน div ของ info
    info.appendChild(price); //เพิ่ม price เข้าไปใน div ของ info
    info.appendChild(stocks); //เพิ่ม stocks เข้าไปใน div ของ info
    buyBtnBG.appendChild(buyBtn); //เพิ่ม buyBtn เข้าไปใน div ของ buyBtnBG
    infoWrap.appendChild(info); //เพิ่ม info เข้าไปใน div ของ infoWrap
    infoWrap.appendChild(buyBtnBG); //เพิ่ม buyBtnBG เข้าไปใน div ของ infoWrap
    productItem.appendChild(infoWrap); //เพิ่ม infoWrap เข้าไปใน div ของ productItem
    productList.appendChild(productItem); //เพิ่ม productItem เข้าไปใน div ของ productList
    //ซึ่งตรงกับไอดี product-container ที่เราดึงมา

    //ตกแต่ง css ด้วย framework tailwind
    productItem.className =
      "productItem rounded-lg w-full flex flex-col justify-center bg-white";
    image.className =
      "rounded-t-lg product-img object-center object-cover h-auto w-full";
    productName.className =
      "truncate text-gray-700 text-sm md:text-lg mt-2 font-bold mb-2 ml-3";
    price.className = "text-md sm:text-3xl -mt-2 text-blue-600 ml-3";
    stocks.className = "text-gray-700 text-xs ml-3";
    buyBtn.className = "buyBtn w-5/12 pt-5 m-auto";
    buyBtnBG.className =
      "buyBtnBG rounded-br-lg bg-blue-500 hover:bg-blue-700 w-2/5";
    infoWrap.className = "flex justify-between";
    info.className = "pb-2 md:pb-4 w-36";

    let darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

    // event เพิ่มสินค้าลงตะกร้า
    buyBtnBG.addEventListener("click", () => {
      //เพิ่ม event ให้กับปุ่มเพื่อเป็นการส่งข้อมูลเพื่อเก็บข้อมูลไว้ใน cart
      if (product.stocks > 0) {
        addProduct(product); //เรียกใช้ function addProduct ทำการ add สินค้าลง cart
        product.stocks -= 1;
        stocks.textContent = `Stocks: ${product.stocks}`; //ทำการเเก้ไขจำนวนstockเมื่อทำการคลิกevent
      }
    });
  });
}

const search = document.querySelector("#searchBtn"); //เชื่อมไปยัง node ที่มีไอดี searchBtn
search.addEventListener("click", (e) => {
  //เพิ่ม event click เพื่อจะแสดง searchBar
  e.preventDefault(); //เพื่อลบฟังก์ชั่นดั่งเดิมของการคลิกปุ่ม search

  const searchBar = document.querySelector("#searchBar"); //เชื่อมไปยัง node ที่มีไอดี searchBar

  //ถ้า searchBar มี class ชื่อ hidden ให้ลบ hidden ออก ถ้าไม่มีให้เพิ่ม
  if (searchBar.classList.contains("hidden")) {
    //hidden คือซ่อนsearch Bar
    searchBar.classList.remove("hidden");
  } else {
    searchBar.classList.add("hidden");
    //ถ้าไม่มีค่าอะไรเลยใน searchBar จะแสดง product ทุกตัว ถ้ามี จะนำค่าใน searchBar มาแสดง
    if (searchBar.value === null || searchBar.value === "") {
      //เช็คข้อมูลในช่องsearch ถ้าในช่อง= nullหรือเป็นค่าว่าง จะทำตามเงือนไข
      removeAllProducts(); //ลบ product ทั้งหมดก่อน
      showProducts(products); //แสดง product ทั้งหมดอีกครั้ง
    } else {
      removeAllProducts(); //ถ้าช่อง search มีค่าก็จะเข้าเงื่อนไขนี้เพื่อ ลบ product ทั้งหมดก่อน
      searchProduct(searchBar.value); //ใช้ function searchProduct เพื่อแสดง product ที่รับค่ามา (ไว้ให้ User search)
    }
  }
});

//เพิ่ม function searchProduct เพื่อทำการหาสินค้า
function searchProduct(searchName) {
  //รับคำจากการ search เข้ามา
  const filteredProduct = products.filter(
    // filteredProduct จะเป็น Arrayตาม productที่ถูกค้นหา
    (
      product //filter ชื่อสินค้าที่ตรงกับการค้นหามาเก็บเป็น Array ในตัวเเปล product
    ) => product.productName.toLowerCase().includes(searchName.toLowerCase()) // เอาเฉพาะ product ที่ชื่อตรงกับที่
    //User search โดยได้เปลี่ยนเป็นตัวพิมพ์เล็กในเริ่มแรก
  );
  showProducts(filteredProduct); //แสดง products ที่ตรงกับเงื่อนไขที่เราทำการ filteredProduct มาแล้ว
  let darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

// ทำการลบ product ทั้งหมดที่อยู่ในหน้า index.html
function removeAllProducts() {
  const elements = document.getElementsByClassName("productItem"); //เชื่อมไปยัง node ที่มี
  //class productItem ดึงทุกnode ที่ชื่อ productItem
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]); //ใช้ while ในการลบ product ทีละตัวจนกว่าจะหมด
  }
}

//เพิ่ม function getProductById เป็นการส่งออก productID
export function getProductById(productId) {
  for (let product of products) {
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
    cartMenu.classList.remove("hidden"); //
  } else {
    closeProductCart();
    cartMenu.classList.add("hidden");
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
    CookieUtil.set("username", login, 30); //new Date('2022-11-12')
  }
}
