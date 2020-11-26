//spread syntax와 rest parameter 

let studentsName = ['john','lora','micheal'];
function printName(firstStudent, secondeStudent, thirdStudent){
		console.log(`제 이름은 ${firstStudent} 입니다.`);
		console.log(`제 이름은 ${secondeStudent} 입니다.`);
		console.log(`제 이름은 ${thirdStudent} 입니다.`);
}
printName(...studentsName);// = printName('john','lora','micheal');와 같다.
// 제 이름은 john 입니다.
// 제 이름은 lora 입니다.
// 제 이름은 micheal 입니다.

let addedStudentsName = [...studentsName, 'sam', 'bora'];
console.log(addedStudentsName);

//배열의 병합을 할 수 있다.
let arrayA = [0,1,2];
let arrayB = [2,4,5];
arrayA = [...arrayA, ...arrayB];
console.log(arrayA);
//[0, 1, 2, 3, 4, 5]
var obj = {'key1': 'value1'};
var array = [...obj];
console.log(array)

//객체를 spread syntax로 활용해서 병합 할 경우 key값의 중복이 있을경우 덮어쓰기를 한다.
var man = { name: 'john', age: 42, hobby:"soccer" }
var women = { name: 'lora', age: 13 , hobby: "sketch"};
var clonedObj = { ...man };
console.log(clonedObj);
//{name: 'john', age: 42, hobby: 'soccer'}
var mergedObj = { ...man, ...women };
console.log(mergedObj);
//{name: 'lora', age: 13, hobby: 'sketch'}

//rest parameter
function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a); 
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs); 
}

myFun("one", "two", "three", "four", "five", "six");

// Console Output:
// a, one
// b, two
// manyMoreArgs, [three, four, five, six]

