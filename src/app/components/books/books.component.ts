import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books :Book []=[];
  searchText = '';//Define  output property
  @Output() countCart:EventEmitter<number> =new EventEmitter(); 
   
  //Raise the event using the emit method.
  update(countCart) {
    this.countCart.emit(countCart);
  }
  constructor(private bookService:BookService, private cartservice:CartService) { }

  ngOnInit(): void {
    this.getAllBooks()
  }
  getAllBooks(){
    this.bookService.finAll().subscribe(books => this.books=books)
  }
  addTocart(book){
    this.cartservice.addProduct(book)
    this.update(1)
  }

}
