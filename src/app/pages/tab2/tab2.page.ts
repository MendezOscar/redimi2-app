import { Component } from '@angular/core'
import { Citation } from 'src/app/models/Citation'
import { User } from 'src/app/models/User'
import { Storage } from '@ionic/storage'
import { CitationsService } from 'src/app/services/citations/citations.service'
import { ModalController } from '@ionic/angular'
import { CitationPage } from '../citation/citation.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  citations: Citation[]
  user: User

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
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  createCitation(){
    this.presentModal();
  }

  getCitations() {
    this.storage.get('user').then((val) => {
      this.citationService.get(val.phone).subscribe((data) => {
        this.citations = data.map((t) => {
          return {
            id: t.payload.doc.id,
            ...(t.payload.doc.data() as Citation),
          }
        })
      })
    })
  }
}
