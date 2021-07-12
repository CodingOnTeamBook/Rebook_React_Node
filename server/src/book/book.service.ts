import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(private httpService: HttpService) {}

  async getBooks(query): Promise<any> {
    //일단 간단하게 제목만..
    //구체적인건 알라딘 Open API매뉴얼 보고 정하면 될 것 같슴돠
    const title = encodeURI(query.title);
    const start = 1; //검색결과 시작페이지
    const maxReults = 10; //검색결과 한페이지당 최대 출력 개수(임의)
    const reponse = await this.httpService
      .get(
        `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbs20141232s1815001&Query=${title}&QueryType=Title&MaxResults=${maxReults}&start=${start}&SearchTarget=Book&output=js&Version=20131101`
      )
      .toPromise();

    return reponse.data;
  }

  async getBestSeller(): Promise<any> {
    const response = await this.httpService
      .get(
        `http://book.interpark.com/api/bestSeller.api?key=4F5F52E3F9AE0A4CB75F9CEBA00D237D749C0B85EB5DE447D2CAF90018ED592F&categoryId=100&output=json`
      )
      .toPromise();
    const processedData = [];
    for (let i = 0; i < 5; i++) {
      processedData[i] = {
        title: response.data.item[i].title,
        isbn: response.data.item[i].isbn,
        coverLargeUrl: response.data.item[i].coverLargeUrl,
      };
    }
    return processedData;
  }
}
/*
{
  "title":"베스트셀러",
  "link":"http://book.interpark.com",
  "language":"ko",
  "copyright":"Copyright ⓒ 2009 INTERPARK INT All rights reserved.",
  "pubDate":"11 Jul 2021 22:30:03 GMT",
  "imageUrl":"http://bimage.interpark.com/renewPark/topGnb/logo.jpg",
  "totalResults":30,
  "startIndex":1,
  "itemsPerPage":30,
  "maxResults":30,
  "queryType":"",
  "searchCategoryId":"100",
  "searchCategoryName":"국내도서",
  "returnCode":"000",
  "returnMessage":"정상",
  "item":
  [
    {
      "itemId":350353111,
      "title":"완전한 행복",
      "description":"다시, 정유정!자기애의 늪에 빠진 삶은 얼마나 위태로운가,압도적 서사 위 정교하고 서늘한 공포  우리가 기다린 바로 그, 정유정!《내 인생의 스프링 캠프》 《내 심장을 쏴라》 《7년의 밤》 《28》 《종의 기원》 《진이, 지니》. 발표하는 작품마다 독자들의 열광적인 지지를 받으며 한국문학의 대체불가한 작가로 자리매김한 정유정이 신작 《완전한 행복》으로 돌아왔다. 500여 쪽을 꽉 채운 압도적인 서사와 적재적소를 타격하는 속도감 있는 문장, 치밀하고 정교하게 쌓아올린 플롯과 독자의 눈에 작열하는 생생한 묘사로 정유정만의 스타일을 가감 없이 보여주는 한편, 더 완숙해진 서스펜스와 인간의 심연에 대한 밀도 높은 질문으로 가득 찬 수작이다.  《완전한 행복》은 버스도 다니지 않는 버려진 시골집에서 늪에 사는 오리들...",
      "pubDate":"20210608",
      "priceStandard":15800,
      "priceSales":14220,
      "discountRate":"10",
      "saleStatus":"판매중",
      "mileage":"790",
      "mileageRate":"6",
      "coverSmallUrl":"http://bimage.interpark.com/goods_image/3/1/1/1/350353111h.jpg",
      "coverLargeUrl":"http://bimage.interpark.com/goods_image/3/1/1/1/350353111s.jpg",
      "categoryId":"101",
      "categoryName":"국내도서",
      "publisher":"은행나무",
      "customerReviewRank":9.8,
      "author":"정유정",
      "translator":"",
      "isbn":"9791167370280",
      "link":"http://book.interpark.com/blog/integration/product/itemDetail.rdo?prdNo=350353111&refererType=8305",
      "mobileLink":"http://m.book.interpark.com/view.html?PRD_NO=350353111&SHOP_NO=0000400000",
      "additionalLink":"http://book.interpark.com/gate/ippgw.jsp?goods_no=350353111&biz_cd=",
      "reviewCount":6,
      "rank":1
    }*/
