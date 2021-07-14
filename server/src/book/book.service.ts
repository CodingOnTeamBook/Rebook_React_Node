import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(private httpService: HttpService) {}

  async getBooks(query): Promise<any> {
    //일단 간단하게 제목만..
    //구체적인건 알라딘 Open API매뉴얼 보고 정하면 될 것 같슴돠

    // 🧡 커버이미지 화질 구지 때문에 검색조건에 Cover=Big 추가했어영🧡 (by 유진)
    const title = encodeURI(query.title);
    const start = query.page; //검색결과 시작페이지
    const maxReults = 10; //검색결과 한페이지당 최대 출력 개수(임의)
    const reponse = await this.httpService
      .get(
        `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbs20141232s1815001&Query=${title}&QueryType=Title&MaxResults=${maxReults}&start=${start}&SearchTarget=Book&Cover=Big&output=js&Version=20131101`
      )
      .toPromise();

    return reponse.data;
  }
}
