import CookieUtil from "./cookies.js";
import { getProductById } from "./main.js";
import { updateDarkMode } from "./darkMode.js";

//สร้าง ทุกอย่างในหน้า  productsCart เก็บไว้เลยตั้งเเต่เปิดbrowserครั้งเดียว
let productsCart = []; //ตะกร้าเก็บสินค้าเป็น Array
const cartMenu = document.querySelector("#cartMenu");
const cartHeader = document.createElement("p");
const cartList = document.createElement("div");
const cartFooter = document.createElement("div");
const totalPriceLabel = document.createElement("p");
const deleteAllItems = document.createElement("img"); //สร้างปุ่มลบสินค้าทุกตัว

createCart();
function createCart() {
  //สร้างตะกร้า และ set ค่าเบื้องต้นต่าง ๆ
  cartHeader.textContent = "SHOPPING CART";
  cartHeader.className =
    "cartHeader py-3 text-md font-bold tracking-widest text-center rounded-t-lg mx-auto w-9/12 sm:w-4/6 lg:w-1/3 max-w-2xl";
  cartList.className =
    "cartList overflow-y-scroll flex flex-col p-6 bg-white border-b border-gray-200 mx-auto w-9/12 sm:w-4/6 lg:w-1/3 max-w-2xl";
  cartFooter.className =
    "cartList flex flex-col p-6 bg-white border-b border-gray-200 rounded-b-lg mx-auto w-9/12 sm:w-4/6 lg:w-1/3 max-w-2xl";

  totalPriceLabel.textContent = `Total price: 0 ฿`; // set ราคาเริ่มต้น
  totalPriceLabel.className = "text-gray-700 text-right mt-4"; //ตกแต่ง totalPrice
  //เพิ่ม ตัวลบสิ้นค้าทั้งหมด

  deleteAllItems.src = " ../img/delete.png"; //เอารูปถังขยะมาใส่ เพื่อลบสินค้าทั้งหมด;
  deleteAllItems.className = "deleteItemall rounded-lg w-2/12 pt-5 m-auto";

  //เพิ่ม event ให้กับปุ่ม deleteAllItems เพื่อทำการลบสิ้นค้าทั้งหมด
  deleteAllItems.addEventListener("click", (e) => {
    e.preventDefault(); //ป้องกัน function ดั้งเดิมของปุ่ม
    removeAllCartItem();
  });

  cartMenu.appendChild(cartHeader);
  cartMenu.appendChild(cartList);
  cartMenu.appendChild(cartFooter);
  cartFooter.appendChild(totalPriceLabel);
  cartFooter.appendChild(deleteAllItems);
}

export function addProduct(product) {
  updateCartCount(1);
  if (productsCart.length > 0) {
    for (let cart of productsCart) {
      //เช็คว่าสินค้าที่ทำการเพิ่มใหม่เคยมีในตะกร้าไหม
      if (cart.productInfo.productId === product.productId) {
        //วน loop เพื่อเช็คว่ามีค่าซ้ำหรือไม่ ถ้าซ้ำก็เพิ่มลงใน amount
        cart.amount = cart.amount + 1;
        setProductCookie();
        return;
      }
    }
  }

  productsCart.push({ productInfo: product, amount: 1 }); //ถ้าทำการ loop ทั้งหมดแล้วแล้วไม่มีตัวซ้ำก็จะเข้า push เพื่อเพิ่มสินค้าใหม่
  setProductCookie();
}

function addProductAmount(product, amount) {
  productsCart.push({ productInfo: product, amount: amount });
}

export function showProductsCart(products) {
  const cartContainer = document.createElement("div");
  //เเสดงสินค้าทั้งหมดในตะกร้า

  let totalPriceAmount = 0; //ราคารวมสินค้าทั้งหมด โดยมาจาก ราคาสินค้าแต่ละชิ้น * จำนวนที่เลือก

  updateDarkMode();

  productsCart.forEach((product, index) => {
    //ใช้ forEach เพื่อนำค่าใน products มาใช้ โดยวิธีการ loop ข้อมูล
    let productItem = document.createElement("div"); //สร้าง Element เพื่อเก็บสินค้าเเต่ละชิ้น

    totalPriceAmount += product.amount * product.productInfo.price; //การคำนวณยอดรวมของราคาสินค้า

    productItem.setAttribute("id", `ITEM_CART${index + 1}`); //set id ให้เเต่ละitem
    const productName = document.createElement("h3"); //ชื่อของ product
    const productID = document.createElement("p"); //id ของ product
    const price = document.createElement("p"); //ราคาสินค้า
    const amount = document.createElement("p"); //stock ของสินค้า
    const totalPrice = document.createElement("div");
    const image = document.createElement("img"); //รูปของ product
    const info = document.createElement("div"); //สร้างเพื่อคลุม productName, price, stocks
    const infoWrap = document.createElement("div"); //สร้างเพื่อคลุม info และ buyBtn
    const deleteItem = document.createElement("img"); //สร้างปุ่มเพื่อลบสินค้าที่ละตัว

    productName.textContent = product.productInfo.productName; //นำชื่อจาก products มาใส่ใน productName
    productID.textContent = product.productInfo.productId; //นำ id จาก products มาใส่ใน productID
    price.textContent = `${product.productInfo.price} ฿`; //นำ price จาก products มาใส่ใน price
    amount.textContent = `Amount: ${product.amount}`; // นำค่า stocks จาก products มาใส่ใน stocks
    image.src = product.productInfo.image; //นำ src ของรูปจาก products มาใส่ใน image
    totalPrice.textContent = `${product.productInfo.price * product.amount} ฿`; //เพิ่ม textContent ของ totalPrice ที่มีการคำนวณราคา
    deleteItem.src = "../img/delete.png"; //เอารูปถังขยะมาใส่

    productItem.appendChild(image); //เพิ่มรูปเข้าไปใน div ของ productItem
    info.appendChild(productName); //เพิ่ม productName เข้าไปใน div ของ info
    info.appendChild(price); // เพิ่ม price เข้าไปใน div ของ info
    info.appendChild(amount); //เพิ่ม stocks เข้าไปใน div ของ info
    infoWrap.appendChild(info); //เพิ่ม info เข้าไปใน div ของ infoWrap
    infoWrap.appendChild(totalPrice); //เพิ่ม buyBtnBG เข้าไปใน div ของ infoWrap
    productItem.appendChild(infoWrap); //เพิ่ม infoWrap เข้าไปใน div ของ productItem
    productItem.appendChild(deleteItem); //เพิ่ม deleteItem เข้าไปใน div ของ productItem
    cartContainer.appendChild(productItem); //เพิ่ม productItem เข้าไปใน div ของ productList
    cartList.appendChild(cartContainer);

    //ตกแต่ง css ด้วย framework tailwind
    deleteItem.className = "deleteItem  rounded-lg w-2/12 pt-5 m-auto  ";
    productItem.className =
      "productCart rounded-lg w-2/3 flex flex-col justify-center bg-white my-2 mx-auto";
    image.className =
      "rounded-t-lg product-img object-center object-cover h-auto w-full";
    productName.className =
      "truncate text-gray-700 text-sm md:text-lg mt-2 font-bold mb-4 ml-3";
    price.className = "text-md sm:text-3xl -mt-2 text-blue-600 ml-3";
    amount.className = "text-gray-700 text-xs ml-3";
    totalPrice.className =
      "buyBtnBG rounded-br-lg bg-blue-500 w-2/5 flex justify-center items-center text-lg sm:text-3xl";
    infoWrap.className = "flex justify-between";
    info.className = "cartInfo pb-2 md:pb-4 w-36 ";

    updateDarkMode();

    //สร้าง event ให้ปุ่ม deleteสินค้าเเต่ละตัว
    deleteItem.addEventListener("click", (e) => {
      e.preventDefault();
      updateCartCount(-1);
      //ทำการค้นหาว่า สินค้าที่โดนกดปุ่มลบ ตรงกับชิ้นไหนในตะกร้า
      for (let value of productsCart) {
        if (value.productInfo.productId === product.productInfo.productId) {
          if (--product.amount > 0) {
            //ถ้าจำนวนยังมากกว่า 0 จะทำการลดจำนวนลง
            amount.textContent = `Amount: ${product.amount}`;
            value.amount = product.amount;
            setProductCookie(); //ทำการเซ็ทค่า cookie ใหม่
          } else {
            //  แต่ถ้าจำนวนน้อยกว่าหรือเท่ากับ 0 จะทำการลบ item นั้นออกจากตะกร้า
            productItem.remove();

            //คัดสินค้าในตะกร้า ให้เหลือเฉพาะสินค้าที่ไม่ได้ถูกลบออก
            let filtered = productsCart.filter(function (value) {
              return (
                value.productInfo.productId !== product.productInfo.productId
              );
            });
            productsCart = filtered;
            setProductCookie(); //ทำการเซ็ทค่า cookie ใหม่
          }
        }
      }
      totalPrice.textContent = `${
        product.productInfo.price * product.amount
      } ฿`;
      totalPriceAmount -= product.productInfo.price;
      totalPriceLabel.textContent = `Total price: ${totalPriceAmount} ฿`;
    });
  });

  //----------------------------------------------------------------
  totalPriceLabel.textContent = `Total price: ${totalPriceAmount} ฿`;
  //-------------------------------------------------------
}

// สร้าง function สำหรับลบสินค้าในตะกร้าทั้งหมด
function removeAllCartItem(event) {
  if (!cartList.firstChild) return;
  productsCart = []; //set ตะกร้าสินค้าให้ว่าง
  cartList.removeChild(cartList.firstChild); //ทำการลบสิ้นค้าออกจาก cartContainer ให้หมด
  totalPriceLabel.textContent = `Total price: 0 ฿`; // set ราคาใหม่ทั้งหมดให้เป็น 0
  setCartCount(0); //set ค่าการเเสดงสินค้าในตะกร้าเป็น 0
  setProductCookie(); //set cookie
}

export function closeProductCart() {
  // เป็นปุ่มที่มีเพื่อให้ปิดหน้าต่าง Cart ที่ทำการเเสดงสินค้าทีทั้งหมดในตะกร้า
  cartMenu.classList.add("hidden");
}

//สร้าง function สำหรับ set ค่าคุกกี้
function setProductCookie() {
  let textCookie = ""; // เก็บ cookie ในรูปแบบข้อความ
  //วน loop สินค้าทุกชิ้นในตะกร้า เพื่อนำ Id และจำนวน มาเก็บเป็น text
  productsCart.forEach((product) => {
    //loopสินค้าในตะกร้า
    textCookie += `${product.productInfo.productId}-${product.amount},`; //"ITEM1-5,ITEM2-15,ITEM3-20,"
  });

  CookieUtil.set("cart", textCookie, 30); //นำ text ที่ได้ ไปเก็บเป็น cookie (ตัวเลข -> วันหมดอายุ)
}

//สร้าง function สำหรับค้นหาสินค้าที่ถูกเก็บในคุกกี้ และเรียกใช้ เพื่อนำสินค้าทั้งหมด มาเก็บไว้ในตะกร้า
searchProductCookie(); //check เมื่อเปิดbrowser
function searchProductCookie() {
  let cartCount = 0; //นับจับนวนสินค้าเพื่อนำไปโชว์
  let textCookie = CookieUtil.get("cart"); // ทำการดึงค่าที่เก็บมาดู //"ITEM1-5,ITEM2-15,ITEM3-20,"
  if (textCookie != null && textCookie !== "" && textCookie !== "null") {
    let products = textCookie.split(","); //แยกส่วนสินค้าแต่ละชิ้นออก เป็นarrayเพราะสินค้าจะคั่นด้วยเครื่องหมายลูกน้ำ ["ITEM1-5","ITEM3-10",""] ผลลัพธ์ที่ได้จะเป็น array

    //ถ้า product ที่มาจากคุกกี้ไม่มีค่าจะ return ออก แต่ถ้ามีค่า จะนำค่านั้นมาแยกออก เพื่อให้ได้ Id สินค้า และจำนวนสินค้า

    //จากนั้นส่ง Id สินค้า และจำนวนสินค้าไปที่ function addProductAmount
    products.forEach((product) => {
      if (product === null || product === "") return;
      let productInfo = product.split("-"); //ลบตัว - ออกเพื่อจะได้สินค้าที่เราเก็บตามที่เราต้องการ ["ITEM1","5"]    ["ITEM3","10"]
      addProductAmount(getProductById(productInfo[0]), Number(productInfo[1])); //
      cartCount += Number(productInfo[1]);
    });

    updateCartCount(cartCount);
  }
}

//  count product in cart
export function updateCartCount(amount) {
  let cartCount = document.querySelector("#cartBtnCount");
  cartCount.textContent = Number(cartCount.textContent) + amount;
}

export function setCartCount(amount) {
  let cartCount = document.querySelector("#cartBtnCount");
  cartCount.textContent = amount;
}
