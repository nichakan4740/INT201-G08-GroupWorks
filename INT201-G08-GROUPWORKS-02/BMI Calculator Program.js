  //BMI Calculator Program
  function getBMI(pounds,inches){ //สร้าง function getBMI ที่รับ parameter เป็น pounds และ inches
    let height = inchesToMeter(inches); //เรียกใช้ function แปลงหน่วยความสูงจาก inches เป็น meter แล้วมาเก็บไว้ที่ตัวแปร height
    let weight = poundsToKg(pounds);	//เรียกใช้ function แปลงหน่วยน้ำหนักจาก pounds เป็น kilogram แล้วมาเก็บไว้ที่ตัวแปร weight
  	return weight / (height * height);	//คำนวณค่า BMI จากสูตร 
  }
  
  //แปลงค่า pounds เป็น kilogram 
  function poundsToKg(pounds){
    //1 pounds = 0.453592 kg เพราะฉะนั้น หา kilogram ได้โดย pounds / 2.2046
    return pounds / 2.2046;
  }
  
  //แปลงค่า inches เป็น meter
  function inchesToMeter(inches){
    //1 inches = 0.0254 meter เพราะฉะนั้น หา meter ได้โดย inches * 0.0254
    return inches * 0.0254;
  }

//ทดสอบ
console.log(`Georgia's bmi is ${getBMI(36.5,39)}`);
console.log(`Billy's bmi is ${getBMI(50,140)}`);
console.log(`Prayut's bmi is ${getBMI(100,50)}`);
//เรียกใช้ function getBMI เพื่อนำผล return มาแสดงเป็น String ผ่าน template literals