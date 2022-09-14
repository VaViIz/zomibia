import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  collectionName = 'Carts';

  constructor(private afs: AngularFirestore) { }

  create(cart: Cart) {
    return this.afs.collection<Cart>(this.collectionName).doc(cart.userId).set(cart);
  }

  getById(id?: string) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).valueChanges();
  }

  update(cart: Cart) {
    return this.afs.collection<Cart>(this.collectionName).doc(cart.userId).set(cart);
  }

  delete(id: string | undefined) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).delete();
  }

}
