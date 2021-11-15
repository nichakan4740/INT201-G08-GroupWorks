import CookieUtil from "./cookies.js";
import { getProductById } from "./script.js";
import { enableDarkMode, disableDarkMode } from "./darkMode.js";

let productsCart = []; //ตะกร้าเก็บสินค้าเป็น Array
export function addProduct(product) {
  console.log(product);
  if (productsCart.length > 0) {
    for (let cart of productsCart) {
      console.log(cart);
      //เช็คว่าสินค้าที่ทำการเพิ่มใหม่เคยมีในตะกร้าไหม
      if (cart.productInfo.productId === product.productId) {
        //วน loop เพื่อเช็คว่ามีค่าซ้ำหรือไม่ ถ้าซ้ำก็เพิ่มลงใน amount
        cart.amount = cart.amount + 1;
        setProductCookie();
        return;
      }
    }
  }

  productsCart.push({ productInfo: product, amount: 1 }); 
  //ถ้าทำการ loop ทั้งหมดแล้วแล้วไม่มีตัวซ้ำก็จะเข้า push เพื่อเพิ่มสินค้าใหม่
  setProductCookie();
}

function addProductAmount(product, amount) {
  productsCart.push({ productInfo: product, amount: amount });
}

export function showProductsCart(products) {
  //เเสดงสินค้าทั้งหมดในตะกร้า
  let totalPriceAmount = 0; //ราคารวมสินค้าทั้งหมด โดยมาจาก ราคาสินค้าแต่ละชิ้น * จำนวนที่เลือก
  //ทำการสร้าง const เพื่อเอาไว้เก็บข้อมูลใน cart
  let totalPriceLabel = document.createElement("p");

  const cartMenu = document.querySelector(".cartMenu");
  const cartHeader = document.createElement("p");
  const cartList = document.createElement("div");

  cartHeader.textContent = "SHOPPING CART";
  cartHeader.className =
    "cartHeader py-3 text-md font-bold tracking-widest text-center rounded-t-lg mx-auto w-9/12 sm:w-4/6 lg:w-1/3 max-w-2xl";
  cartList.className =
    "cartList overflow-y-scroll flex flex-col p-6 bg-white border-b border-gray-200 rounded-b-lg mx-auto w-9/12 sm:w-4/6 lg:w-1/3 max-w-2xl";

  cartMenu.appendChild(cartHeader);
  cartMenu.appendChild(cartList);

  let darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

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
    //เพิ่มปุ่มลบ
    const deleteItem = document.createElement("img"); //สร้างปุ่มเพื่อลบสินค้า

    productName.textContent = product.productInfo.productName; //นำชื่อจาก products มาใส่ใน productName
    productID.textContent = product.productInfo.productId; //นำ id จาก products มาใส่ใน productID
    price.textContent = `${product.productInfo.price} ฿`; //นำ price จาก products มาใส่ใน price
    amount.textContent = `Amount: ${product.amount}`; // นำค่า stocks จาก products มาใส่ใน stocks
    image.src = product.productInfo.image; //นำ src ของรูปจาก products มาใส่ใน image
    totalPrice.textContent = `${product.productInfo.price * product.amount} ฿`; 
    //เพิ่ม textContent ของ totalPrice ที่มีการคำนวณราคา
    deleteItem.src = "../img/delete.png"; //เอารูปถังขยะมาใส่

    productItem.appendChild(image); //เพิ่มรูปเข้าไปใน div ของ productItem
    info.appendChild(productName); //เพิ่ม productName เข้าไปใน div ของ info
    info.appendChild(price); // เพิ่ม price เข้าไปใน div ของ info
    info.appendChild(amount); //เพิ่ม stocks เข้าไปใน div ของ info
    infoWrap.appendChild(info); //เพิ่ม info เข้าไปใน div ของ infoWrap
    infoWrap.appendChild(totalPrice); //เพิ่ม buyBtnBG เข้าไปใน div ของ infoWrap
    productItem.appendChild(infoWrap); //เพิ่ม infoWrap เข้าไปใน div ของ productItem
    cartList.appendChild(productItem); //เพิ่ม productItem เข้าไปใน div ของ productList
    productItem.appendChild(deleteItem); //เพิ่ม deleteItem เข้าไปใน div ของ productItem

    //ตกแต่ง css ด้วย framework tailwind
    deleteItem.className = "deleteItem rounded-lg w-2/12 pt-5 m-auto";
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

    let darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

    //สร้าง event ให้ปุ่ม delete
    deleteItem.addEventListener("click", (e) => {
      e.preventDefault();

      //ทำการค้นหาว่า สินค้าที่โดนกดปุ่มลบ ตรงกับชิ้นไหนในตะกร้า
      for (let value of productsCart) {
        if (value.productInfo.productId === product.productInfo.productId) {
          if (--product.amount > 0) {
            //ถ้าจำนวนยังมากกว่า 0 จะทำการลดจำนวนลง
            amount.textContent = `Amount: ${product.amount}`;
            value.amount = product.amount;
            setProductCookie(); //ทำการเซ็ทค่า cookie ใหม่
            totalPriceLabel.textContent = `Total price: ${getTotalPrice()} ฿`;

            return;
          }
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
          totalPriceLabel.textContent = `Total price: ${getTotalPrice()} ฿`;

          return;
        }
      }

      totalPriceLabel.textContent = `Total price: ${getTotalPrice()} ฿`;
    });
  });

  cartList.appendChild(totalPriceLabel);
  totalPriceLabel.textContent = `Total price: ${totalPriceAmount} ฿`;
  totalPriceLabel.className = "text-gray-700 text-right mt-4"; //ตกแต่ง totalPrice
}
export function closeProductCart() {
  //เป็นปุ่มที่มีเพื่อให้ปิดหน้าต่าง Cart ที่ทำการเเสดงสินค้าทีทั้งหมดในตะกร้า
  const cartMenu = document.querySelector(".cartMenu"); //ทำการเชื่อม html ที่ไอดี cartMenu เข้าไปในตัวเเปล cartMenu
  while (cartMenu.firstChild) {
    // เช็คว่าในไอดี cartMenuมีคลาสลูกหรือไม่
    cartMenu.removeChild(cartMenu.firstChild); // ทำการลบคลาสลูกตัวเเรกที่ละตัว
  }
}

//สร้าง function สำหรับคำนวณราคาสิ้นค้าทั้งหมดในตะกร้า
function getTotalPrice() {
  let totalPrice = 0;
  for (let product of productsCart) {
    totalPrice += product.productInfo.price * product.amount;
  }
  return totalPrice;
}

//สร้าง function สำหรับเซ็ทค่าคุกกี้
function setProductCookie() {
  let textCookie = "";
  //วน loop สินค้าทุกชิ้นในตะกร้า เพื่อนำ Id และจำนวน มาเก็บเป็น text
  productsCart.forEach((product) => {
    textCookie += `${product.productInfo.productId}-${product.amount},`;
  });

  CookieUtil.set("cart", textCookie, 30); //นำ text ที่ได้ ไปเก็บเป็น cookie
}

//สร้าง function สำหรับค้นหาสินค้าที่ถูกเก็บในคุกกี้ และเรียกใช้ เพื่อนำสินค้าทั้งหมด มาเก็บไว้ในตะกร้า
searchProductCookie();
function searchProductCookie() {
  let textCookie = decodeURIComponent(CookieUtil.get("cart"));
  if (textCookie != null && textCookie !== "" && textCookie !== "null") {
    let products = textCookie.split(","); //แยกส่วนสินค้าแต่ละชิ้นออก เพราะสินค้าจะคั่นด้วยเครื่องหมายลูกน้ำ

    //ถ้า product ที่มาจากคุกกี้ไม่มีค่าจะ return ออก แต่ถ้ามีค่า จะนำค่านั้นมาแยกออก เพื่อให้ได้ Id สินค้า และจำนวนสินค้า
    //จากนั้นส่ง Id สินค้า และจำนวนสินค้าไปที่ function addProductAmount
    products.forEach((product) => {
      if (product === null || product === "") return;
      let productInfo = product.split("-");
      console.log(productInfo);
      addProductAmount(getProductById(productInfo[0]), Number(productInfo[1]));
    });
  }
}
