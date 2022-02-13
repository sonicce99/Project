
<div align=center><img width="500" alt="Naver logo" src="https://user-images.githubusercontent.com/87749134/148639783-2d571ccd-0396-4b0b-978b-63d283db65a8.png"></div>

# Make Naver

Make Naver 는 약 1개월 동안 준비한 개인 프로젝트입니다. 패스트캠퍼스에서 핀테크 서비스 프론트엔드 개발자 양성 과정을 2021년 7월 19일 부터 2022년 2월 14일까지 약 7개월간 수강했으며 2021년 11월 18일 부터 12월 3일 까지 약 2주간 React를 배운 후, 12월 6일부터 12월 23일까지 약 17일 동안 만든 개인 프로젝트입니다. 그렇기 때문에 처음 리액트 설계부분에 부족함이 있어 Redux를 적용하지 못했다든가, 코드를 최적화 하지 못했다는 아쉬움이 있습니다. 하지만 한달도 안되는 기간동안, 수업을 들으며 리액트를 사용해 제가 의도한 기능을 제대로 수행하는 사이트를 만들었다는 것을 높게 평가해 주시면 좋겠습니다.  

<div align=center><img width="700" alt="프로젝트 기간" src="https://user-images.githubusercontent.com/87749134/148640828-d614c002-9c0d-4923-8b12-528201f028c7.png"></div>

## My youtube channel

https://www.youtube.com/channel/UCqa4CnlUu--_X0lXWURBNEQ


### 제가 만든 프로젝트를 영상으로 만들어 youtube에 업로드 해두었습니다.



## 프로젝트 개요

제 프로젝트는 사용자가 원하는 제품을 네이버 랭킹순으로 빠르게 찾아서 구매하는 것을 지향하고 있습니다.
사용자는 본인이 원하는 제품을 실제 네이버 연관검색어를 통해 찾아낼 수 있고 네이버 쇼핑에 등록된 제품을 최저가로 순으로 바로 찾아줍니다. 수많은 제품들 중 카테고리를 1~4단계로 나누어 카테고리 단계별로 구분된 제품들만 모아서 볼 수 있으며, 사용자가 원하는 제품을 실제로 구매할 수 있고 원한다면 장바구니에 담아 원하는 제품만 구매할 수 있습니다.


## 프로젝트 목표점

React를 가지고 처음 구현하는 프로젝트 였던 만큼 단순히 기능만을 구현하는것이 아닌 최대한 Naver와 같게, 하지만 단순히 똑같이 구현하기 보다는 *저만의 색깔을 입혀서 만들고 싶었습니다.* 그래서 API 통신 하는 과정에서 로딩중일 때는 제 트레이트 마크인 로고를 보여주게 제작했습니다.

<img width="200" alt="동수의 로그북" src="https://user-images.githubusercontent.com/87749134/148642433-c35704ba-4bcd-4390-b2c8-1492fd9e9913.jpg">

## Make Naver 개발 로드맵

<img width="600" alt="스크린샷 2022-01-08 오후 8 35 32" src="https://user-images.githubusercontent.com/87749134/148642624-089a0a04-e15a-4cc4-8c30-cedbd5f1e5b6.png">

클라이언트(React) 와 Express 프레임워크를 사용한 서버가 있고, Naver 측에서 데이터를 받아오고, 패스트캠퍼스 측에서 제공해주신 서버와 통신을 합니다.

## Naver 오픈 API 활용 이유

요즘 트렌드 중 하나로 restful API 를 주로 사용하고 *많은 채용 사이트에서 자격 요건, 주요 업무로 Restful API 를 사용해야 한다* 는 점을 알게 되었습니다. 이때 네이버 개발자센터에서 Open API 로 REST API 를 제공한다는 것을 알게 되었고 이를 경험 해 보면 좋겠다는 생각에 네이버 쇼핑 페이지를 구현해 보기로 했습니다.

↓ 원티드에서 찾은 여러 채용공고 자격요건

<img width="400" alt="스크린샷 2022-01-08 오후 8 43 31" src="https://user-images.githubusercontent.com/87749134/148642881-4e6f61a5-2c42-4fbb-b53a-1ad8c1a0ca24.png">
<img width="400" alt="스크린샷 2022-01-08 오후 8 43 55" src="https://user-images.githubusercontent.com/87749134/148642883-20781fdc-bc97-4aa9-bab4-4038238885ef.png">
<img width="400" alt="스크린샷 2022-01-08 오후 8 44 24" src="https://user-images.githubusercontent.com/87749134/148642885-a8cd4e6a-056c-4da7-a7f6-cbc1022a68fe.png">

↓ 네이버 개발자 센터

<img width="700" alt="스크린샷 2022-01-08 오후 8 44 49" src="https://user-images.githubusercontent.com/87749134/148642887-aa01051a-d68a-487a-ad21-90312928b39b.png">

## 폴더 구조

↓ Client와 Server

<img width="228" alt="스크린샷 2022-01-09 오후 12 49 11" src="https://user-images.githubusercontent.com/87749134/148668639-a95637ee-219c-4a83-b157-641bcb5dbb22.png">  

Client에서 바로 API 통신을 하려고 했더니 CORS Error가 발생했습니다.
이 문제를 해결하기 위해서 SOP와 CORS에 대해서 공부했고 제 Github에 정리해 두었습니다.

- SOP, CORS 내용 정리 : https://github.com/sonicce99/TIL/blob/main/TMI/2021.12.07.md

CRA를 사용한다면 Proxy를 사용하여 간단하게 해결 할 수 있었지만 저는 서버끼리 통신하여 문제를 해결해 보고 싶었습니다. 따라서 Express 모듈을 사용하여 제 서버를 따로 구축했습니다. 그래서 클라이언트에서의 요청을 제 서버가 받아서 네이버 서버와 통신하며 CORS (Cross Origin Resource Sharing) Error 를 해결했습니다.

↓ Client (React)

<img width="228" alt="스크린샷 2022-01-09 오후 12 50 59" src="https://user-images.githubusercontent.com/87749134/148668640-d89b7469-0e66-4cfd-a0b6-e859d4dc65d9.png">  

React에 관해 제가 공부한 내용을 전부 github 에 정리했습니다.

- React 내용 정리 : https://github.com/sonicce99/TIL/blob/main/TMI/2021.11.19.md

Client에 component 하위 폴더로는 cart, history, Home, login, signIn 폴더가 있고 이는 각각 장바구니, 구매내역, 메인페이지, 로그인 페이지, 회원가입 페이지를 렌더링 합니다. 밑으로 App.js를 포함하여 MySQL, Pagenation, Table 파일이 있는데 한가지 아쉬운 점은 컴포넌트 구조를 더 깔끔하게 잡을 수 있을거 같은데 적절한 방법을 제가 잘 모르겠어서 이렇게 표현한 것이 좀 아쉽고 배워서 고쳐야 할 점 같습니다.  

↓ Server (Express)

<img width="228" alt="스크린샷 2022-01-09 오후 12 51 37" src="https://user-images.githubusercontent.com/87749134/148668642-e1e51b5d-a0d8-4593-97c4-0e9e097a6f13.png">

- Express 내용정리 :  https://github.com/sonicce99/TIL/blob/main/CS/2022.01.10.md

처음에는 포트번호를 5000 번으로 설정했었습니다. 잘 동작을 했었는데 Mac을 ```Monterey``` 로 버전 업그레이드를 하고 나서 오류가 났습니다.


↓ 버전 업그레이드를 한 모습  

<img width="586" alt="스크린샷 2022-01-09 오후 1 17 02" src="https://user-images.githubusercontent.com/87749134/148669876-7d1f2149-4acd-4f7a-bc51-2c59f688b655.png">

↓ 5000번으로 설정된 Control Center 가 동작중인 모습  
<img width="652" alt="스크린샷 2022-01-09 오후 1 15 25" src="https://user-images.githubusercontent.com/87749134/148669208-8cd9794f-1f87-4321-87fc-b8c3505a5807.png">  

해당 포트를 계속 Kill을 했는데도 계속 해당 포트를 사용하는 무언가가 동작을 해서 제 서버가 동작 할 수가 없었습니다.
그 이유를 검색하다 보니 ```Monterey``` 에서 *AirPlay* 가 5000번 포트를 사용한다는 것을 알게 되었고 포트번호를 8080번으로 바꿔 문제를 해결했습니다.  


↓ Client에서 port 번호를 8080으로 변경  

<img width="260" alt="스크린샷 2022-01-09 오후 1 09 52" src="https://user-images.githubusercontent.com/87749134/148669079-e5fde4a9-3a63-4fc9-bf2b-cfe12a7f7be0.png">

↓ Express Server에서 port 번호를 8080으로 설정하여 Client와 Connect

<img width="401" alt="스크린샷 2022-01-09 오후 1 10 07" src="https://user-images.githubusercontent.com/87749134/148669080-61047e47-9f5d-40c7-9838-6d279e4176f8.png">


## AWS를 사용하여 Express와 MySQL 연동

저는 프론트엔드 부터 백엔드까지 전반적인 프로세스 과정을 전부 경험해 보고 싶었습니다. 채용 사이트에서 역시 AWS를 많이 사용하고 있다는 것을 알고 있었고, AWS와 MySQL 을 사용하여 사용자가 구매한 물품에 대한 정보를 DB에 저장하고 싶었습니다.

<img width="500" alt="스크린샷 2022-01-12 오전 10 59 24" src="https://user-images.githubusercontent.com/87749134/149051184-d3ed4f43-e0a9-4ba4-aafc-1c0ef7fdac86.png">

- 참고한 유튜브

  1. 동빈나 : https://www.youtube.com/watch?v=G6O-u6FkjpY

  2. 우리밋 : https://www.youtube.com/watch?v=Q4JpUm-cyQw


React는 어느정도 배워서 알고 있었지만 Express와 MySQL에 대해서는 알고 있는 지식이 하나도 없었기 때문에 인터넷, youtube를 뒤져가며 공부했고 제 깃허브에 공부한 내용을 전부 정리했습니다.  

- MySQL 내용정리 :  https://github.com/sonicce99/TIL/blob/main/TMI/2021.12.13.md

↓ 구매 버튼을 클릭하면 MySQL 함수 실행

<img width="500" alt="스크린샷 2022-01-12 오전 11 22 29" src="https://user-images.githubusercontent.com/87749134/149052491-ed35afe2-d4f4-464d-99b6-b4d1bcdf7110.png">

↓ 제품 아이디, 제품명, 최저가 담아서 서버로 전송

<img width="500" alt="스크린샷 2022-01-12 오전 11 22 42" src="https://user-images.githubusercontent.com/87749134/149052495-2d9036f6-a264-4dcc-9fae-2e24af5783cd.png">


이렇게 MySQL에 대해서 공부하고 코드를 짰는데 문제가 발생했습니다.

> MySQL 테이블에 데이터를 넣으려면 Insert 문을 작성해야 되는데 Vscode에서 어떻게 코드를 작성하지??

다시 구글에 검색을 했고 ```MyBatis``` 라는 프레임워크가 있다는 것을 알게되었습니다.

- 참조한 블로그 : https://lts0606.tistory.com/109

node.js 로 MyBatis 구현 하는법에 대해서 검색했고 해당 블로그를 참조하여 다음과 같이 구현했습니다.

↓ mybatisMapper로 query 문을 작성하여 db로 쿼리문을 날린 모습  

<img width="957" alt="스크린샷 2022-01-12 오전 11 36 27" src="https://user-images.githubusercontent.com/87749134/149053830-d5d93177-45c6-44f1-b486-9e1dd36c7498.png">

↓ 내가 원하는 Insert문을 Vscode에 작성한 모습  

<img width="841" alt="스크린샷 2022-01-12 오전 11 36 44" src="https://user-images.githubusercontent.com/87749134/149053838-82ad043e-4fd1-4988-8d84-59038f6d63a3.png">

↓ MySQL에 잘 입력된 모습  

<img width="689" alt="스크린샷 2022-01-12 오전 11 42 52" src="https://user-images.githubusercontent.com/87749134/149054400-9aaef3db-0590-4dd6-83a5-83dbf8423a49.png">

아쉬웠던 점 : 제작기간이 워낙에 짧았던 탓에 더 많은 정보와 Insert 뿐만 아니라 delete, update와 같은 기능들도 넣고 싶었는데 여러가지를 하기 보다 하나를 더 확실하게 배우는데 시간을 쓰자고 생각했기 때문에 여러 기능을 넣지 못한 부분에 대해서는 좀 아쉽다는 생각을 했습니다.

## react-cookies 를 활용한 로그인 유지 및 검증

한번 로그인을 하고나서 사용자가 다른 페이지 주소로 이동할 때 마다 로그인이 유지될 수 있도록 하는 기능이 필요했습니다. 제가 가능하다고 생각했고 고민했던 방식은 2가지 방식이였습니다.

1. SessionStorage를 사용할 것인가?

  - LocalStorage, SessionStorage 내용정리 : https://github.com/sonicce99/TIL/blob/main/TMI/2021.11.11.md

2. react-cookies 를 사용할 것인가?

    - react-cookies 내용정리 : https://github.com/sonicce99/TIL/blob/main/TMI/2021.11.19.md

    - 세션, 토큰, 쿠키, JWT 내용정리 : https://github.com/sonicce99/TIL/blob/main/TMI/2022.01.11.md

이번 프로젝트를 구현하면서 CORS에 대한 문제로 공부하고 있을 때 들었던 유튜브가 있었습니다.

- SOP 관련 Youtube :  https://youtu.be/6QV_JpabO7g

이 영상에서는 SOP에 관한 이해를 돕기 위해 해킹에 관한 언급이 있었습니다. *사용자가 특정 URL 로 접근하면 브라우저는 사용자의 정보가 담긴 cookie 를 담아 해당 서버에 전송* 한다고 했고 해커가 악용하여 사용자에 대한 정보를 빼 낼 수 있다는 내용이였습니다. 이때의 기억으로 저는 ```react-cookies``` 를 사용해 보자고 생각했습니다.

↓ 쿠키를 사용해 아이디, 이름, 비밀번호 저장

<img width="464" alt="스크린샷 2022-01-13 오전 9 39 12" src="https://user-images.githubusercontent.com/87749134/149245264-9f88373b-0263-4e11-bb6f-fbfc2114f017.png">

- 아쉬웠던 점은 비밀번호에 대해서는 단순히 쿠키에 저장하지 않고 다른 방법으로 더욱 보안성을 높이고 싶었는데 시간적 한계, 기술적 한계로 강화하지 못한 점이 아쉬웠습니다.


## 프로젝트를 하면서 느낀점

오늘은 꼭 여기까지 기능(카테고리별 분류, 장바구니)을 구현하자 생각했을 때 처음 시작할 때만 해도 내가 오늘 내로 정말 이걸 구현 할 수 있을까 긴가민가하면서 시작했던적이 많았는데 그날 하루를 마치면서 결국 구현을 해내면 정말 성취감이 있고 기분이 좋았습니다. 물론 다음날 다른 기능을 구현해야한다는 생각이 들기도 했지만 그 순간만큼은 정말 기쁘고 행복했습니다. 이 프로젝트는 분명 제가 더 한단계 발전 할 수 있었던 좋은 프로젝트 였습니다. 감사합니다.  
