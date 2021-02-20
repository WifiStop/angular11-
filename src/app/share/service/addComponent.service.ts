import { MarkLineComponent } from './../../editor-canvas/componentView/mark-line/mark-line.component';
import { Injectable, Type } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AddComponentService {
  constructor() { }

  getComponent(data:{[key:string]:any}):AdItem{

   return new AdItem(MarkLineComponent, data)
  }
}
export class AdItem {
  constructor(public component: Type<any>, public data: any) { }
}


