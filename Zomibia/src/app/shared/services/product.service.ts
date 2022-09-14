import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collectionName = 'Products';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage ) { }

  getAll() {
    return this.afs.collection<Product>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Product>(this.collectionName).doc(id).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();

  }
}
