//Change Calculator
//สร้าง array moneyCategory มาเพื่อเก็บค่าราคาของธนบัตร
const moneyCategory = [500, 100, 50, 20, 10, 5, 2, 1];
//สร้าง array product มาเพื่อเก็บ object สินค้าโดยแต่ละ object จะมีชื่อสินค้า และราคาสินค้า
const product = [
  { name: "Pepsi", price: 20 },
  { name: "Coke", price: 15 },
  { name: "Orange juice", price: 25 },
];

//สร้าง function buy ให้ลูกค้าเลือกสินค้าโดยรับ argument 2 ตัวคือ choose สินค้าที่ต้องการและ money จำนวนเงินที่ลูกค้าจ่าย
function buy(choose, money) {
  for (let item of product) {
    //ใช้ for loop ตามจำนวนสินค้าที่มีใน array product
    if (choose == item.name && money >= item.price) {
      //สร้าง if เพื่อเช็คว่าชื่อสินค้าที่ลูกค้าสั่งเข้ามาตรงกับชื่อสินค้าที่มีหรือไม่ และเงินที่ลูกค้าจ่ายต้องมีค่ามากกว่าหรือเท่ากับราคาสินค้า
      let change = calChange(money, item.price); //สร้างตัวแปร change มารับค่าจาก function calChange ซึ่งจะได้เป็นจำนวนเงินทอน
      let changeAmount = numOfEachMoney(change); //สร้างตัวแปร changeAmount มารับค่าจาก function numOfEachMoney ซึ่งจะได้เป็นจำนวนธนบัตรและเหรียญที่ทอน

      //แสดงรายละเอียดการสั่งซื้อสินค้า
      console.log(`สินค้าของคุณ: ${choose}`);
      console.log(`ราคาสินค้า: ${item.price}`);
      console.log(`จำนวนเงินที่ลูกค้าชำระ: ${money}`);
      console.log(`จำนวนเงินที่ต้องทอน: ${change}`);
      console.log("จำนวนเงินที่ต้องทอนแต่ละประเภท");
      for (let item of changeAmount) {
        //แสดงประเภทของเงิน โดยเช็คเงื่อนไขว่า ถ้าเงินประเภทนั้นมีมูลค่ามากกว่า 10 บาท จะให้แสดงคำว่าธนบัตร และมีลักษณะนามว่าใบ 
        //ถ้าเงินประเภทนั้นมีมูลค่าน้อยกว่าหรือเท่ากับ 10 จะให้แสดงคำว่าเหรียญ และมีลักษณะนามว่าเหรียญ
        if (item.price > 10) {
          console.log(`ธนบัตร ${item.price} บาท : จำนวน ${item.amount} ใบ`);
        } else {
          console.log(`เหรียญ ${item.price} บาท : จำนวน ${item.amount} เหรียญ`);
        }
      }
      console.log("==========================");
      return changeAmount; //return array changeAmount ที่เก็บประเภทเงิน และจำนวนของเงินประเภทนั้นๆ ที่ต้องทอน
    }
  }
  return null;
}
//สร้าง function calChange โดยมี argument 2 ตัว ได้แก่ money_user จำนวนเงินที่ลูกค้าจ่าย และ product_price ราคาสินค้า เพื่อนำไปคำนวณหาจำนวนเงินที่ต้องทอน
function calChange(money_user, product_price) {
  return money_user - product_price; // เงินของลูกค้าที่ชำระค่าสินค้า ลบกับ ราคาของสินค้า --> เงินทอน
}
//สร้าง function numOfEachMoney รับค่า change จำนวนเงินทอน เพื่อคำนวณหาจำนวนธนบัตรและจำนวนเหรียญที่ต้องทอน
function numOfEachMoney(change) {
  let numOfEachMoney = [];

  //สร้าง for loop เพื่อเช็คว่าเงินที่ต้องทอนแต่ละราคา มีจำนวนอย่างละเท่าไร
  for (let money of moneyCategory) {
    if (change >= money) {
      //ถ้าจำนวนเงินทอน มากกว่าหรือเท่ากับ ราคาของธนบัตรหรือเหรียญนั้นๆ ให้ทำการคำนวณหาจำนวน
      let numOfMoney = { price: money, amount: Math.floor(change / money) }; //สร้าง object ที่มี property เป็นราคาของธนบัตรหรือเหรียญ และจำนวน
      change = change % money; //ทำให้เงินทอนลดลงเหลือเป็นเศษที่ต้องใช้ในการคำนวณต่อ
      numOfEachMoney.push(numOfMoney); //เพิ่ม object numOfMoney เป็นสมาชิกใน array numOfEachMoney
    }
  }

  return numOfEachMoney;
}

//ทดสอบการทำงานของโปรแกรม โดยเรียกใช้ function buy ส่ง parameter 2 ตัวได้แก่ ชื่อสินค้า และจำนวนเงินที่ลูกค้าจ่าย
console.log("Change Calculator");
console.log("==========================");
buy("Coke", 20);
buy("Pepsi", 1111);
buy("Orange juice", 127);
buy("Orange juice", 708);