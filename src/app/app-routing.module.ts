import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'homePage', pathMatch: 'prefix' },
  {path:'homePage',loadChildren:() => import('./home-page/home-page.module').then(m => m.HomePageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
