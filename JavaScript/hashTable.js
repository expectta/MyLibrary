const hashFunction = function(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
const LimitedArray = function(limit) {
  const storage = [];

  const limitedArray = {};
  limitedArray.get = function(index) {
    checkLimit(index);
    return storage[index];
  };
  limitedArray.set = function(index, value) {
    checkLimit(index);
    storage[index] = value;
  };
  limitedArray.each = function(callback) {
    for (let i = 0; i < storage.length; i++) {
      callback(storage[i], i, storage);
    }
  };

  var checkLimit = function(index) {
    if (typeof index !== 'number') {
      throw new Error('setter requires a numeric index for its first argument');
    }
    if (limit <= index) {
      throw new Error('Error trying to access an over-the-limit index');
    }
  };

  return limitedArray;
};
class HashTable {
  constructor() {
    this._size = 0;
    this._bucketNum = 8;
    this._storage = LimitedArray(this._bucketNum);
  }
	//주어진 키와 값을 저장합니다. 이미 해당 키가 저장되어 있다면 값을 덮어씌웁니다
  insert(key, value) {
		if(this._size >= this._bucketNum * 0.75){
			this._resize(this._bucketNum * 2);
		}
		const index = hashFunction(key, this._bucketNum);
		//충돌이 발생시 대비할 수 있도록 배열로 저장.
		let bucket = [];
		let tuple = [key,value];
		//스토로지에 index값이 없으면
		if(!this._storage[index]){
			bucket.push(tuple);
			this._storage[index] = bucket;
		}else{
			//index가 존재 할 경우 덮어쓰기
			for(let element of this._storage[index]){
				if(element[0] === key){
					element[1] = value;
				}else{
					//초기
					this._storage[index].push(tuple);
				}
			}
		}
		this._size ++;
  }
	//주어진 키에 해당하는 값을 반환합니다. 없다면 undefined를 반환합니다.
  retrieve(key) {
		const index = hashFunction(key, this._bucketNum);
		if(this._storage[index]){
			for(let element of this._storage[index]){
				if(element[0] === key){
					return element[1];
				}
			}
		}
  }
	//주어진 키에 해당하는 값을 삭제하고 값을 반환합니다. 없다면 undefined를 반환합니다.
  remove(key) {
		if(this._size <= this._bucketNum * 0.25){
			this._resize(this._bucketNum / 2);
		}
		const index = hashFunction(key, this._bucketNum);
		let bucket = this._storage[index];
		let result ;
		if(bucket){
			for(let element of bucket){
				if(element[0] === key){
					result = bucket.splice(bucket.indexOf(element),1);
				}
			}
		}
		this._size--;
		return result;
  }
	//해시 테이블의 스토리지 배열을 newBucketNum으로 리사이징하는 함수입니다. 
	//해시 테이블에 저장된 key-value 쌍이 bucketNum의 75%를 넘는 경우 bucketNum을 2배로 늘리고, 
	//25%보다 작아지는 경우 bucketNum을 절반으로 줄입니다. 
	//리사이징 후 저장되어 있던 값을 전부 다시 해싱을 해주어야 합니다. 
	//구현 후 HashTable 내부에서 사용하시면 됩니다.
  _resize(newBucketNum) {
		let perStorage = this._storage; // 구
		this._bucketNum = newBucketNum;
		this._storage = LimitedArray(newBucketNum)// 신 
		//구 > 신 이주
		for(let i in perStorage){
			this._storage[i] = perStorage[i]
		}
	}
}