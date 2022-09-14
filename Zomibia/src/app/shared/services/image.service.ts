import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { ProfilePicture } from '../models/ProfilePicture';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  collectionName = 'ProfilePictures';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }


  /*
  create(ProfileP : ProfilePicture){
    return this.afs.collection<ProfilePicture>(this.collectionName).doc(ProfileP.id).set(ProfileP);
  }

  getById(id: string) {
    return this.afs.collection<ProfilePicture>(this.collectionName).doc(id).valueChanges();
  }

  uploadProfilePicture(filePath: any, userId : string){
    this.storage.upload( '/ProfilePictures/' +userId +'.jpg',filePath);
  }

  retrieveProfilePicture(imageUrl: any){
    return this.storage.ref(imageUrl).getDownloadURL();
  }
  */

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();

  }


}
