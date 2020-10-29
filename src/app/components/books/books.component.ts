import { Component, EventEmitter, NgModule, OnInit } from "@angular/core";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/services/book.service";
import { CartService } from "src/app/services/cart.service";
import { FilterPipe } from "../../filter/filter.pipe";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
@NgModule({
  declarations: [FilterPipe],
  imports: [CommonModule],
  exports: [FilterPipe],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  searchText = "";
  constructor(
    private bookService: BookService,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }
  getAllBooks() {
    this.bookService.finAll().subscribe((books) => (this.books = books));
  }

  addTocart(book) {
    const timeStamp = Math.floor(Date.now() / 1000);
    console.log("timestamp : ", timeStamp);
    this.cartservice.addProduct({ id: timeStamp, ...book });
  }
}
