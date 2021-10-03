import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: User;

  constructor(private storage: Storage, private router: Router,) {}

  async ngOnInit() {
    this.user = new User();
    await this.storage.create();
    this.storage.get('user').then((val) => {
      this.user = val;
    })
  }

  async close(){
    this.router.navigate(['/login']);
  }

}
