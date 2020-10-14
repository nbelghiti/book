import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit,OnDestroy {

  id: number;
  private sub: any;
  book:Book;

  constructor(private route: ActivatedRoute, private bookService:BookService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.getBook(this.id)
  }
  
  getBook(id){
    this.bookService.finAll().subscribe(books => {
      this.book=books.find(element => element.isbn === id)
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}