import { Injectable, Renderer2, Optional } from '@angular/core';
import { share } from '../interface/share.interface';
import * as _ from 'lodash'
import { AdItem } from '../service/addComponent.service'
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
//全局通信
export class CommunicationService {
  private componentDataList: share.componentList[] = [];//画布上所有的组件数据
  public copyComponentData!: share.componentList//当前复制组件的数据
  public menuSeat!: share.position//菜单的位置
  public currentComponent!:share.componentList;
  public canvasSize: share.size = { width: 1200, height: 740 }//画布大小
  private operatingList: share.componentList[][] = []//操作列表
  public operatingIndex: number = -1
  private pointCoordinate: share.pointType = {};
  public getDotsSeat!:Function
  public previewAnimationList$ = new Subject()
  public zIndex:number=0//组件层级索引
  constructor(

  ) { }
  getComponentDataList(): share.componentList[] {
    return this.componentDataList
  }
  setComponentDataList(component: share.componentList | share.componentList[]): void {
    console.log(component)
    if (Array.isArray(component)) { this.componentDataList = _.cloneDeep(component); return; }
    this.componentDataList.push(component)
  }

  setCopyComponentData(copyComponentData: share.componentList) {
    this.copyComponentData = _.cloneDeep(copyComponentData)
  }

  setOperatingList(): void {
    this.operatingList[++this.operatingIndex] = _.cloneDeep(this.componentDataList)
    if (this.operatingIndex < this.operatingList.length - 1)
      this.operatingList = this.operatingList.splice(0, this.operatingIndex + 1)
  }
  getOperatingList(): share.componentList[][] {
    return this.operatingList
  }
  setPointCoordinate(id: string, arr: { x: number, y: number }[]): void {

    this.pointCoordinate[id] = arr
  }
  getPointCoordinate(): share.pointType {
    return this.pointCoordinate
  }
  angleToRadian(angle: number) {
    return angle * Math.PI / 180
  }
  sin(rotate: number) {
    return Math.abs(Math.sin(this.angleToRadian(rotate)))
  }

  cos(rotate: number) {
    return Math.abs(Math.cos(this.angleToRadian(rotate)))
  }
  previewAnimationList(animationList:share.children[]){
    this.previewAnimationList$.next(animationList)
  }
  async playAnimation(element:any,animations:share.children[],renderer:Renderer2){
    const play = (animation: share.children) => new Promise(resolve => {
      renderer.addClass(element, animation.value)
      const removeAnimation = () => {
        renderer.listen(element, 'animationend', removeAnimation)
        renderer.removeClass(element, animation.value)
        resolve(true)
      }
      renderer.listen(element, 'animationend', removeAnimation)
    })
    for (let i = 0; i < animations.length; i++) {
      await play(animations[i])
    }
  }
}



