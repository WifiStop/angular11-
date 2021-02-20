import { share } from 'src/app/share/interface/share.interface';
import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../share/service/communication.service'
@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.scss']
})
export class PropertiesPanelComponent implements OnInit {

  constructor(
    private _communicationService:CommunicationService
  ) { }

  ngOnInit(): void {
  }

}
