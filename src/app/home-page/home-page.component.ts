import { Component, OnInit } from '@angular/core';
import { share } from '../share/interface/share.interface';
import {CommunicationService} from '../share/service/communication.service'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private _communicationService:CommunicationService
  ) { }

  ngOnInit() {
  }

}
