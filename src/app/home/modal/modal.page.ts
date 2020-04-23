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
export class ConfirmPage {

  env: any;
  selectedArticles: PanierElement[] = new Array<PanierElement>();
  token: string;
  nom: string = "";

  constructor( private navCtrl: NavController,navParams: NavParams,private router: Router, private toastController: ToastController, private modalCtrl : ModalController, private http: HttpClient) {
    this.token = navParams.get('token');
    this.selectedArticles = navParams.get('selectedArticles');
    this.env = environment;
  }

  change(event){
    this.nom = event.target.value;
  }

  confirm(){
    
    navigator.geolocation.getCurrentPosition((pos)=>{
      var mission = {
        name: this.nom,
        gps: "ll="+pos.coords.longitude+"%2C"+pos.coords.latitude ,
        statut : 1,
      }
      this.http.post<Mission>(this.env.api_url+"/mission/"+this.token, mission).subscribe((data) => {
        console.log(data)  
        for(let key in this.selectedArticles){
            var body= {
              mission: data.id,
              article: this.selectedArticles[key].articleId,
              quantity: this.selectedArticles[key].quantity
            };
            if(body.quantity > 0){
              this.http.post(this.env.api_url+"/mission/article/"+this.token, body).subscribe( (data2) => {
                
              },
              (err) => {
                console.log(err.error.message);
                
              }); 
            }       
          }

          localStorage.setItem('tokens', localStorage.getItem('tokens') + ';' + data.token)
          window.location.href = "/mycommand/" + data.token;
               
        },
        (err) => {   
          console.log(err.error.message);

        });
      });  
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}