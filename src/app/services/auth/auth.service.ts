import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { User } from 'src/app/models/User'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private ngFirestore: AngularFirestore, private router: Router) {}

  create(object: User) {
    return this.ngFirestore.collection('users').add(Object.assign({}, object))
  }

  getByLogin(email: string, password: string) {
    return this.ngFirestore
      .collection('users', (ref) =>
        ref.where('phone', '==', email).where('password', '==', password),
      )
      .snapshotChanges()
  }

  getByPhone(phone: string) {
    return this.ngFirestore
      .collection('users', (ref) =>
        ref.where('phone', '==', phone),
      )
      .snapshotChanges()
  }

  getByEmail(phone: string) {
    return this.ngFirestore
      .collection('users', (ref) => ref.where('phone', '==', phone))
      .snapshotChanges()
  }

  update(id, object: User) {
    this.ngFirestore
      .collection('users')
      .doc(id)
      .update(object)
      .then(() => {
      })
      .catch((error) => console.log(error))
  }

  delete(id: string) {
    this.ngFirestore.doc('users/' + id).delete()
  }
}
