import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ads } from 'src/app/models/Ads';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  constructor(private ngFirestore: AngularFirestore) {}

  create(object: Ads) {
    return this.ngFirestore.collection('ads').add(Object.assign({}, object))
  }

  get() {
    return this.ngFirestore.collection('ads').snapshotChanges();
  }
}
