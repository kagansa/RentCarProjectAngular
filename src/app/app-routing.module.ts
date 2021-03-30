import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorComponent } from './components/color/color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"araclar",component:CarComponent},
  {path:"araclar/marka/:brandId/renk/:colorId",component:CarComponent},
  {path:"araclar/marka/:brandId",component:CarComponent},
  {path:"araclar/renk/:colorId",component:CarComponent}, 
  {path:"araclar/:carId",component:CarComponent},
  {path:"arac/:carId",component:CardetailComponent},
  

  {path:"renkler",component:ColorListComponent},
  {path:"markalar",component:BrandListComponent},
  {path:"odeme",component:PaymentComponent},

  {path:"kiralamalar",component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
