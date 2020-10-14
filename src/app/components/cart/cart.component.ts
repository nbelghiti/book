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
  id:string=""
  offers: any;
  discounts=[]
  discount:any
  bestDiscount:number
  totalPrice: any;
  constructor(private cartservice:CartService,private reduction:ReductionService) { }

  ngOnInit(): void {
    this.getCartItems()
  }
  getCartItems(){
    this.cartItems = this.cartservice.get()
    this.totalPrice = this.getTotalPrice().price
    this.getDiscount()
  }
  retirer(data){
    this.cartservice.removeItem(data.isbn)
    this.getCartItems()
  }
  getTotalPrice(){
    return this.cartItems.reduce((accumulator, currentValue) => {
      return {price: accumulator.price + currentValue.price}
    })
  }
  getAllIdsItems(){
    return this.cartItems.reduce((acc, item)=>{
      this.id = this.id.concat(item.isbn+',');
      return this.id
    },String)
  }
  getDiscount(){
    let ids = this.getAllIdsItems()
    this.reduction.getReduction(ids).subscribe(data=>{
      this.offers = data
      this.calculeBestDiscount()
    })
  }
  calculeBestDiscount(){
    for (let i = 0; i < this.offers.offers.length; i++) {
      const element = this.offers.offers[i];
        switch (element.type) {
          case 'percentage':
            this.discounts.push((100 - element.value) / 100)
            break;
          case 'minus':
            this.discounts.push(element.value)
            break;
          case'slice':
            this.discounts.push(element.value * Math.floor( this.totalPrice / element.sliceValue ))
            break;
        }
    }
    console.log('discount',this.discounts)
    this.setDiscount()
  }

  setDiscount(){
    this.discount = -Math.max(...this.discounts)
    this.totalPrice = this.totalPrice + this.discount
  }
}
