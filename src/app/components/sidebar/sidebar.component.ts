import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute) { }
    brandId:string="";
    colorId:string="";

  ngOnInit(): void {
  }

  currentBrandId(event: any) {
    this.brandId=event;
  }

  currentColorId(event: any) {
    this.colorId=event;
  }

  setRoute() {
    if (this.brandId && this.colorId){
      this.router.navigate([
        'araclar/marka/'+this.brandId+'/renk/'+this.colorId,
      ]);     
    }
    else if (this.brandId){
      this.router.navigate(['araclar/marka/'+this.brandId]);      
    }
    else if (this.colorId){
      this.router.navigate(['araclar/renk/'+this.colorId]);      
    }
    else{
      this.router.navigate(['araclar/']);
    } 
  }

  clearRoute() {
    this.router.navigate(['araclar/']);
  }

}
