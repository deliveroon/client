import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ModalController, ToastController, NavController} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Mission } from '../mission';
import { PanierElement } from '../shop';
import { SuiviCommand } from '../modal3/modal.page';


@Component({
  selector: 'modal-page3',
  templateUrl: './modal.page.html',
})
export class ConfirmPage {

  env: any;
  selectedArticles: PanierElement[] = new Array<PanierElement>();
  token: string;
  nom: string = "";
  addr: string = "";
  codepost: string = "";
  portable: string = "";


  constructor(private modalController: ModalController, private navCtrl: NavController,navParams: NavParams,private router: Router, private toastController: ToastController, private modalCtrl : ModalController, private http: HttpClient) {
    this.token = navParams.get('token');
    this.selectedArticles = navParams.get('selectedArticles');
    this.env = environment;
  }

  change(event){
    this.nom = event.target.value;
  }
  changeaddr(event){
    this.addr = event.target.value;
  }
  changecode(event){
    this.codepost = event.target.value;
  }
  changeportable(event){
    this.portable = event.target.value;
  }

  async confirm(){
    
    navigator.geolocation.getCurrentPosition((pos)=>{
      var mission = {
        name: this.nom,
        numero: this.portable,
        adresse: this.addr,
        postale: this.codepost,
        gps: "ll="+pos.coords.longitude+"%2C"+pos.coords.latitude ,
        statut : 1,
      }
      this.http.post<Mission>(this.env.api_url+"/mission/"+this.token, mission).subscribe(async (data) => {
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

          alert("Votre commande a été prise en compte voici votre numero de commande à enregistrer : " + data.token)
          const modal = await this.modalController.create({
            component: SuiviCommand,
            componentProps: {
              'token': data.token
            },
          });
          await modal.present();   
               
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