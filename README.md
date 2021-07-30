# Re:book

<img src="/client/src/style/img/logo.png">

도서를 검색하고, 작성한 리뷰를 다른 유저와 공유할 수 있는 웹사이트

#### 📙 **Deploy** : http://www.rebook-project.site/

#### 🎞 **Video** : https://youtu.be/iQLW2u6962M

#### 👀 **Wiki** : https://github.com/CodingOnTeamBook/Rebook_React_Node/wiki

# 0. Tools & Stack

<img src="/client/public/readme_src/tools.png">
<img src="/client/public/readme_src/fe.png">
<img src="/client/public/readme_src/be.png">

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

# 2. SignUp Page

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

# 3. BookDetail Page

<img src="/client/public/readme_src/BookDetail.gif">

### `BookDetail`

- 알라딘 도서 검색 api를 이용하여 도서 검색 결과를 받아와 출력

### `BookReview`

- 해당 책의 isbn을 params으로 전달하여 해당 책에대한 리뷰를 최신순 및 인기순으로 5개씩 출력
- '더보기' 클릭시 해당 리뷰의 review detail page로 이동

### `ReviewWriteBtn`

<details>
<summary>👀 이미지 보기</summary>
<div markdown="1">       
<img src="/client/public/readme_src/BookDetail-2.gif">
</div>
</details>

- 유저의 로그인 상태 유무를 확인한 뒤, 로그인 상태일시 wirteReview Page로 이동

# 4. WriteReview Page

<img src="/client/public/readme_src/WriteReview.gif">

### `WriteEditor`

- react-quill editor 사용으로 유저 편의 도모

### `TagsInput`

<details>
<summary>👀 이미지 보기</summary>
<div markdown="1">       
<img src="/client/public/readme_src/WriteReview-2.gif">
</div>
</details>

- 도서에 대한 임의의 태그를 입력 할 수 있음
- 엔터 후 태그 스타일링을 통해 UI 향상

### `StarRate`

- 도서에 대한 임의의 별점을 매길 수 있음

### `ToggleBtn`

- 해당 리뷰를 공개글 또는 비공개글로 작성할 수 있음

# 5. Search Page

<img src="/client/public/readme_src/Search.gif">

✔ 도서 검색과 유저 검색이 가능한 페이지
✔ 검색 결과를 redux로 관리

### `SearchForm`

- 랜딩페이지의 컴포넌트 재사용
- react sticky library를 통해 sticky 효과

### `bookInfo`

- 알라딘 api로부터 받은 검색 결과를 Grid item으로 출력
- 해당 책을 클릭하면 bookDetail page로 이동

### `Person`

<details>
<summary>👀 이미지 보기</summary>
<div markdown="1">       
<img src="/client/public/readme_src/Search-2.gif">
</div>
</details>

- 가입한 유저의 닉네임으로 검색
- 해당 유저를 클릭하면 peopleDetail page로 이동

# 6. MyPage

<img src="/client/public/readme_src/MyPage.gif">

### `MyInfo`

- 내 정보 보여주기
- 프로필 사진 업로드, 미리보기
- 프로필 사진 저장 후 filepath, 선호 장르, 자기소개와 함께 내 정보 업로드

### `MyReview`

- 공개된 리뷰 / 비공개 리뷰
- 1페이지에 리뷰 4개씩 새로 받아오도록 구현
- 무한 스크롤 페이지네이션 : 'react-intersection-observer'의 라이브러리를 사용해서 마지막 item에 ref를 참조하여 page를 1씩 증가하여 새로 페이지를 가져오고, 더 이상 가져오는 값이 없을 때 fetchReview를 중지시킴

### `LikeReview`

- 사용자가 좋아요 표시한 리뷰 목록 가져오기
- useCheck 커스텀 훅으로 체크 표시의 value값이 변화가 생겼을 때를 useEffect로 탐지하여 UnLike API를 호출

# 7. Review Page

<img src="/client/public/readme_src/Review_Main.gif">

- 무한 스크롤 페이지네이션 `react-infinite-scroll-component` 라이브러리를 이용하여 스크롤 시 page를 1씩 증가하여 리뷰 출력.
인기순 최신순 되는 이미지 따로
- 최신순 / 인기순으로 `isSelected` state 변경 시 `fetchReviews` 호출 하여 리뷰 출력


### `ReviewItem`
<details>
<summary>👀 이미지 보기</summary>
<div markdown="1">       
<img src="/client/public/readme_src/Review_Item.gif">
</div>
</details>

- 도서 image, 도서명, 리뷰 별점, 리뷰 내용(summary), 리뷰어 닉네임 출력
클릭 시 이동하는거 보여주기
- 리뷰 클리 시 해당 도서의 `Review Detail Page`로 이동


# 8. Review Detail Page

<img src="/client/public/readme_src/Review_Detail_Main.gif">

### `BookInfo`
- 도서 image, 도서 정보 출력
- 도서 image, 도서 제목 클릭 시 해당 도서의 `Book Detail Page`로 이동

### `UserReview`
<details>
<summary>👀 이미지 보기</summary>
<div markdown="1"> 
- 비로그인 사용자
<img src="/client/public/readme_src/Review_Detail_Like_Logout.gif">
- 로그인 사용자 
<img src="/client/public/readme_src/Review_Detail_Like.gif">
</div>
</details>

- 리뷰 작성자 프로필 image, 닉네임, 리뷰 별점, 리뷰 태그, 리뷰 내용(html 출력), 리뷰 작성 시간 출력
좋아요시 사진
- 리뷰 좋아요 기능
  - 비로그인 사용자
  - 로그인 사용자


# 9. People Page

<img src="/client/public/readme_src/Review_Detail_Main.gif">

<details>
<summary>👀 상세 이미지 보기</summary>
<div markdown="1"> 
- 1개 미만 선택
<img src="/client/public/readme_src/Reviewer_Select_One.gif">      
- 1개 이상 3개 이하 선택 
<img src="/client/public/readme_src/Reviewer_Select_Three.gif">
- 3개 초과 선택
<img src="/client/public/readme_src/Reviewer_Three_Alert.gif">
</div>
</details>

- 무한 스크롤 페이지네이션 `react-infinite-scroll-component` 라이브러리를 이용하여 스크롤 시 page를 1씩 증가하여 리뷰 출력.
- 사용자가 선택한 장르 번호로 새로운 배열로 만들어 isSelected에 저장 후 장르 번호 순서 오름차순 정렬하여 state 변경 시 fetchPerson 호출하여 해당 리뷰어 출력
  - 1개 미만 선택
    - 1개 미만으로 변경 시 0번째 순서인 소설 데이터 호출
    `setIsSelected([0]);`
  - 1개 이상 3개 이하 선택
    - `isSelected.sort();`로 장르 번호 순서 오름차순 정렬 후 데이터 출력
  - 3개 초과 선택
    - 4개째 선택하는 장르 번호 `pop` 후, 기존에 출력된 리뷰어 데이터 유지
    `isSelected.pop();` 

### `Person`
<details>
<summary>👀 상세 이미지 보기</summary>
<div markdown="1"> 
<img src="/client/public/readme_src/Reviewer_Person.gif">
</div>
</details>
- 리뷰어 프로필 image, 닉네임, 장르, 자기소개(summary) , 작성 리뷰 수 출력
- 리뷰어 프로필 image 색상에 따라 프로필 background 색상 변경
- 리뷰어 클리 시 <code>People Detail page</code>로 이동


# 10. People Detail Page

<img src="/client/public/readme_src/Reviewer_Detail.gif">

### `Person(컴포넌트 재사용)`
- 리뷰어 profile image, 닉네임, 장르, 자기소개(summary) , 작성 리뷰 수 출력
- 리뷰어 profile image 색상에 따라 프로필 background 색상 변경

### `ReviewItem(컴포넌트 재사용)`
- 해당 리뷰어가 작성한 리뷰 출력
- 도서 image, 도서명, 리뷰 별점, 리뷰 내용(summary), 리뷰어 닉네임 출력
- 리뷰 클릭 시 `Review Detail Page`로 이동

---

# Server

### Rebook

http://3.36.99.8/

### API Documentation

[📌 Notion](https://www.notion.so/choiinji/Rebook-API-56245dbde20d44f986ea5b2c28e7364d)

### Execute Command

npm run dev

### Technologies

- Javascript(Nodejs)
- Nestjs
- JWT
- MySQL, AWS(EC2, PM2, multer-S3)
- CORS

### Library

- dotenv
- jsonwebtoken
- helmet
- winston

### Model

<img width="818" alt="데이터 모델링" src="https://user-images.githubusercontent.com/82443178/127530411-4215c65c-532f-4f56-a576-ebaab234b1fc.png">

### System Structure

<img width="1017" alt="시스템 구조" src="https://user-images.githubusercontent.com/82443178/127530372-285b1138-630a-458d-bd5c-ae26481a8ea9.png">

---

# Team

<img src="/client/public/readme_src/Team.png">

| Frond-End | Back-End |
| :-------: | :------: |
|  차유진   |  주혜미  |
|  이승민   |  최인지  |
|  마주은   |  이예안  |
