import { share } from './../share/interface/share.interface';
import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges, ElementRef, Output } from '@angular/core';
import { CommunicationService } from '../share/service/communication.service'
import * as _ from 'lodash';
@Component({
  selector: 'app-change-shape',
  templateUrl: './change-shape.component.html',
  styleUrls: ['./change-shape.component.scss']
})
export class ChangeShapeComponent implements OnInit, OnChanges {
  @ViewChild('parentComponent') parentComponent!: ElementRef;
  @Input() componentData!: share.componentList

  id:number=0
  @Output()
  list: string[] = ['t', 'b', 'l', 'r', 'tl', 'tr', 'bl', 'br'];
  public dotsSeatObj: share.dotsSateType = {
    t: {},
    b: {},
    l: {},
    r: {},
    tl: {},
    tr: {},
    bl: {},
    br: {},
  };

  initialAngle: share.dotsSateType = { // 每个点对应的初始角度
    t: 45,
    b: 225,
    l: 315,
    r: 135,
    tl: 0,
    tr: 90,
    bl: 270,
    br: 180,
  };
  angleToCursor:{start:number,end:number,cursor:string}[] =[// 每个范围的角度对应的光标
    { start: 0, end: 23, cursor: 'nw-resize' }, 
    { start: 23, end: 68, cursor: 'n-resize' },
    { start: 68, end: 113, cursor: 'ne-resize' },
    { start: 113, end: 158, cursor: 'e-resize' },
    { start: 158, end: 203, cursor: 'se-resize' },
    { start: 203, end: 248, cursor: 's-resize' },
    { start: 248, end: 293, cursor: 'sw-resize' },
    { start: 293, end: 338, cursor: 'w-resize' },
    { start: 338, end: 360, cursor: 'nw-resize' },
    
]
  constructor(
    private _communicationService: CommunicationService
  ) { }

  ngOnInit(): void {


  }
  spinComponent(event: any):void{
    event.stopPropagation()
    event.preventDefault()
    const startY = event.clientY
    const startX = event.clientX
    const rotate = this.componentData.style.rotate
    const rect = this.parentComponent.nativeElement.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)
    const move = (moveEvent: any) => {
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      // 旋转后的角度
      const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
      // 获取旋转的角度值
      this.componentData.style.rotate = rotate + rotateDegreeAfter - rotateDegreeBefore
      
    }
    const up = (event:any) => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      
      this.getDotsSeat()
      
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
  //通过当前选中元素的z-index来判断是否显示周围圆点
  isShowShape():boolean{
    let currentComponent: share.componentList = this._communicationService.currentComponent
    if (!currentComponent) return false
    // console.log(currentComponent,this.componentData)
    return currentComponent.style['z-index'] == this.componentData.style['z-index']
  }
  //给元素加上8个小圆点
  getDotsSeat():void{ 
      const {width, height} = this.componentData.style
      this.dotsSeatObj.tl = { top: '0', left: '0', cursor: this.chagneAngular('tl') }
      this.dotsSeatObj.t = { top: '0', left: width / 2 + '', cursor: this.chagneAngular('t') }
      this.dotsSeatObj.tr = { top: '0', left: width, cursor: this.chagneAngular('tr') }
      this.dotsSeatObj.l = { top: height / 2 + '', left: '0', cursor: this.chagneAngular('l') }
      this.dotsSeatObj.r = { top: height / 2 + '', left: width, cursor: this.chagneAngular('r') }
      this.dotsSeatObj.bl = { top: height + '', left: '0', cursor: this.chagneAngular('bl') }
      this.dotsSeatObj.b = { top: height + '', left: width / 2 + '', cursor: this.chagneAngular('b') }
      this.dotsSeatObj.br = { top: height + '', left: width + '', cursor: this.chagneAngular('br') }
  }

  chagneAngular(type:string):string{
    const rotate = Math.abs(this.componentData.style.rotate%360)
    let newAngular = (this.initialAngle[type]+rotate)%360
    let test = this.angleToCursor.find(res=>res.start<=newAngular&&newAngular<=res.end)?.cursor as string
    // console.log(newAngular,test)
    return test
  }
  ngOnChanges(changes: SimpleChanges) {
      this.getDotsSeat()
      this._communicationService.getDotsSeat = this.getDotsSeat.bind(this)
  }
  getStyle(style: Partial<CSSStyleDeclaration>) {
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
