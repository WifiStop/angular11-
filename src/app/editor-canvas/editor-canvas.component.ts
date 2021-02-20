import { Component, OnInit, ComponentFactoryResolver, Inject, Type, TemplateRef, Optional, OnDestroy } from '@angular/core';
import { CommunicationService } from '../share/service/communication.service'
import { share } from '../share/interface/share.interface'
import { map } from 'lodash';
import * as _ from 'lodash';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './editor-canvas.component.html',
  styleUrls: ['./editor-canvas.component.scss']
})
export class EditorCanvasComponent implements OnInit {
  public get componentDataList(): share.componentList[] {
    return this._communicationService.getComponentDataList()
  }
  canvasSize: share.size = this._communicationService.canvasSize
  position!: share.position
  data!: share.componentList;
  isShowMenu: boolean = false
  zIndex: number = 0
  isCanvas: boolean = false
  constructor(private _communicationService: CommunicationService,
    private _componentFactoryResolver: ComponentFactoryResolver,

  ) { }

  ngOnInit(): void {
    document.addEventListener('click', () => {
      this.isShowMenu = false
    })
    this.readCache()

  }
  readCache(): void {
    let cache = window.localStorage.getItem('data')
    if (!cache) return
    let cacheData = <share.componentList[]>(JSON.parse(cache))
    this._communicationService.setComponentDataList(cacheData)
    let max = Math.max.apply(Math, this.componentDataList.map((item) =>{
      return item.style['z-index'] << 0 
    }));
    this.zIndex = max
  }
  ngAfterViewInit() {
  }

  dragOver(event: any) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }
  handleDrop(event: any) {
    let data = JSON.parse(event.dataTransfer.getData('componentData'))
    data.style.top = event.offsetY
    data.style.left = event.offsetX
    data.id = this.genID(10)
    data.style['z-index'] = ++this.zIndex
    this._communicationService.setComponentDataList(data)
    this._communicationService.setOperatingList()
  }
  //粘贴组件
  pasteComponent() {
    let copyComponent = _.cloneDeep(this._communicationService.copyComponentData)
    if(!copyComponent){
      alert('请先复制组件')
      console.log('请先复制组件')
      return;
    } 
    for(let style in this._communicationService.menuSeat){
      copyComponent.style[style] = this._communicationService.menuSeat[style]
    }
    copyComponent.style['z-index'] = ++this.zIndex
    this._communicationService.setComponentDataList(copyComponent)
    this._communicationService.setOperatingList()
  }
  setCurrentComponent() {
    let data = {
      style: {
        'z-index': null
      }
    }
    this._communicationService.currentComponent = <any>data
  }
  //激活画图右键菜单
  handleContextmenu(event: any) {
    event.stopPropagation()
    event.preventDefault()
    let left = event.target.offsetLeft + event.offsetX;
    let top = event.target.offsetTop + event.offsetY;
    this.isShowMenu = true
    this.position = { left: left, top: top }
    this._communicationService.menuSeat = this.position
    this.isCanvas = true
  }


  showMenu(res: { data: share.componentList, position: share.position }) {
    this.isShowMenu = true
    this.position = res.position
    this._communicationService.menuSeat = this.position
    this.data = res.data
    this.isCanvas = false
  }
  genID(length: number) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  }
  getStyle(style: share.position) {
    const result = { ...style }
    if (result.top) {
      result.top += 'px'
    }
    if (result.left) {
      result.left += 'px'
    }
    return result
  }
}
