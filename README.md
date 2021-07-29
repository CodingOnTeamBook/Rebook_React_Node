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


