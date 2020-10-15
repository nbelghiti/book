import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "../models/book";

@Injectable({
  providedIn: "root",
})
export class BookService {
  url = "http://henri-potier.xebia.fr/books";

  constructor(private http: HttpClient) {}

  finAll() {
    return this.http.get<Book[]>(this.url);
  }
}
