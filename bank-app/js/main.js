// json 파일들을 html내로 추가시킬 위치 
const json = document.querySelector('.transaction-container .swiper-slide');
// 해당 json 데이터 정보
const file = 'https://syoon0624.github.io/json/test.json';

const request = new XMLHttpRequest();

// URL로 서버 데이타(json) 연결하기 - response 생성?
request.open('GET', file);
request.responseType = 'json';
// 서버에서 response 요청을 보냄
request.send();

// onload를 통해 응답이 성공적으로 돌아왔을 때 작동할 코드 작성
request.onload = function () {
  // BankDataRequest.response는 서버의 json 파일 객체에서 banklist의 배열을 가져옴
  const BankList = request.response;

  showBankList(BankList);
};


function showBankList(jsonObj) {
  let banklist = jsonObj['bankList'];
  
  for(let i=0; i<banklist.length; i++) {
    let myArticle = document.createElement('article');
    let myPara1 = document.createElement('p');
    let myPara2 = document.createElement('p');
    let myPara3 = document.createElement('p');
    let myPara4 = document.createElement('p');
    let myPara5 = document.createElement('p');
    
    myPara1.textContent = 'date: '+ banklist[i].date;
    myPara2.textContent = 'income: '+ banklist[i].income;
    myPara3.textContent = 'classify: '+ banklist[i].classify;
    myPara4.textContent = 'history: '+ banklist[i].history;
    myPara5.textContent = 'price: '+ banklist[i].price;

    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myPara4);
    myArticle.appendChild(myPara5);

    json.appendChild(myArticle);
  }
}
