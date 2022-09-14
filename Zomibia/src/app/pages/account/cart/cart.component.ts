import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/Cart';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart?: Cart;
  amount?: number;
  products: Array<Product> = [];
  prodLen?: number = 0;

  user?: firebase.default.User;
  termekKep: Array<any> = [];
  kep: any;

  constructor(private cartService: CartService, private productService: ProductService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    const subscription = this.cartService.getById(this.user?.uid).subscribe(data => {
      this.cart = data;
      this.amount = data?.amount;

      if (typeof data === "undefined") {
        this.prodLen = 0;
      } else {
        this.products = data.products;
        this.prodLen = this.products?.length;
      }

      this.loadImage(this.products);


      subscription.unsubscribe();
    })


  }

  loadImage(product: Array<Product> | undefined): void {
    if (typeof product !== 'undefined') {
      for (let t of product) {
        this.productService.loadImage(t.imgUrl).subscribe(data => {
          let paros = [t, data];
          this.termekKep.push(paros);
        })
      }
    }


  }

  delteProduct(p: Product) {

    console.log(this.products.length);

    /*let index = this.products?.findIndex(object => {
      return object.id === p.id;
    });*/

    if (typeof this.products !== "undefined") {
      this.products.forEach((element, index) => {
        console.log(element.id + " = " + p.id)
        if (element == p) {
          this.products.splice(index, 1);
          console.log("index: " + index)
          console.log(this.products.length);
        }
      })
    }

    console.log(this.products.length);

    /*if(typeof this.products !== "undefined"){
      let idenTomb : Array<Product> = this.products;
      console.log(index);
      if (index !== -1) {
        idenTomb.splice(index, 1);
      }
  
    }*/
    console.log("regiar " + this.cart?.amount);
    let amountNew: number = 0;
    if (typeof this.cart !== "undefined") {
      amountNew = this.cart.amount - p.price;
      console.log("ar " + amountNew)
    }

    let cartNew: Cart = {
      userId: this.cart?.userId,
      products: this.products,
      amount: amountNew,
      done: this.cart?.done,
    }

    this.cartService.update(cartNew).then(_ => {
      console.log('Cart update successfully.');
      window.location.reload();
    }).catch(error => {
      console.error(error);
    })
  }

  openSnackBar() {
    this.snackBar.open("A vásárlás sikeres volt.", 'X', {
      duration: 15000,
    });
  }

  order() {
    this.cartService.delete(this.cart?.userId).then(_ => {
      console.log('Cart delete successfully.');

      this.openSnackBar();
      window.location.reload();
    }).catch(error => {
      console.error(error);
    })



  }

}
