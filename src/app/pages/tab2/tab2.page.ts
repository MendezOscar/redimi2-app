import { Component } from '@angular/core'
import { Citation } from 'src/app/models/Citation'
import { User } from 'src/app/models/User'
import { Storage } from '@ionic/storage'
import { CitationsService } from 'src/app/services/citations/citations.service'
import { ModalController } from '@ionic/angular'
import { CitationPage } from '../citations/citation-create/citation.page'
import { CitationEditPage } from '../citations/citation-edit/citation-edit.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  citations: Citation[]
  user: User
  userType: string
  date = new Date()

  constructor(
    private citationService: CitationsService,
    public modalController: ModalController,
    private storage: Storage,
  ) {}

  async ngOnInit() {
    await this.storage.create()
    this.getCitations()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CitationPage,
      cssClass: 'my-custom-class',
    })
    return await modal.present()
  }

  async presentModalEdit(citation: Citation) {
    const modal = await this.modalController.create({
      component: CitationEditPage,
      cssClass: 'my-custom-class',
      componentProps: {
        citation: citation,
      },
    })
    return await modal.present()
  }

  editCitation(citation: Citation) {
    this.presentModalEdit(citation)
  }

  createCitation() {
    this.presentModal()
  }

  deleteCitation(id: string) {
    this.citationService.delete(id)
  }

  endCitation(citation: Citation) {
    citation.state = false
    this.citationService.update(citation.id, citation)
  }

  getCitations() {
    this.storage.get('user').then((val) => {
      this.userType = val.userType
      var newDate = new Date(this.date)
      if (val.type == 'client') {
        this.citationService
          .get(
            val.phone,
            newDate.getDate(),
            newDate.getMonth(),
            newDate.getFullYear(),
          )
          .subscribe((data) => {
            this.citations = data.map((t) => {
              return {
                id: t.payload.doc.id,
                ...(t.payload.doc.data() as Citation),
              }
            })
          })
      } else {
        this.citationService
          .getAll(newDate.getDate(), newDate.getMonth(), newDate.getFullYear())
          .subscribe((data) => {
            this.citations = data.map((t) => {
              return {
                id: t.payload.doc.id,
                ...(t.payload.doc.data() as Citation),
              }
            })
          })
      }
    })
  }
}
