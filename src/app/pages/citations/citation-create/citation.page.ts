import { Component, OnInit } from '@angular/core'
import { ModalController, ToastController } from '@ionic/angular'
import { Citation } from 'src/app/models/Citation'
import { Storage } from '@ionic/storage'
import { CitationsService } from 'src/app/services/citations/citations.service'

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit {
  citation: Citation
  date: Date

  constructor(
    public modalController: ModalController,
    private storage: Storage,
    private citationService: CitationsService,
    public toastController: ToastController,
  ) {}

  async ngOnInit() {
    await this.storage.create()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Seleccione otra hora dentro de los horarios establecidos.',
      duration: 2000,
    })
    toast.present()
  }

  validateDate(date: Date) {
    var myDate = new Date(date)

    let day = myDate.getDay()
    let hour = myDate.getHours()
    if (day == 0) {
      if (hour > 9 && hour < 14) {
        return true
      } else {
        return false
      }
    } else {
      if (hour > 8 && hour < 18) {
        return true
      } else {
        return false
      }
    }
  }

  createCitation() {
    this.storage.get('user').then((val) => {
      this.citation = new Citation()
      this.citation.day = this.date
      this.citation.owner = val.phone
      this.citation.ownername = val.name + ' ' + val.lastName
      this.citation.phone = val.phone
      this.citation.state = true

      var ifValidateDate = this.validateDate(new Date(this.date))
      if (ifValidateDate) {
        this.citationService.create(this.citation).then(() => {
          this.close();
        })
      } else {
        this.presentToast()
      }
    })
  }

  close() {
    this.modalController.dismiss({
      dismissed: true,
    })
  }
}
