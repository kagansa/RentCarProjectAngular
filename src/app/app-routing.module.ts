import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"araclar",component:CarComponent},
  {path:"araclar/marka/:brandId",component:CarComponent},
  {path:"araclar/renk/:colorId",component:CarComponent},  
  {path:"araclar/:carId",component:CarComponent},
  {path:"arac/:carId",component:CardetailComponent},
  {path:"kiralamalar",component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
