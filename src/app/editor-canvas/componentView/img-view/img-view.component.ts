import { Component, Renderer2,ComponentFactoryResolver,ElementRef } from '@angular/core';
import {domUtil} from '../component-util/util'
import {CommunicationService} from '../../../share/service/communication.service'
import { AddComponentService } from './../../../share/service/addComponent.service';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.scss']
})
export class ImgViewComponent extends domUtil {

  constructor(protected _communicationService:CommunicationService,
    protected _addComponentService:AddComponentService,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected renderer:Renderer2,
    protected elRef: ElementRef

    ) {
    super(_communicationService,_addComponentService,_componentFactoryResolver,renderer,elRef)
   }



}
