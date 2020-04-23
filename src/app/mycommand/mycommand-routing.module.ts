import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycommandPage } from './mycommand.page';

const routes: Routes = [
  {
    path: '',
    component: MycommandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycommandPageRoutingModule {}
