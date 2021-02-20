import { Component, OnInit,ViewChild } from '@angular/core';
import list from './componentDataList'
import {CommunicationService} from '../share/service/communication.service'
import { share } from '../share/interface/share.interface';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {
  componentList:share.componentList[]=list
  constructor(
    private _communicationService:CommunicationService,
   
    
  ) { }

  ngOnInit(): void {
  }
  dragstart(event:any,component:share.componentList){
    event.dataTransfer.setData('componentData', JSON.stringify(component))
  }
}
