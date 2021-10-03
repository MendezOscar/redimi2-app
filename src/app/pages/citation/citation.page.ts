import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { Citation } from 'src/app/models/Citation'
import { Storage } from '@ionic/storage'
import { CitationsService } from 'src/app/services/citations/citations.service'

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit {
  citation: Citation;
  date: Date;

  constructor(
    public modalController: ModalController,
    private storage: Storage,
    private citationService: CitationsService,
  ) {}

  async ngOnInit() {
    await this.storage.create()
  }


  createCitation() {
    this.storage.get('user').then((val) => {
      console.log(val);
      this.citation = new Citation;
      this.citation.day = this.date;
      this.citation.owner = val.phone;
      this.citation.ownername = val.name + ' ' + val.lastName;
      this.citation.phone = val.phone;
      this.citation.state = true;
      this.citationService.create(this.citation).then(() => {
        this.close();
      })
    })
  }

  close() {
    this.modalController.dismiss({
      dismissed: true,
    })
  }
}
