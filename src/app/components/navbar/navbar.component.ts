import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnDestroy {
  cartItems: [];
  countCart: Subscription;

  constructor(private cartservice: CartService) {
    this.getCountCart();
    this.countCart = this.cartservice.getCartCount().subscribe((countCart) => {
      this.cartItems = countCart.length;
      console.log("countCart : ", countCart);
    });
  }
  getCountCart() {
    let count = this.cartservice.get();
    this.cartItems = count.length;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.countCart.unsubscribe();
  }
}
