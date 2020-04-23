import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'shop/:token', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'mycommand/:token',
    loadChildren: () => import('./mycommand/mycommand.module').then( m => m.MycommandPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
