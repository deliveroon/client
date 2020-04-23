import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycommandPageRoutingModule } from './mycommand-routing.module';

import { MycommandPage } from './mycommand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycommandPageRoutingModule
  ],
  declarations: [MycommandPage]
})
export class MycommandPageModule {}
