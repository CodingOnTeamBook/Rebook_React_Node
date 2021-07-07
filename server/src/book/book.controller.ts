import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('/api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  //쿼리? 파라미터?
  @Get('/search/')
  search(@Query() query, @Res() res) {
    return this.bookService.getBooks(query).then((value) => {
      res.status(HttpStatus.OK).json({
        success: true,
        books: value,
      });
    });
  }
}
