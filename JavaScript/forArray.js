//배열 내 유니크한 값만 남길때
//1. Set
const array = [1,1,2,3,4,5]
//set 객체를 Array.from 배열로 변경
const uniqArray = Array.from(new Set(array));
console.log(uniqArray);
// [1, 2, 3, 4, 5]

//2.redce
//TODO : 재검토 필요
array.reduce((acc,curr) => acc.includes(curr) ? acc : [...acc,curr],[]); 
// [1, 2, 3, 4, 5]

//3.ES6를 사용 못할때
array.reduce(function(acc,curr,index){
	acc.indexOf(curr) > -1 ? acc : acc.push(curr);
	return acc;
},[]); 
// [1, 2, 3, 4, 5]

// 2. filter, indexOf
array.filter(function(a, i, self){
return self.indexOf(a) === i;
}); 
// [1, 2, 3, 4, 5]

