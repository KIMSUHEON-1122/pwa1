//캐싱 스토리지에 저장될 이름
var CHCHE_NAME = "pwa-offline-v1";
//캐싱할 웹자원(이미지,css..)목록을 배열로
var filesToCache = ["/", "/img/olivelogo.png"];

//서비스워커 설치(웹자원 캐싱)
self.addEventListener("install", function (event) {
	event.waitUntil( //install이 끝날때까지 기다리다 감싸쭘? 
		caches
			.open(CHCHE_NAME)
			//CHCHE_NAME변수 이름으로 캐시 스토리지에 캐시를 생성 -> pwa파일 나옴
			//caches - 캐시스토리지에 접근할 수 있는 예약어
			.then(function (cache) {
				// 캐싱이 성공했을때(위에 결과물 캐시파일)
				return cache.addAll(filesToCache); //pwa파일 웹자원 추가
			})
            .catch(function(error){
                return console.log(error);           
            }),
	);
});

//서비스 워커 설치 후 네트워크 요청이 있을 경우 캐쉬로 돌려줌(캐쉬된 자원으로)
self.addEventListener('fetch', function(event){
    event.respondWidth( //fetch결과에 대한 응답을 알려주는 API)
        caches.match(event.request) 
        //caches.match() - 네트워크에 요청에 해당하는 캐싱을 반환 
        .then(function(response){
            return response || fetch(event.request)  
            //캐쉬에 없을때는 fetch API(네트워크로 가서 가져옴)
        })
        .catch()
        )
})