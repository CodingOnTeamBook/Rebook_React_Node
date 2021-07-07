import { HttpModule, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [HttpModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
