import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/Service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private ngFirestore: AngularFirestore, private router: Router) {}

  create(object: Service) {
    return this.ngFirestore.collection('services').add(Object.assign({}, object))
  }

  get() {
    return this.ngFirestore.collection('services').snapshotChanges();
  }
}
