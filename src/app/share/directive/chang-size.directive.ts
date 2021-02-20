import { Directive, ElementRef, AfterViewInit, Input, HostListener, Output, ViewChild, EventEmitter } from '@angular/core';
import { CommunicationService } from '../service/communication.service'
import * as _ from 'lodash';
import { share } from '../interface/share.interface';
@Directive({
  selector: '[change-size]'
})
export class ChangeSizeDirective {
  @Input() type!: string;
  @Input() data!: share.componentList
  @Output() showMenu: EventEmitter<any> = new EventEmitter();
  @HostListener('mousedown', ['$event'])
  changeSize(event: any) {
    event.stopPropagation()//防止元素移动

    const curComponentAttribute = {
      curWidth: Number(this.data.style.width),//获取当前组件的宽
      curHeight: Number(this.data.style.height),//获取当前组件的高
      top: Number(this.data.style.top),//获取当前组件的定位
      left: Number(this.data.style.left)//获取当前组件的定位
    }
    const center: coordinate = {
      x: curComponentAttribute.left + curComponentAttribute.curWidth / 2,
      y: curComponentAttribute.top + curComponentAttribute.curHeight / 2
    }
    const canvasAttribute = document.getElementById('bigCanvas')!.getBoundingClientRect()
   
    const curSeat: coordinate = {
      x: event.clientX - canvasAttribute.left,
      y: event.clientY - canvasAttribute.top
    }
    console.log(canvasAttribute,curSeat)
    const symmetricPoint: coordinate = {
      x: center.x - (curSeat.x - center.x),
      y: center.y - (curSeat.y - center.y),
    }
    let move = (e: any) => {
      let moveComponentAttribute: coordinate = {
        x: e.clientX - canvasAttribute.left,
        y: e.clientY - canvasAttribute.top
      }
      this.assistFn(this.type, moveComponentAttribute, { center, curSeat, symmetricPoint })
      this.showMenu.emit(true)
    }
    let up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)


  }

  constructor(private el: ElementRef,
    private _communicationService: CommunicationService) {
  }
  assistFn(name: string, moveComponentAttribute: coordinate, pointInfo: pointType) {
    let obj = {
      r: 'clickRightPoint',
      l: 'clickLeftPoint',
      t: 'clickTopPoint',
      b: 'clickBottomPoint',
      tl: 'clickTopLeftPoint',
      tr: 'clickTopRight',
      bl: 'clickBottomLeft',
      br: 'clickBottomRight'
    }
    this[obj[name]](moveComponentAttribute, pointInfo)
  }
  clickRightPoint(moveComponentAttribute: coordinate, pointInfo: pointType) {
    const { symmetricPoint, curSeat } = pointInfo
    const rotatedcurPositon = this.calculateRotatedPointCoordinate(moveComponentAttribute, curSeat, -this.data.style.rotate)
    const rotatedRightMiddlePoint = this.calculateRotatedPointCoordinate({
      x: rotatedcurPositon.x,
      y: curSeat.y,
    }, curSeat, this.data.style.rotate)
    const newWidth = Math.sqrt((rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2)
    if (newWidth > 0) {
      const newCenter = this.getConentPoint(rotatedRightMiddlePoint, symmetricPoint)
      this.data.style.width = Math.round(newWidth)
      this.data.style.top = Math.round(newCenter.y - (this.data.style.height / 2))
      this.data.style.left = Math.round(newCenter.x - (newWidth / 2))
    }
  }
  clickLeftPoint(moveComponentAttribute: coordinate, pointInfo: pointType) {
    const { symmetricPoint, curSeat } = pointInfo
    const rotatedcurPositon = this.calculateRotatedPointCoordinate(moveComponentAttribute, curSeat, -this.data.style.rotate)
    const rotatedLeftMiddlePoint = this.calculateRotatedPointCoordinate({
      x: rotatedcurPositon.x,
      y: curSeat.y,
    }, curSeat, this.data.style.rotate)
    const newWidth = Math.sqrt((rotatedLeftMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedLeftMiddlePoint.y - symmetricPoint.y) ** 2)
    if (newWidth > 0) {
      const newCenter = this.getConentPoint(rotatedLeftMiddlePoint, symmetricPoint)
      this.data.style.width = Math.round(newWidth)
      this.data.style.top = Math.round(newCenter.y - (this.data.style.height / 2))
      this.data.style.left = Math.round(newCenter.x - (newWidth / 2))
    }
  }
  clickTopPoint(moveComponentAttribute: coordinate, pointInfo: pointType) {
    const { symmetricPoint, curSeat } = pointInfo
    const rotatedcurPositon = this.calculateRotatedPointCoordinate(moveComponentAttribute, curSeat, -this.data.style.rotate)
    const rotatedLeftMiddlePoint = this.calculateRotatedPointCoordinate({
      x: curSeat.x,
      y: rotatedcurPositon.y,
    }, curSeat, this.data.style.rotate)
    const newHeight = Math.sqrt((rotatedLeftMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedLeftMiddlePoint.y - symmetricPoint.y) ** 2)
    if (newHeight > 0) {
      const newCenter = this.getConentPoint(rotatedLeftMiddlePoint, symmetricPoint)
      this.data.style.height = Math.round(newHeight)
      this.data.style.top = Math.round(newCenter.y - (newHeight / 2))
      this.data.style.left = Math.round(newCenter.x - (this.data.style.width / 2))
    }
  }
  clickBottomPoint(moveComponentAttribute: coordinate, pointInfo: pointType) {
    const { symmetricPoint, curSeat } = pointInfo
    const rotatedcurPositon = this.calculateRotatedPointCoordinate(moveComponentAttribute, curSeat, -this.data.style.rotate)
    const rotatedBottomMiddlePoint = this.calculateRotatedPointCoordinate({
      x: curSeat.x,
      y: rotatedcurPositon.y,
    }, curSeat, this.data.style.rotate)
    const newHeight = Math.sqrt((rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2)
    if (newHeight > 0) {
      const newCenter = this.getConentPoint(rotatedBottomMiddlePoint, symmetricPoint)
      this.data.style.height = Math.round(newHeight)
      this.data.style.top = Math.round(newCenter.y - (newHeight / 2))
      this.data.style.left = Math.round(newCenter.x - (this.data.style.width / 2))
    }
  }
  clickTopLeftPoint(moveComponentAttribute: coordinate, pointInfo: pointType){
    const { symmetricPoint } = pointInfo
    const newCenterPoint = this.getConentPoint(moveComponentAttribute, symmetricPoint)
    const newTopLeftPoint = this.calculateRotatedPointCoordinate(moveComponentAttribute, newCenterPoint, -this.data.style.rotate)
    const newBottomRightPoint = this.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -this.data.style.rotate)
  
    const newWidth = newBottomRightPoint.x - newTopLeftPoint.x
    const newHeight = newBottomRightPoint.y - newTopLeftPoint.y
    if (newWidth > 0 && newHeight > 0) {
        this.data.style.width = Math.round(newWidth)
        this.data.style.height = Math.round(newHeight)
        this.data.style.left = Math.round(newTopLeftPoint.x)
        this.data.style.top = Math.round(newTopLeftPoint.y)
    }
  }
  clickTopRight(moveComponentAttribute: coordinate, pointInfo: pointType){
    const { symmetricPoint } = pointInfo
    const newCenterPoint = this.getConentPoint(moveComponentAttribute, symmetricPoint)
    const newTopRightPoint = this.calculateRotatedPointCoordinate(moveComponentAttribute, newCenterPoint, -this.data.style.rotate)
    const newBottomLeftPoint = this.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -this.data.style.rotate)
  
    const newWidth = newTopRightPoint.x - newBottomLeftPoint.x
    const newHeight = newBottomLeftPoint.y - newTopRightPoint.y
    if (newWidth > 0 && newHeight > 0) {
        this.data.style.width = Math.round(newWidth)
        this.data.style.height = Math.round(newHeight)
        this.data.style.left = Math.round(newBottomLeftPoint.x)
        this.data.style.top = Math.round(newTopRightPoint.y)
    }
  }
  clickBottomLeft(moveComponentAttribute: coordinate, pointInfo: pointType){
    const { symmetricPoint } = pointInfo
    const newCenterPoint = this.getConentPoint(moveComponentAttribute, symmetricPoint)
    const newTopRightPoint = this.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -this.data.style.rotate)
    const newBottomLeftPoint = this.calculateRotatedPointCoordinate(moveComponentAttribute, newCenterPoint, -this.data.style.rotate)
  
    const newWidth = newTopRightPoint.x - newBottomLeftPoint.x
    const newHeight = newBottomLeftPoint.y - newTopRightPoint.y
    if (newWidth > 0 && newHeight > 0) {
        this.data.style.width = Math.round(newWidth)
        this.data.style.height = Math.round(newHeight)
        this.data.style.left = Math.round(newBottomLeftPoint.x)
        this.data.style.top = Math.round(newTopRightPoint.y)
    }
  }
  clickBottomRight(moveComponentAttribute: coordinate, pointInfo: pointType){
    const { symmetricPoint } = pointInfo
    const newCenterPoint = this.getConentPoint(moveComponentAttribute, symmetricPoint)
    const newTopLeftPoint = this.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -this.data.style.rotate)
    const newBottomRightPoint = this.calculateRotatedPointCoordinate(moveComponentAttribute, newCenterPoint, -this.data.style.rotate)
  
    const newWidth = newBottomRightPoint.x - newTopLeftPoint.x
    const newHeight = newBottomRightPoint.y - newTopLeftPoint.y
    if (newWidth > 0 && newHeight > 0) {
        this.data.style.width = Math.round(newWidth)
        this.data.style.height = Math.round(newHeight)
        this.data.style.left = Math.round(newTopLeftPoint.x)
        this.data.style.top = Math.round(newTopLeftPoint.y)
    }
  }
  getConentPoint(p1: coordinate, p2: coordinate): coordinate {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2
    }
  }
  /**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Object}  point  旋转前的点坐标
 * @param   {Object}  center 旋转中心
 * @param   {Number}  rotate 旋转的角度
 * @return  {Object}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
  calculateRotatedPointCoordinate(point: coordinate, center: coordinate, rotate: number) {
    function angleToRadian(angle: number) {
      return angle * Math.PI / 180
    }
    /**
     * 旋转公式：
     *  点a(x, y)
     *  旋转中心c(x, y)
     *  旋转后点n(x, y)
     *  旋转角度θ                tan ??
     * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
     * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
     */

    return {
      x: (point.x - center.x) * Math.cos(angleToRadian(rotate)) - (point.y - center.y) * Math.sin(angleToRadian(rotate)) + center.x,
      y: (point.x - center.x) * Math.sin(angleToRadian(rotate)) + (point.y - center.y) * Math.cos(angleToRadian(rotate)) + center.y,
    }
  }
}

interface coordinate {
  x: number,
  y: number
}
interface pointType {
  center: coordinate,
  curSeat: coordinate,
  symmetricPoint: coordinate
}