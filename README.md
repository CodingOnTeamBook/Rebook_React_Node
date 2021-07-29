# Re:book

// ReadMe To do

최상단 :
- 로고 및 웹사이트 대표 이미지
- 시연 영상(코딩온 영상팀에서 만든거), 
- 배포한 웹사이트 주소

내용 :
- 개요
- 프로젝트 주요 기능
- 페이지별 기능 소개
- 프엔 및 백엔 사용 스택
- 슬랙 줌 디코로 협업 어필
- 팀원 소개


- signup& mypage // 시연 이미지 profileImg 깨져서 아직 첨부 안함.. 내 정보 수정 후 profileImg 깨짐.
# 1. MyPage

### `MyInfo`

- 내 정보 보여주기
- 프로필 사진 업로드, 미리보기
- 프로필 사진 저장 후 filepath, 선호 장르, 자기소개와 함께 내 정보 업로드

### `MyReview`

- 공개된 리뷰 / 비공개 리뷰
- 1페이지에 리뷰 4개씩 새로 받아오도록 구현
- 무한 스크롤 페이지네이션 : 'react-intersection-observer'의 라이브러리를 사용해서 마지막 item에 ref를 참조하여 page를 1씩 증가하여 새로 페이지를 가져오고, 더 이상 가져오는 값이 없을 때 fetchReview를 중지시킨다.

### `LikeReview`

- 사용자가 좋아요 표시한 리뷰 목록 가져오기
- useCheck 커스텀 훅으로 체크 표시의 value값이 변화가 생겼을 때를 useEffect로 탐지하여 UnLike API를 호출한다.

# 2. SignUp
### `KakaoLogin`

- 카카오 oauth 로그인
- react-kakao-login 라이브러리 사용
- 카카오 로그인 후 jwt 로그인 구현
- 가입된 유저가 아닌 경우 /signup페이지로 이동

### `GenreSelect`

- 최소 1개에서 3개 genre 선택 가능
- useCheck로 선택한 value 값 배열로 리턴

### `NicknameCheck`

- DB에 닉네임 중복 체크
- 사용할 수 있는 닉네임일 경우 Input disabled 처리
- useInput 커스텀 훅으로 value 값 관리

### `SignupForm`

- 카카오 로그인에서 useHistory로 state 값을 전송
- 카카오 로그인에서 넘어온 값은 useLocation을 통해 저장
- GenreSelect와 NicknameCheck는 useRef, forwardRef를 통해 값을 전달 후 validation
- signup API로 전송




# 이 밑으로는 샘플
# 풀받아서 확인해보세요
___
# 1. Landing Page
<img src="/client/public/readme_src/LandingPage.gif">

### `Header`
<details>
<summary>👀 이미지 보기</summary>
<div markdown="1">       
<img src="/client/public/readme_src/Header_Login.gif">
</div>
</details>

- 로고 출력
- 리뷰를 볼 수 있는 '리뷰탭'과 리뷰어를 볼 수 있는 '리뷰어탭'
- 로그인 버튼 및 로그인 여부에 따라 바뀌는 헤더, 모달창 구현


### `Carousel`
- react-material의 carousel ui를 이용하여 배너 이미지 출력

### `SearchForm`
<details>
<summary>👀 이미지 보기</summary>
<div markdown="1">       
<img src="/client/public/readme_src/SearchForm.gif">
</div>
</details>

- 도서 또는 유저 검색어를 받고 onSubmit시 search reducer로 dispatch 및 SearchPage로 이동
- SearchForm은 검색 결과는 신경 쓰지 않고 검색어를 전달하는 역할만 수행하도록 구현
- onReset btn으로 검색어를 바로 삭제하는 기능을 구현해 유저 편의 도모
- useInput 커스텀훅 사용을 통해 검색어 state 관리


### `BestSeller`
<details>
<summary>👀 이미지 보기</summary>
<div markdown="1">       
<img src="/client/public/readme_src/BestSeller.gif">
</div>
</details>

- 인터파크 베스트셀러 api를 통해 국내도서 중 베스트셀러 top 5 출력
- 도서 클릭시 해당 도서의 bookDetail page로 이동


### `PopularReview`
- '좋아요' 를 많이 받은 순으로 리뷰 6개 출력
- 해당 리뷰의 '더보기' 클릭시 ReviewDetail Page로 이동
- '더보기' 클릭시 Review Page로 이동


# 2. BookDetailPage

### `BookDetail`
- 알라딘 도서 검색 api를 이용하여 도서 검색 결과를 받아와 출력

### `BookReview`
- 해당 책의 isbn을 params으로 전달하여 해당 책에대한 리뷰를 최신순 및 인기순으로 5개씩 출력
- '더보기' 클릭시 해당 리뷰의 review detail page로 이동

### `ReviewWriteBtn`
- 유저의 로그인 상태 유무를 확인한 뒤, 로그인 상태일시 wirteReview Page로 이동


#Server


###Rebook
http://3.36.99.8/


### API Documentation
(Notion) https://www.notion.so/choiinji/Rebook-API-56245dbde20d44f986ea5b2c28e7364d


### Execute Command
npm run dev


### Technologies
- Javascript(Nodejs)
- Nestjs
- JWT
- MySQL, AWS(EC2, PM2, multer-S3)
- CORS


###Library
- dotenv
- jsonwebtoken
- helmet
- winston


###Model
<img width="818" alt="데이터 모델링" src="https://user-images.githubusercontent.com/82443178/127530411-4215c65c-532f-4f56-a576-ebaab234b1fc.png">


###System Structure
<img width="1017" alt="시스템 구조" src="https://user-images.githubusercontent.com/82443178/127530372-285b1138-630a-458d-bd5c-ae26481a8ea9.png">


###Collaboration Tool
- Git, Github
- Slack
- Discode 






