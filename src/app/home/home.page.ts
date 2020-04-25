import { Component } from '@angular/core';
import { Article } from './article';
import { HttpClient } from '@angular/common/http';
import { Shop, PanierElement } from './shop';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Mission } from './mission';
import { ModalController, NavController } from '@ionic/angular';
import { ConfirmPage } from './modal/modal.page';
import { CommandList } from './modal2/modal.page';
import { SuiviCommand } from './modal3/modal.page';
import { Country } from './country';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  env: any;
  isAuth: boolean = false;
  token: string;
  shop : Shop;
  test: number = 0;
  total: number = 0;
  selectedArticles: PanierElement[] = new Array<PanierElement>();
  constructor(private router: Router, private navCtrl: NavController, public modalController: ModalController, private http: HttpClient) {
    this.env = environment;  
  }

  async goCommand(){
    const modal = await this.modalController.create({
      component: SuiviCommand
    });
    await modal.present();   
  }

  calcTotal(){
    this.total = 0;
    for (let key in this.selectedArticles){
      if (this.selectedArticles[key] != undefined){
        var index = this.shop.articles.findIndex(obj => obj.id == this.selectedArticles[key].articleId);
        this.total += this.selectedArticles[key].quantity * this.shop.articles[index].price;
      }
    }
    console.log(this.total);
  }

  auth(token: string){
    this.shop = new Shop();
    this.shop.country = new Country();
    this.token = token;
      this.http.get<Shop>(this.env.api_url+"/shop/" + this.token).subscribe(data=>{
        this.isAuth = true;
        this.shop = data;
        for(let key in this.shop.articles){
          var e = new PanierElement();
          e.articleId = this.shop.articles[key].id;
          e.quantity = 0;
          this.selectedArticles[this.shop.articles[key].id] = e;
        }
      },
      (err) => {
        this.isAuth = false;
      });
  }

  addArticle(id: number){

  var article = this.selectedArticles[id]

  if(!article){
      var element: PanierElement = new PanierElement();
      element.articleId = id;
      element.quantity = 1;
      this.selectedArticles[id] = element;
    }
    else{
      this.selectedArticles[id].quantity += 1;
    }   
    
    this.calcTotal();

  }

  subArticle(id: number){

    var article = this.selectedArticles[id]
  
    if(article && article.quantity > 0){
        this.selectedArticles[id].quantity -= 1;
    }

    this.calcTotal();

  }

  async confirm(){

    const modal = await this.modalController.create({
      component: ConfirmPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'selectedArticles' : this.selectedArticles,
        'token': this.token
      },
    });
    await modal.present();   
    }

    async openCommand(){
      const modal = await this.modalController.create({
        component: CommandList,
        cssClass: 'my-custom-modal-css'
      });
      await modal.present();  
    }
}
