import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"araclar",component:CarComponent},
  {path:"araclar/marka/:brandId/renk/:colorId",component:CarComponent},
  {path:"araclar/marka/:brandId",component:CarComponent},
  {path:"araclar/renk/:colorId",component:CarComponent}, 
  {path:"araclar/ekle",component:CarAddComponent},
  {path:"araclar/duzenle/:carId",component:CarUpdateComponent},
  {path:"arac/:carId",component:CardetailComponent},
  

  {path:"renkler",component:ColorListComponent},
  {path:"renkler/ekle",component:ColorAddComponent},
  {path:"renkler/duzenle/:colorId",component:ColorUpdateComponent},
  
  {path:"markalar",component:BrandListComponent},
  {path:"markalar/ekle",component:BrandAddComponent},
  {path:"markalar/duzenle/:brandId",component:BrandUpdateComponent},

  {path:"odeme",component:PaymentComponent},

  {path:"kiralamalar",component:RentalComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
