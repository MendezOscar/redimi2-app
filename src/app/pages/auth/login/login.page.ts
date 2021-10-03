import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { User } from 'src/app/models/User'
import { AuthService } from 'src/app/services/auth/auth.service'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phone: string
  password: string
  user: User[];

  constructor(
    private router: Router,
    private storage: Storage,
    private authService: AuthService,
    public toastController: ToastController,
  ) {}

  async ngOnInit() {await this.storage.create();}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Credenciales invalidas.',
      duration: 2000,
    })
    toast.present()
  }

  login() {
    this.authService.getByLogin(this.phone, this.password).subscribe((data) => {
      if (data.length > 0) {
        this.user = data.map((t) => {
          return {
            id: t.payload.doc.id,
            ...(t.payload.doc.data() as User),
          };
        });
        this.storage.set('user', this.user[0]);
        this.router.navigate(['/home/tabs/tab1'])
      } else {
        this.presentToast();
      }
    })
  }
}
