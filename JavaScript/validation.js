
//입력값이 존재하는지 여부 확인
function isEmpty(value) {
  return value.length === 0;
}
​//입력값의 길이제 대한 제한
function moreThanLength(str, n) {
  return str.length >= n; 
}
//영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}
//최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
}
​//핸드폰 번호
function isPhoneNumber(num) {
  return /^\d{3}-\d{3,4}-\d{4}$/.test(num);
}