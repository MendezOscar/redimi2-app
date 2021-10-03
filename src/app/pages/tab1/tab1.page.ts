import { Component } from '@angular/core'
import { Ads } from 'src/app/models/Ads'
import { Service } from 'src/app/models/Service'
import { AdsService } from 'src/app/services/ads/ads.service'
import { ProductsService } from 'src/app/services/products/products.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  services: Service[]
  ads: Ads[]

  constructor(
    private products: ProductsService,
    private adsService: AdsService,
  ) {}

  ngOnInit() {
    this.getServices();
    this.getAds();
  }

  getServices() {
    this.products.get().subscribe((data) => {
      this.services = data.map((t) => {
        return {
          id: t.payload.doc.id,
          ...(t.payload.doc.data() as Service),
        }
      })
    })
  }

  getAds() {
    this.adsService.get().subscribe((data) => {
      this.ads = data.map((t) => {
        return {
          id: t.payload.doc.id,
          ...(t.payload.doc.data() as Ads),
        }
      })
    })
  }
}
