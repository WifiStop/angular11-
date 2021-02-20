import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { share } from 'src/app/share/interface/share.interface';
import { CommunicationService } from 'src/app/share/service/communication.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {
  borderColor:string='#000000';
  color:string='#000000';
  backgroundColor:string='#000000';

  data = this._communicationService.currentComponent
  public get componentData():share.componentList{
    return this._communicationService.currentComponent
  }
 
  calculation(){
    this._communicationService.getDotsSeat()
    }
  constructor(
    private _communicationService:CommunicationService

  ) { }

  ngOnInit(): void {
  }

}
