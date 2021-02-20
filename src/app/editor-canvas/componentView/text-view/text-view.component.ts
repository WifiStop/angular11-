import { Component, Renderer2,ComponentFactoryResolver,ElementRef } from '@angular/core';
import {domUtil} from '../component-util/util'
import {CommunicationService} from '../../../share/service/communication.service'
import { AddComponentService } from './../../../share/service/addComponent.service';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.scss']
})
export class TextViewComponent extends domUtil  {
  constructor(protected _communicationService:CommunicationService,
    protected _addComponentService:AddComponentService,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected renderer:Renderer2,
    protected elRef: ElementRef

    ) {
    super(_communicationService,_addComponentService,_componentFactoryResolver,renderer,elRef)
   }

}
