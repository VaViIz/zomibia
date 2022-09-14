import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Blog } from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  collectionName = 'blog';

  constructor(private afs: AngularFirestore) { }


  getAll() {
    return this.afs.collection<Blog>(this.collectionName).valueChanges();
  }

}
