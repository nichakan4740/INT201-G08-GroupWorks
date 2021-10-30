import { products } from "./product.js"; //import product.js ที่เก็บเป็น Array
//ให้ productList เลือก div product-container จาก index.html
const productList = document.querySelector("#product-container");

showAllProduct(); //แสดง product ทั้งหมด
function showAllProduct() {
  //สร้าง function showAllProduct
  products.forEach((product, index) => { //ใช้ forEach เพื่อนำค่าใน products มาใช้ โดยวิธีการ loop ข้อมูล
    let productItem = document.createElement("div"); //สร้าง Element

    productItem.setAttribute("id", `ITEM${index + 1}`); //
    const productName = document.createElement("h3"); //ชื่อของ product
    const productID = document.createElement("p"); //id ของ product
    const price = document.createElement("p"); //ราคาสินค้า
    const stocks = document.createElement("p"); //stockสของินค้า
    const image = document.createElement("img"); //รูปของ product
    const buyBtn = document.createElement("img"); //ปุ่มซื้อ (ใช้รูปรถเข็น)
    const buyBtnBG = document.createElement("div"); //พื้นหลังไอคอนรถเข็น(สีฟ้า)
    const info = document.createElement("div"); //สร้างเพื่อคลุม productName, price, stocks
    const infoWrap = document.createElement("div"); //สร้างเพื่อคลุม info และ buyBtn

    productName.textContent = product.productName; //นำชื่อจาก products มาใส่ใน productName
    productID.textContent = product.productId; //นำ id จาก products มาใส่ใน productID
    price.textContent = `${product.price} ฿`; //นำ price จาก products มาใส่ใน price
    stocks.textContent = `Stocks: ${product.stocks}`; // นำค่า stocks จาก products มาใส่ใน stocks
    image.src = product.image; //นำ src ของรูปจาก products มาใส่ใน image
    buyBtn.src = "https://i.ibb.co/BzLMS8X/shopping-cart-2.png"; //เอารูปรถเข็นมาใส่ใน buyBtn

    productItem.appendChild(image); //เพิ่มรูปเข้าไปใน div ของ productItem
    info.appendChild(productName); //เพิ่ม productName เข้าไปใน div ของ info
    info.appendChild(price); // เพิ่ม price เข้าไปใน div ของ info
    info.appendChild(stocks); //เพิ่ม stocks เข้าไปใน div ของ info
    buyBtnBG.appendChild(buyBtn); //เพิ่ม buyBtn เข้าไปใน div ของ buyBtnBG
    infoWrap.appendChild(info); //เพิ่ม info เข้าไปใน div ของ infoWrap
    infoWrap.appendChild(buyBtnBG); //เพิ่ม buyBtnBG เข้าไปใน div ของ infoWrap
    productItem.appendChild(infoWrap); //เพิ่ม infoWrap เข้าไปใน div ของ productItem
    productList.appendChild(productItem); //เพิ่ม productItem เข้าไปใน div ของ productList

    //ตกแต่ง css ด้วย framework tailwind
    productItem.className =
      "rounded-lg w-full flex flex-col justify-center bg-white";
    image.className =
      "rounded-t-lg product-img object-center object-cover h-auto w-full";
    productName.className = "text-sm md:text-lg mt-2 font-bold mb-2 ml-3";
    price.className = "text-2xl md:text-3xl -mt-2 text-blue-600 ml-3";
    stocks.className = "text-xs ml-3";
    buyBtn.className = "buyBtn w-5/12 pt-5 m-auto";
    buyBtnBG.className = "buyBtnBG bg-blue-500 hover:bg-blue-700 w-2/5";
    infoWrap.className = "flex justify-between";
    info.className = "pb-2 md:pb-4";
  });
}
