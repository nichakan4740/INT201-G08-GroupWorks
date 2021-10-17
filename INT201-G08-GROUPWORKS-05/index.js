//Higher-Order Functions
function findMin(numbers) {
  //สร้างฟังก์ชั่นเพื่อจะ return ค่าตัวเลขที่น้อยที่สุด
  return Math.min(...numbers);
}

function findMax(numbers) {
  //สร้างฟังก์ชั่นเพื่อจะ return ค่าตัวเลขที่มากที่สุด
  return Math.max(...numbers);
}

function operator(numbers, fn) {
  //สร้างฟังก์ชั่นสำหรับเรียกใช้ function findMin หรือ findMax พร้อมกับส่ง array ที่เป็นตัวเลขไปยัง function
  //แล้ว return ผลลัพธ์ที่ได้จาก function นั้น
  return fn(numbers);
}

//Closure
//สร้าง function สำหรับรับน้ำหนักเข้ามาเป็น array weights
let getWeight = function (weights) {
  //สร้าง inner function สำหรับนำน้ำหนักทั้งหมด มาคำนวณหาน้ำหนักที่มากกว่าเกณฑ์ โดยมี parameter เป็นเกณฑ์
  function cuttingWeight(weight) {
    return weights.filter((num) => num >= weight); //return ผลลัพธ์เป็นน้ำหนักที่มากกว่าเกณฑ์
  }
  return cuttingWeight;
};

//Default parameters
//สร้าง function register โดยมี ชื่อ(fname), นามสกุล(lname) และอาชีพ(่job) เพื่อแสดงข้อมูลที่กรอกไว้ออกมา
function register(fname = "unknown", lname = "unknown", job = "general staff") {
  return `ข้อมูลผู้สมัครงาน ชื่อ: ${fname} ${lname}  อาชีพ: ${job}`;
}

//Rest parameters
//เติมคำนำหน้าชื่อว่า "ผู้ช่วย" ให้กับสมาชิกคนที่ 2 เป็นต้นไป
//สร้าง function เพื่อใช้ forEach ในการวน loop assistants ซึ่งเป็น parameter ตั้งแต่ตัวที่ 2 เป็นต้นไป
function addRank(header, ...assistants) {
  assistants.forEach((assistant, index, array) => {
    assistants[index] = `ผู้ช่วย${assistant}`; //เติมคำว่า ผู้ช่วย ไปที่ด้านหน้าของชื่อ
  });
  return `${header},${assistants}`;
}

export { findMax, findMin, operator, getWeight, register, addRank }; //export function ต่างๆ ที่จะให้อีกไฟล์ import ไปเรียกใช้
