import { share } from 'src/app/share/interface/share.interface';
import { Component, OnInit } from '@angular/core';
import animationList from './animation-list'
import {CommunicationService} from '../../share/service/communication.service'
@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {
  visible:boolean=false
  animationList:share.Animation[]=animationList
  public get componentData():share.componentList{
    return this._communicationService.currentComponent
  }
  constructor(
    private _communicationService:CommunicationService
  ) { }

  ngOnInit(): void {
  }
  close(){
    this.visible = false;
  }
  changeAuth(children:share.children){
    children.status = true
  }

  animationend(children:share.children){
    children.status = false
  }
  addAnimation(children:share.children){
    this.componentData.animations.push(children)
  }
  handleClose(index:number){
    this.componentData.animations.splice(index,1)
  }
  previewAnimation(){
    this._communicationService.previewAnimationList(this.componentData.animations)
  }

}
