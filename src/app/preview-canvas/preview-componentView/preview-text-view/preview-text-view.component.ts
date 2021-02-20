import { Component, Renderer2,ComponentFactoryResolver,ElementRef } from '@angular/core';
import {PreviewDomUtil} from '../preview-component-util/preview-util'
import {CommunicationService} from '../../../share/service/communication.service'
import { AddComponentService } from '../../../share/service/addComponent.service';

@Component({
  selector: 'app-preview-text-view',
  templateUrl: './preview-text-view.component.html',
  styleUrls: ['./preview-text-view.component.scss']
})
export class PreviewTextViewComponent extends PreviewDomUtil  {
  constructor(protected _communicationService:CommunicationService,
    protected _addComponentService:AddComponentService,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected renderer:Renderer2,
    protected elRef: ElementRef

    ) {
    super(_communicationService,_addComponentService,_componentFactoryResolver,renderer,elRef)
   }

}
