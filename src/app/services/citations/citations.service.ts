import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Citation } from 'src/app/models/Citation'

@Injectable({
  providedIn: 'root',
})
export class CitationsService {
  constructor(private ngFirestore: AngularFirestore) {}

  create(object: Citation) {
    return this.ngFirestore
      .collection('citations')
      .add(Object.assign({}, object))
  }

  get(owner: string) {
    return this.ngFirestore
      .collection('citations', (ref) => ref.where('state', '==', true).where('owner', '==', owner))
      .snapshotChanges()
  }
}
