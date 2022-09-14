import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  NegyTermekId: Array<string> = ['tllxONiTx0xAd9H98q3D', 'yCJWSPK4hlQgN585Eet9', '88UD943qDFACxSu6cDcW', 'dmRD61qoREm0FDpE9Csi'];
  termekek: Array<Product> = [];
  termekKep: Array<any> = [];
  kep: any;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

    for (let id of this.NegyTermekId) {
      const subscription = this.productService.getById(id).subscribe(product => {
        if (typeof product !== 'undefined') {
          this.termekek.push(product);
          this.loadImage(product);
        }
        subscription.unsubscribe();
      })
    }

    this.productService.loadImage("Other/z1.png").subscribe(data => {
      this.kep = data;
    })
  }

  loadImage(product: Product): void {
    this.productService.loadImage(product.imgUrl).subscribe(data => {

      let paros = [product, data];
      this.termekKep.push(paros);



    })

  }

  navigacio() {
    this.router.navigateByUrl('/product');
  }

}
