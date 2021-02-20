import { AddComponentService } from '../../../share/service/addComponent.service';
import { Input, Output, EventEmitter, ComponentFactoryResolver, Renderer2, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core'
import { Component } from '@angular/core'
import * as _ from 'lodash';
import { CommunicationService } from '../../../share/service/communication.service'
import { share } from 'src/app/share/interface/share.interface';
import { AdComponent } from 'src/app/editor-canvas/addComponent';

@Component({
  template: ``,

})
export class PreviewDomUtil implements AdComponent,OnInit, OnDestroy {
  @Input() data!: share.componentList;

  constructor(
    protected _communicationService: CommunicationService,
    protected _addComponentService: AddComponentService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected elRef: ElementRef
  ) {

  }
  
  ngOnDestroy(): void {
   
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.previewAnimations()
  }
 async  previewAnimations(){
    let element = this.elRef.nativeElement.firstElementChild
   this._communicationService.playAnimation(element,this.data.animations,this.renderer)
  }
  getShapeStyle(style: any) {
    const result = { ...style }
    if (result.width) {
      result.width += 'px'
    }

    if (result.height) {
      result.height += 'px'
    }

    if (result.top) {
      result.top += 'px'
    }

    if (result.left) {
      result.left += 'px'
    }
    if (result['font-size']) {
      result['font-size'] += 'px'
    }
    if (result.rotate) {
      result.transform = 'rotate(' + result.rotate + 'deg)'
    }
   
    if (result['border-width']) {
      result['border-width'] += 'px'
    }
    if (result['border-radius']) {
      result['border-radius'] +='px'
    }
   if(result['letter-spacing']){
    result['letter-spacing'] +='px'
   }
    return result
  }

}
