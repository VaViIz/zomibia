
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { type } from 'os';
import { ThisReceiver } from '@angular/compiler';
import { isEmpty } from '@firebase/util';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {



  cartProductList?: Array<Product> = [];

  products: Array<Product> = [];
  kepek2: Array<any> = [];
  kepek?: [Product, any];

  osszeg: number = 0;

  user?: firebase.default.User;




  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    console.log("valami: " + this.user?.uid)

    this.productService.getAll().subscribe(products => {
      this.products = products;
      //console.log(this.products);
      this.toltes(this.products);

    })



    if (this.user !== null) {

      const cart: Cart = {
        userId: this.user?.uid,
        products: [],
        amount: 0,
        done: false
      }

      this.cartService.getById(this.user?.uid).subscribe(data => {
        if (typeof data === 'undefined') {
          this.cartService.create(cart).then(_ => {
            console.log('Cart create successfully.');
          }).catch(error => {
            console.error(error);
          })
        }
      })
    }

  }

  loadImage(product: Product): void {
    this.productService.loadImage(product.imgUrl).subscribe(data => {
      //console.log("kep: " + data);
      this.kepek = [product, data];
      this.kepek2.push(this.kepek);
      //console.log(this.kepek2);


    })

  }

  toltes(product: Array<Product>) {
    for (let p of product) {
      //console.log("purl: " + p.imgUrl);
      this.loadImage(p);
      //console.log(this.kepek);    
    }
  }




  oldProductData?: any;

  addToCart(product: Product) {
    if (this.user !== null) {

      const subscription = this.cartService.getById(this.user?.uid).subscribe(data => {
        console.log(data);
        this.oldProductData = data;
        if (typeof this.oldProductData !== "undefined") {
          this.update(this.oldProductData, product);
        }
        subscription.unsubscribe();
        this.openSnackBar(product.name);
      })
    } else {
      console.log("nem vagy bejelentekzve");
      this.router.navigateByUrl('/login');
    }
  }

  update(data: Cart, product: Product) {
    data?.products?.push(product)
    this.osszeg = data.amount;
    this.osszeg += product.price;

    const cart: Cart = {
      userId: this.user?.uid,
      products: data.products,
      amount: this.osszeg,
      done: false
    }

    this.cartService.update(cart).then(_ => {
      console.log('Cart update successfully.');
    }).catch(error => {
      console.error(error);
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message + " a kosárba került.", 'X', {
      duration: 3000,
    });
  }

}
