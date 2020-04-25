import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ModalController, ToastController, NavController} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Mission } from '../mission';
import { PanierElement } from '../shop';
import { Loca } from 'src/app/mycommand/loca';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { MissionClient } from 'src/app/mycommand/statut';

@Component({
  selector: 'modal-page3',
  templateUrl: './modal.page.html',
})
export class SuiviCommand {

  env: any;
  map: mapboxgl.Map;
  style: string = 'mapbox://styles/mapbox/streets-v11';
  lat: number;
  lng: number;
  statut: number;
  token: string;
  isAuth: boolean = false;

  client: any;
  livreur: any = new mapboxgl.Marker({
    color: "red"
  });


  constructor(navParams: NavParams, private modalCtrl: ModalController, private http: HttpClient, private router: Router) { 
    this.env = environment;
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlcnlmb3UiLCJhIjoiY2s5YzB2Y2MwMDA0ejNsbWtjczNhbmMwbSJ9.2JDow1e36gCHUqY7FjaL-Q';
    if(navParams.get('token') != undefined){
      this.token = navParams.get('token');
      this.auth();
    }
  }

  ngOnInit() {
    
    
  }

  change(event){
    this.token = event.target.value;
  }

  auth(){
    this.isAuth = true;
    this.buildMap();
    this.refreshData();
    setInterval(() => { 
      this.refreshData();
   }, 1000);
  }
  buildMap(){
    navigator.geolocation.getCurrentPosition((pos)=>{
      this.lat= pos.coords.latitude;
      this.lng= pos.coords.longitude;

      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 9,
        center:[ this.lng, this.lat]
        });
        this.client = new mapboxgl.Marker()
        .setLngLat([this.lng, this.lat])
        .addTo(this.map);
    });
        
  }

  getStatut(){
      this.http.get<MissionClient>(this.env.api_url+'/mission/'+ this.token)
      .subscribe( (data) => {
        this.statut = data.statut.id
      },
      (err) => {

      });
      

  }

  calcCenter(lng, lat){
   /* var x =  Math.cos(this.lat)*Math.cos(this.lng) + Math.cos(lat)*Math.cos(lng);
    var y = Math.cos(this.lat)*Math.sin(this.lng) + Math.cos(lat)*Math.sin(lng);
    var z = Math.sin(this.lat)+Math.sin(lat);
    var N = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
    var newLat = Math.asin(z/N);
    var newLng;
    if( x>= 0){
      newLng = Math.asin(y/(N*Math.cos(Math.asin(z/N))));
    }
    else{
      newLng = Math.sign(y) * (Math.PI - (Math.asin(Math.abs(y)/(N*Math.cos(Math.asin(z/N))))));
    }*/

    this.map.setCenter([lng, lat]);

  }

  getLocation(){
      this.http.get<Loca>(this.env.api_url+'/location/'+ this.token)
      .subscribe( (data) => {
        if(data != undefined){
          this.livreur
        .setLngLat([data.longitude, data.latitude])
        .addTo(this.map);       
        }
      },
      (err) => {

      });
      
  }

  refreshData(){
    this.getStatut();
    if(this.statut == 2){
      this.getLocation();
    }   
  }

  goHome(){
    this.router.navigate(['/']);
  }
  reload(){
    window.location.reload();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}