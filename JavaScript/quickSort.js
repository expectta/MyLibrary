
// 퀵 정렬은 지난번 병합 정렬 포스팅에서 소개한 Divide and Conquer 전략을 사용한 알고리즘이다. 
// 즉, 정렬하는데 가장 간단한 배열은 바로 요소가 없거나 하나만 있는 배열이므로 모든 배열이 기본 배열이 될 때까지 큰 배열을 나눠야한다.
// 이 때 퀵 정렬에서는 요소 하나를 기준 원소인 pivot으로 설정한다. 그리고 기준 원소의 왼쪽에는 기준 원소보다 작은 값의 배열을 놓고 오른쪽에는 기준 원소보다 큰 값을 놓는다.
// pivot 왼쪽에 놓여진 기준 원소보다 작은 배열에서 위와 같은 방법으로 다시 pivot을 설정하고 배열을 pivot을 기준으로 나눈다. 이 방법을 반복하면 결국 기본 단계인 원소가 하나만 있는 배열이 남는다.

function quickSort(array) {
	if (array.length < 2) {
		return array;
	}
	const pivot = [array[0]];
	const left = [];
	const right = [];
	for (let i = 1; i < array.length; i++) {
		if (array[i] < pivot) {
			left.push(array[i]);
		} else if (array[i] > pivot) {
			right.push(array[i]);
		} else {
			pivot.push(array[i]);
		}
	}
	console.log(`left: ${left}, pivot: ${pivot}, right: ${right}`);
	return quickSort(left).concat(pivot, quickSort(right));
}
const sorted = quickSort([5, 3, 7, 1, 9]);
console.log(sorted);
//[5, 3, 7, 1, 9]
//left : [3,1] pivot : [5] right : [7,9]
//[3,1] = left
//left : [1] privot : [3]
//[1] 배열의 길이가 2보다 작을경우 array그대로 리턴
//최종 리턴값 [1,3] 
//[7,9]
//privot : [7] right : [9]
//[9] 배열의 길이가 2보다 작을 경우 array그대로 린턴
//최종 리턴값 [7,9]
//[1,3].concat([5], [7,9])
//[1,3,5,7,9]



//출처: https://im-developer.tistory.com/135 [Code Playground]


// 	In place Quick Sort
// 위의 방법은 이해하기에 훨씬 쉽고 구현도 간단하지만 메모리 공간의 낭비가 심하기 때문에 위 방법보다는 in place 방법이 훨씬 더 많이 사용된다.
// 	정렬되지 않은 데이터에서 가운데 원소를 pivot으로 설정하고 가장 왼쪽 요소와 가장 오른쪽 요소가 시작점이다.
// 가장 왼쪽부터 값을 pivot값을 비교하여 pivot보다 큰 값이 나타날 때까지 칸을 오른쪽으로 이동한다.
// 가장 오른쪽부터 값을 pivot값을 비교하여 pivot보다 작은 값이 나타날 때까지 칸을 왼쪽으로 이동한다.
// pivot보다 큰 왼쪽 값과 pivot보다 작은 오른쪽 값을 서로 교환한다.
// 왼쪽 인덱스가 오른쪽 인덱스보다 커지면 이동을 멈추고 그 자리에서 두 배열로 갈라서
// 각 배열에 위와 같은 방식으로 재귀 호출하여 정렬한다.
// 이 방법은 추가적인 공간을 필요로하지 않기 때문에 메모리 공간이 절약된다는 장점이 있으나, 왼쪽과 오른쪽 값을 교환하는 과정에서 중복값의 위치가 바뀔 수 있으므로 unstable한 정렬 방법이다.

// 출처: https://im-developer.tistory.com/135 [Code Playground]
let array = [6,4,8,5,2];
function quickSort(array, left = 0, right = array.length - 1) {
	if (left >= right) {
		return;
	}
	//입력받은 array 의 길이를 2로 나누어 소수점 이하를 버리고 중위값을 찾는다.
	const mid = Math.floor((left + right) / 2);
	const pivot = array[mid];
	const partition = divide(array, left, right, pivot);
	quickSort(array, left, partition - 1);
	quickSort(array, partition, right);

	function divide(array, left, right, pivot) {
		console.log(`array: ${array}, left: ${array[left]}, pivot: ${pivot}, right: ${array[right]}`)
		
		while (left <= right) {

			while (array[left] < pivot) {
				left++;
			}

			while (array[right] > pivot) {
				right--;
			}

			if (left <= right) {
				let swap = array[left];
				array[left] = array[right];
				array[right] = swap;
				left++;
				right--;
			}
		}
		return left;
	}
	return array;
}
console.log(quickSort(array));