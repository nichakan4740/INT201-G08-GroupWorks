var button = document.querySelector(".btn");
var scoreText = document.querySelector(".score");
  
const text = "สวัสดีครับ";
console.log(text);
  
let score = 0;
  
  function addScore(){
	score++;
	console.log("score");
	scoreText.innerHTML = score;
}
  
setTimeout(function(){
	console.log("ลาออกสะ");
},3000)

function sayHello(){
	console.log("Hello");
}
setTimeout(sayHello,3000);


  

