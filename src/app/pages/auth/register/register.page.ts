import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { User } from 'src/app/models/User'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User
  name: string
  lastName: string
  password: string
  phone: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ya existe este telefono registrado.',
      duration: 2000,
    })
    toast.present()
  }

  create() {
    this.user = new User()
    this.user.name = this.name
    this.user.password = this.password
    this.user.lastName = this.lastName
    this.user.phone = this.phone;

    this.authService.getByEmail(this.phone).subscribe((data) => {
      if (data.length == 0) {
        this.authService.create(this.user).then((data) => {
          this.router.navigate(['/login'])
        })
      } else {
        this.presentToast();
      }
    })
  }
}
