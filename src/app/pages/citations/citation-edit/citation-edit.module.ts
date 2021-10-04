import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitationEditPageRoutingModule } from './citation-edit-routing.module';

import { CitationEditPage } from './citation-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitationEditPageRoutingModule
  ],
  declarations: [CitationEditPage]
})
export class CitationEditPageModule {}
