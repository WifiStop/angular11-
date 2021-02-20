import { Component, OnInit, Output,Input,EventEmitter } from '@angular/core';
import {CommunicationService} from '../../../share/service/communication.service'
import { share } from 'src/app/share/interface/share.interface';
@Component({
  selector: 'app-right-click-view',
  templateUrl: './right-click-view.component.html',
  styleUrls: ['./right-click-view.component.scss']
})
export class RightClickViewComponent implements OnInit {
  @Input()data!:share.componentList;
  @Input()isCanvas!:boolean;
  @Output() pasteComponent: EventEmitter<any> = new EventEmitter();
  menuList:menu[]=[
    {ability:'复制',eventFnName:'copyComponentFn'},
    {ability:'粘贴',eventFnName:'pasteComponentFn'},
    {ability:'删除',eventFnName:'deleteComponent'},
    {ability:'置顶',eventFnName:'zIndexTop'},
    {ability:'置底',eventFnName:'zIndexBottom'},
    {ability:'上移',eventFnName:'zIndexMoveUp'},
    {ability:'下移',eventFnName:'zIndexMoveDown'},
  ]
  constructor(
    private _communicationService:CommunicationService
  ) { }

  ngOnInit(): void {
  }
  auxiliaryCall(fnName:string){
    this[fnName]( this._communicationService.getComponentDataList())
  }
  //粘贴组件
  pasteComponentFn(){
    this.pasteComponent.emit(true)
  }
  //复制组件
  copyComponentFn(){
    this._communicationService.setCopyComponentData(this.data)
  }
  //找到z-index最大值并替换
  zIndexTop(componentList:share.componentList[]){
    let max = Math.max.apply(Math, componentList.map((item) =>{
      return item.style['z-index'] << 0 
    }));
    this.findAndReplace(componentList,max)
  }
  //找到z-index最小值并替换
  zIndexBottom(componentList:share.componentList[]){
    let min = Math.min.apply(Math, componentList.map((item) =>{
      return item.style['z-index'] << 0 
    }));
    this.findAndReplace(componentList,min)
  }
  //找到当前元素的z-index上级并替换
  zIndexMoveUp(componentList:share.componentList[]){
    this.findAndReplace(componentList,this.data.style['z-index']+1)
  }
  //找到当前元素的z-index下级并替换
  zIndexMoveDown(componentList:share.componentList[]){
    this.findAndReplace(componentList,this.data.style['z-index']-1)
  }
  //根据提供的z-index找到元素，将他们的z-index互换
  findAndReplace(componentList:share.componentList[],replaceValue:number){
    let replaceDom = componentList.find(res=>res.style['z-index']==replaceValue)
    replaceDom!.style['z-index']=this.data.style['z-index']
    this.data.style['z-index'] = replaceValue
    this._communicationService.setOperatingList()
  }
  //删除选中组件
  deleteComponent(componentList:share.componentList[]){
    let index = componentList.findIndex(res=>res.style['z-index']==this.data.style['z-index'])
    componentList.splice(index,1)
  }

}

export interface menu {
  ability:string,
  eventFnName:'zIndexTop'|'zIndexBottom'|'zIndexMoveUp'|'zIndexMoveDown'|'deleteComponent'|'copyComponentFn'|'pasteComponentFn',
}
