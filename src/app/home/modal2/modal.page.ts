import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ModalController, ToastController, NavController} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Mission } from '../mission';
import { PanierElement } from '../shop';

@Component({
  selector: 'modal-page3',
  templateUrl: './modal.page.html',
})
export class CommandList {

  env: any;
  tokens: string[];

  constructor(private navCtrl: NavController,navParams: NavParams,private router: Router, private toastController: ToastController, private modalCtrl : ModalController, private http: HttpClient) {
    this.env = environment;
    this.tokens = localStorage.getItem('tokens').split(';');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}