import { Component, Input, OnInit } from '@angular/core'
import { ModalController, ToastController } from '@ionic/angular'
import { Citation } from 'src/app/models/Citation'
import { CitationsService } from 'src/app/services/citations/citations.service'

@Component({
  selector: 'app-citation-edit',
  templateUrl: './citation-edit.page.html',
  styleUrls: ['./citation-edit.page.scss'],
})
export class CitationEditPage implements OnInit {
  @Input() citation: Citation
  date: Date

  constructor(
    public modalController: ModalController,
    private citationService: CitationsService,
    public toastController: ToastController,
  ) {}

  async ngOnInit() {
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
    this.citation.day = this.date;
    var newDate = new Date(this.date);
    this.citation.dayOfWeek = newDate.getDate();
    this.citation.month = newDate.getMonth();
    this.citation.year = newDate.getFullYear();
    var ifValidateDate = this.validateDate(new Date(this.date))
    if (ifValidateDate) {
      this.citationService.update(this.citation.id, this.citation);
      this.close();
    } else {
      this.presentToast()
    }
  }

  close() {
    this.modalController.dismiss({
      dismissed: true,
    })
  }
}
