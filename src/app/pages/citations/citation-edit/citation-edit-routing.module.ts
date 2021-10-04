import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitationEditPage } from './citation-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CitationEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitationEditPageRoutingModule {}
