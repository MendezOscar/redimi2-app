import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { User } from 'src/app/models/User'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.page.html',
  styleUrls: ['./password-recover.page.scss'],
})
export class PasswordRecoverPage implements OnInit {
  enable = false
  users: User[]
  user: User;
  phone: string
  password: string
  newPassword: string

  constructor(private router: Router, private authService: AuthService, public toastController: ToastController,) {}

  ngOnInit() {}

  getByPhone() {
    this.authService.getByPhone(this.phone).subscribe((data) => {
      this.users = data.map((t) => {
        return {
          id: t.payload.doc.id,
          ...(t.payload.doc.data() as User),
        }
      })
      if(this.users[0].phone == this.phone){
        this.user = this.users[0];
        this.enable = true;
      }
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no coinciden.',
      duration: 2000,
    })
    toast.present()
  }

  back(){
    this.router.navigate(['/login']);
  }

  updateUser(){
    if(this.password === this.newPassword){
      this.user.password = this.password;
      this.authService.update(this.user.id, this.user);
      this.router.navigate(['/login']);
    } else {
      this.presentToast();
    }
  }
}
