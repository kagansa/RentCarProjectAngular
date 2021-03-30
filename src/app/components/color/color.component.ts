import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[]=[];
  selectedColor :Color;
  allColor:Color;
  @Output() colorId = new EventEmitter<string>();

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColor();
  }

  getColor(){
    this.colorService.getColors().subscribe((response) => { this.colors = response.data; });
  }

  setCurrentColor(){    
    this.colorId.emit(this.selectedColor?.id.toString());
  } 

  allColorSelected(){
    return this.selectedColor == undefined ? true : false;
  } 

}
