import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  products = [];
  cartCount = new Subject<any>();
  localStorage: Storage;
  constructor() {
    this.localStorage = window.localStorage;
  }
  getCartCount(): Observable<any> {
    return this.cartCount.asObservable();
  }

  get() {
    if (this.isLocalStorageSupported) {
      return this.localStorage.getItem("cartBook") === null
        ? []
        : JSON.parse(this.localStorage.getItem("cartBook"));
    }
    return null;
  }
  addProduct(book: any) {
    if (localStorage.getItem("cartBook")) {
      this.products = JSON.parse(localStorage.getItem("cartBook"));
    }
    this.products.push(book);
    localStorage.setItem("cartBook", JSON.stringify(this.products));
    this.cartCount.next(this.get());
  }
  removeItem(id) {
    let storageItems = JSON.parse(localStorage.getItem("cartBook"));
    let booksCart = storageItems.filter((product) => product.id !== id);
    localStorage.setItem("cartBook", JSON.stringify(booksCart));
    this.cartCount.next(this.get());
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
