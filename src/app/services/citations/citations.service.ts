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
