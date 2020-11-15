/*
사용자의 입력값에 대한 유효성검사 Library
*/ 

//입력값이 존재하는지 여부 확인
function isEmpty(value) {
  return value.length === 0;
}
​
function moreThanLength(str, n) {
  return str.length >= n; 
}
​
// [유효성 검증 함수]: 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}
​
// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
}
​
function isPhoneNumber(num) {
  return /^\d{3}-\d{3,4}-\d{4}$/.test(num);
}