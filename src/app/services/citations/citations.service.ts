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

  get(owner: string, day: number, month: number, year: number) {
    return this.ngFirestore
      .collection('citations', (ref) => ref.where('state', '==', true)
      .where('owner', '==', owner)
      .where('dayOfWeek', '==', day)
      .where('month', '==', month)
      .where('year', '==', year))
      .snapshotChanges()
  }

  getAll(day: number, month: number, year: number) {
    return this.ngFirestore
      .collection('citations', (ref) => ref.where('state', '==', true)
      .where('dayOfWeek', '==', day)
      .where('month', '==', month)
      .where('year', '==', year))
      .snapshotChanges()
  }

  getDisable(owner: string, day: number, month: number, year: number) {
    return this.ngFirestore
      .collection('citations', (ref) => ref.where('state', '==', false)
      .where('owner', '==', owner)
      .where('dayOfWeek', '==', day)
      .where('month', '==', month)
      .where('year', '==', year))
      .snapshotChanges()
  }

  getAllDisable(day: number, month: number, year: number) {
    return this.ngFirestore
      .collection('citations', (ref) => ref.where('state', '==', false)
      .where('dayOfWeek', '==', day)
      .where('month', '==', month)
      .where('year', '==', year))
      .snapshotChanges()
  }

  delete(id: string) {
    this.ngFirestore.doc('citations/' + id).delete();
  }

  update(id, object: Citation) {
    this.ngFirestore
      .collection('citations')
      .doc(id)
      .update(object)
      .then(() => {
        //this.router.navigate(['/members-list']);
      })
      .catch((error) => console.log(error));
  }
}
