export default class CookieUtil {
  static get(name) {
    //ส่งชื่อ cookie แล้วreturn ค่าcookie ที่ส่งเข้ามา
    let cookieName = `${encodeURIComponent(name)}=`,
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;
    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      );
    }
    return cookieValue; // return ชื่อ cookie ที่รับเข้ามา
  }
  
  static set(name, value, expires) {
    // set ค่า cookie
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    let expireDate = new Date();
    let expireTime = expireDate.getTime() + expires * 24 * 60 * 60 * 1000;
    expireDate.setTime(expireTime); //set วันหมดอายุ
    cookieText += ";expires=" + expireDate.toUTCString() + ";path=/"; //ข้อความบอกวันเวลาหมดอายุ
    document.cookie = cookieText;
  }
  static unset(name) {
    //เป็นการลบ cookie นั้นออก
    CookieUtil.set(name, "", new Date(0)); // set เป็นวันปัจจุบัน
  }
 }
 