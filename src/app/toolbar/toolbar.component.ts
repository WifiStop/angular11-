import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ViewRef } from '@angular/core';
import {CommunicationService} from '../share/service/communication.service'
import {share} from '../share/interface/share.interface'
import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import { PreviewCanvasComponent } from '../preview-canvas/preview-canvas.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('tpl') tt!: TemplateRef<void>;
  canvasSize:share.size = this._communicationService.canvasSize
  test:boolean = false
  test1:any
  constructor(
    private _communicationService:CommunicationService,
    private viewContainerRef: ViewContainerRef,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }
  save(){
   let componentData = this._communicationService.getComponentDataList()
   window.localStorage.setItem('data',JSON.stringify(componentData))
  }
  cleatCanvas(){
    this._communicationService.setComponentDataList([]) 
  }
  //撤销
  Revoke(){
    if(this._communicationService.operatingIndex>=0){
      let operatingList = this._communicationService.getOperatingList()
      let componentDataList = operatingList[--this._communicationService.operatingIndex]
      this._communicationService.setComponentDataList(componentDataList||[]) 
    }
  }
  //重做
  Redo(){
    if(this._communicationService.operatingIndex<this._communicationService.getOperatingList().length-1){
      let operatingList = this._communicationService.getOperatingList()
     this._communicationService.setComponentDataList(operatingList[++this._communicationService.operatingIndex]) 
    }    
  }
  //预览
  preview(){
    const dialogRef = this.dialog.open(PreviewCanvasComponent, {
      data: {}
    });
  }
}
