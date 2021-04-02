import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors: Color[] = [];
  dataLoaded = false;
  filterText="";
  constructor(private colorService:ColorService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth();
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = response.success;
    });
  }

  isAuth(){
    if (this.authService.isAuthenticated()) {
      this.authService.userDetailFromToken();
    }
  }

}
