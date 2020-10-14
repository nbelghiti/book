import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ReductionService } from 'src/app/services/reduction.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = []
  id: string = ""
  offers: any;
  discounts = []
  discount: any
  bestDiscount: number
  totalPrice: any

  constructor(private cartservice:CartService,private reduction:ReductionService) { }

  ngOnInit(): void {
    this.getCartItems()
  }
  //get the different items of the shopping cart
  getCartItems(){
    this.cartItems = this.cartservice.get()
    this.totalPrice = this.getTotalPrice().price
    this.getDiscounts()
  }

  deleteItem(id){
    this.cartservice.removeItem(id)
    this.getCartItems()
  }
  
  // get total price items 
  getTotalPrice(){
    return this.cartItems.reduce((accumulator, currentValue) => {
      return {price: accumulator.price + currentValue.price}
    })
  }

  // get all id 
  getAllIdsItems(){
    return this.cartItems.reduce((acc, item)=>{
      this.id = this.id.concat(item.isbn + ',')
      return this.id
    }, String)
  }

  // get different offers for discount
  getDiscounts(){
    let ids = this.getAllIdsItems()
    this.reduction.getReduction(ids).subscribe(data=>{
      this.offers = data
      this.chooseBestDiscount()
    })
  }

  // apply promotionals offers and choose the best discount
  chooseBestDiscount(){
    for (let i = 0; i < this.offers.offers.length; i++) {
      const offer = this.offers.offers[i]
      switch (offer.type) {
        case 'percentage':
          this.discounts.push((100 - offer.value) / 100)
          break;
        case 'minus':
          this.discounts.push(offer.value)
          break;
        case'slice':
          this.discounts.push(offer.value * Math.floor( this.totalPrice / offer.sliceValue ))
          break;
      }
    }
    this.setDiscount()
  }

  setDiscount(){
    this.discount = -Math.max(...this.discounts)
    this.totalPrice = this.totalPrice + this.discount
  }
}
