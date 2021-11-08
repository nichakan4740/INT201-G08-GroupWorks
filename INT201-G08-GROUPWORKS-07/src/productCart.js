let productsCart = []; //ตะกร้าเก็บสินค้าเป็น Array
export function addProduct(product) {
  for (let cart of productsCart) {
    //เช็คว่าสินค้าที่ทำการเพิ่มใหม่เคยมีในตะกร้าไหม
    if (cart.productInfo.productName === product.productName) {
      //วน loop เพื่อเช็คว่ามีค่าซ้ำหรือไม่ ถ้าซ้ำก็เพิ่มลงใน amount
      cart.amount = cart.amount + 1;
      return;
    }
  }

  productsCart.push({ productInfo: product, amount: 1 }); //ถ้าทำการ loop ทั้งหมดแล้วแล้วไม่มีตัวซ้ำก็จะเข้า push เพื่อเพิ่มสินค้าใหม่
}

export function showProductsCart(products) {
  //เเสดงสินค้าทั้งหมดในตะกร้า
  let totalPriceAmount = 0; //ราคารวมสินค้าทั้งหมด โดยมาจาก ราคาสินค้าแต่ละชิ้น * จำนวนที่เลือก
  //ทำการสร้าง const เพื่อเอาไว้เก็บข้อมูลใน cart
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

    productName.textContent = product.productInfo.productName; //นำชื่อจาก products มาใส่ใน productName
    productID.textContent = product.productInfo.productId; //นำ id จาก products มาใส่ใน productID
    price.textContent = `${product.productInfo.price} ฿`; //นำ price จาก products มาใส่ใน price
    amount.textContent = `Amount: ${product.amount}`; // นำค่า stocks จาก products มาใส่ใน stocks
    image.src = product.productInfo.image; //นำ src ของรูปจาก products มาใส่ใน image
    totalPrice.textContent = `${product.productInfo.price * product.amount} ฿`;

    productItem.appendChild(image); //เพิ่มรูปเข้าไปใน div ของ productItem
    info.appendChild(productName); //เพิ่ม productName เข้าไปใน div ของ info
    info.appendChild(price); // เพิ่ม price เข้าไปใน div ของ info
    info.appendChild(amount); //เพิ่ม stocks เข้าไปใน div ของ info
    infoWrap.appendChild(info); //เพิ่ม info เข้าไปใน div ของ infoWrap
    infoWrap.appendChild(totalPrice); //เพิ่ม buyBtnBG เข้าไปใน div ของ infoWrap
    productItem.appendChild(infoWrap); //เพิ่ม infoWrap เข้าไปใน div ของ productItem
    cartList.appendChild(productItem); //เพิ่ม productItem เข้าไปใน div ของ productList

    //ตกแต่ง css ด้วย framework tailwind
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
  });

  const totalPrice = document.createElement("p"); //เพื่อเก็บข้อมูลยอดรวมของราคาสินค้าทั้งหมด
  totalPrice.textContent = `Total price: ${totalPriceAmount} ฿`; // ทำการsetข้อความในการเเสดงยอดรวมราคา
  totalPrice.className = "text-gray-700 text-right mt-4"; //ตกแต่ง totalPrice

  cartList.appendChild(totalPrice);
}

export function closeProductCart() {
  //เป็นปุ่มที่มีเพื่อให้ปิดหน้าต่าง Cart ที่ทำการเเสดงสินค้าทีทั้งหมดในตะกร้า
  const cartMenu = document.querySelector(".cartMenu"); //ทำการเชื่อม html ที่ไอดี cartMenu เข้าไปในตัวเเปล cartMenu
  while (cartMenu.firstChild) {
    // เช็คว่าในไอดี cartMenuมีคลาสลูกหรือไม่
    cartMenu.removeChild(cartMenu.firstChild); // ทพการลบคลาสลูกตัวเเรกที่ละตัว
  }
}
