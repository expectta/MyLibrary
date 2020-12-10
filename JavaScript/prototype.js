
//new생성자로 인스턴스화 시킬경우
var Human = function(name){
  this.name = name;
}
Human.prototype.sleep = function(){
  console.log('zzz');
}
var student = new Human('lee');

//student의 참조는 Human
console.log(student.__proto__ === Human.prototype);
//student의 참조의 참조는 Object
console.log(student.__proto__.__proto__ === Object.prototype);
//student의 생성자는 Human
console.log(student.constructor === Human);

var Human = function(name){
  this.name = name;
}
Human.prototype.sleep = function(){
  console.log('zzz');
}
var steve = new Human('steve')
Human.prototype.sleep = function(){console.log('zzz')};

function Student (){
}
Student.prototype.learn = function (){
  console.log('배우는중')
}
//Human의 객체를 Student에 복제하여 상속관계를 만든다.
Student.prototype = Object.create(Human.prototype);
//상속관계를만들고 constructor를 Student로 할댕 해 주지 않으면
//constructor는 Human을 바라보게 된다
//이유는 위에서 객체를 복제했기때문이다.
Student.prototype.constructor = Student;
//Student의 instance를 만든다.
let student = new Student();
console.log(student instanceof Human)//	true
console.log(student instanceof Student)//	true
console.log(student.__proto__)//Student
student.sleep();//zzz