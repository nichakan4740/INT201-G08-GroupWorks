//import function ทั้งหมดจาก index.js เพื่อนำมาเรียกใช้ในไฟล์นี้
import {
    findMax,
    findMin,
    operator,
    getWeight,
    register,
    addRank
  } from "./index";
  
  //Higher-Order Functions Test
  let numbers = [1, 5, 6, 7, 9, 50, -200]; //เก็บข้อมูลตัวเลขลงใน array numbers
  let numbers2 = [10, 55, 16, 67]; //เก็บข้อมูลตัวเลขลงใน array numbers2
  
  console.log(`Max number of [${numbers}] is ${operator(numbers, findMin)}`); //output : Max number is -200
  console.log(`Min number of [${numbers}] is ${operator(numbers, findMax)}`); //output : Min number is 50
  //เรียกใช้ function operator โดย่สง parameter เป็น array ที่ดึงสมาชิกจาก numbers และ numbers2 โดยใช้ spread operator
  console.log(
    `Max number of [${[...numbers, ...numbers2]}] is ${operator(
      [...numbers, ...numbers2],
      findMax
    )}`
  ); //output : Max number of [1,5,6,7,9,50,-200,10,55,16,67] is 67
  
  //Closure Test
  let fn_cuttingWeight1 = getWeight([55, 21, 120, 49, 91]);
  console.log(`น้ำหนักที่เกินเกณฑ์ 90 กิโลกรัม ได้แก่ ${fn_cuttingWeight1(90)}`);
  //output : [ 120, 91 ] จะทำการแสดงค่าที่มากกว่า 90 kg ออกมา
  let fn_cuttingWeight2 = getWeight([101, 39, 71, 89, 26]);
  console.log(`น้ำหนักที่เกินเกณฑ์ 40 กิโลกรัม ได้แก่ ${fn_cuttingWeight2(40)}`);
  //output : [ 101, 71, 89 ] จะทำการแสดงค่าที่มากกว่า 40 kg ออกมา
  let fn_cuttingWeight3 = getWeight([40, 75, 72, 80, 30]);
  console.log(`น้ำหนักที่เกินเกณฑ์ 50 กิโลกรัม ได้แก่ ${fn_cuttingWeight3(50)}`);
  //output : [ 75, 72, 80 ] จะทำการแสดงค่าที่มากกว่า 50 kg ออกมา
  
  //Default Parameters Test
  console.log(register()); //output : ข้อมูลผู้สมัครงาน ชื่อ: unknown unknown  อาชีพ: general staff
  console.log(register("ธนอน", "จุมรุ่มเรืองกิจ", "นักการเมือง")); //output : ข้อมูลผู้สมัครงาน ชื่อ: ธนอน จุมรุ่มเรืองกิจ  อาชีพ: นักการเมือง
  console.log(register("ปลาหยุด", "จันทร์โอเช")); //output : ข้อมูลผู้สมัครงาน ชื่อ: ปลาหยุด จันทร์โอเช  อาชีพ: general staff
  
  //Rest Parameters Test
  console.log(addRank("หัวหน้าเอ", "บี", "ซี", "ดี")); //output : หัวหน้าเอ,ผู้ช่วยบี,ผู้ช่วยซี,ผู้ช่วยดี
  console.log(addRank("หัวหน้าสมชาย", "บี", "ซี", "ดี", "บาส", "หญิง")); //output : หัวหน้าสมชาย,ผู้ช่วยบี,ผู้ช่วยซี,ผู้ช่วยดี,ผู้ช่วยบาส,ผู้ช่วยหญิง
  console.log(addRank("ประธานส้ม", "ผึ้ง")); //output : ประธานส้ม,ผู้ช่วยผึ้ง
