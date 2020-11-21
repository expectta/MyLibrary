//openWeather 서버로 cityID로 날씨 정보(JSON)를 얻어온다.
function getData(cityNumber) {
	const API_KEY ='myAPIkey';
	let cityId = cityNumber || '1835848'; // cityNumber = ! undefinded 
	let apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}`

	/**
	 * JSON.stringigy(JavaSciptObject)는 자바스크립트 객체를 문자열로 변환함.serialization
	 * JSON.parse(String)는 문자열을 자바스크립트 객체로 변환
	 * 
	 */
  fetch(apiUrl) 
  .then(function(resp) {
		//서버로부터 response 스트림을 가져와 스트림이 완료될때까지 읽고 텍스를 Promise 객체 형태로 반환한다.
		//전달받은 데이터를 JSON형태로 파싱
		return resp.json();
	})
		//파싱이 완료된 후 사용할 로직
  .then(function(json) {
		renderWeatherData(json);
	})
	.catch(function(error){
		//error발생시 처리
	});
}