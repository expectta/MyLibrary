
//배열의 내장함수를 살펴보고 어떻게 동작하고 응용할지 확인한다.

//forEach
//일반적인 for문과 같다고 생각할 수 있다.

let numberArray = [1,2,3];

function sum (arr){
	arr.forEach(function(currentValue, index, array){
		console.log(`현재 배열의 요소 ${currentValue} 현재 배열의 인덱스 ${index}`);
	});
}
sum(numberArray);
// 현재 배열의 요소 1 현재 배열의 인덱스 0
// 현재 배열의 요소 2 현재 배열의 인덱스 1
// 현재 배열의 요소 3 현재 배열의 인덱스 2

//map
//배열 내 모든요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
let testArray = [1,2,3];
let students = [
	{
		name : 'kim',
		age : 17,
		gender : 'male'
	},
	{
		name : 'lee',
		age : 18,
		gender : 'female'
	},{
		name : 'john',
		age : 19,
		gender : 'male'
	}
]
let onlyStudentsNnme = students.map(function(key){
	return key.name;
})
console.log(onlyStudentsNnme);
//['kim', 'lee', 'john']

//filter 
//주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환.

let number = [1,2,3,4,5,6]

let employee = [
	{
		name : 'kim',
		age : 17,
		gender : 'male'
	},
	{
		name : 'lee',
		age : 18,
		gender : 'female'
	},{
		name : 'john',
		age : 19,
		gender : 'male'
	}
]
let overEighteen= employee.filter(function(currentValue , index, array){
	return currentValue.age > 18;
})
console.log(overEighteen);
//{name: 'john', age: 19, gender: 'male'}


//reduce
// 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환한다.
let numberArr = [1,2,3,4];

let totalNumber = numberArr.reduce(function(acc , cur , index, array){
	return acc = acc + cur;
}, 0)
console.log(totalNumber);

