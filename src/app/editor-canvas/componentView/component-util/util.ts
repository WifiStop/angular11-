import { element } from 'protractor';
import { MarkLineComponent } from './../mark-line/mark-line.component';
import { AddComponentService } from './../../../share/service/addComponent.service';
import { Input, Output, EventEmitter, ComponentFactoryResolver, Renderer2, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core'
import { AdComponent } from '../../addComponent'
import { Component } from '@angular/core'
import * as _ from 'lodash';
import { CommunicationService } from '../../../share/service/communication.service'
import { share } from 'src/app/share/interface/share.interface';
import { AddComponentDirective } from '../../directive/addConpoment.direvctive';
import { ReplaySubject, Subscription } from 'rxjs'
import { throttleTime } from 'rxjs/operators'
@Component({
  selector: 'app-button-view',
  template: ``,

})
export class domUtil implements AdComponent, OnInit, OnDestroy {
  @ViewChild('component') component: any;
  @ViewChild('line') line!: MarkLineComponent
  @Input() data!: share.componentList;
  @Output() showMenu: EventEmitter<any> = new EventEmitter();
  private heartbeatSubject = new ReplaySubject<boolean>(1);
  private previewAnimationList$!: Subscription;
  private heartbeatSubject$!: Subscription;
  diff: number = 3
  moveData!: share.componentList;
  left: number = 0
  top: number = 0
  constructor(
    protected _communicationService: CommunicationService,
    protected _addComponentService: AddComponentService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected elRef: ElementRef
  ) {

  }
  ngOnDestroy(): void {
    this.previewAnimationList$.unsubscribe()
    this.heartbeatSubject$.unsubscribe()
  }
  ngOnInit(): void {
    this.heartbeatSubject$ = this.heartbeatSubject.asObservable().pipe(throttleTime(1))
      .subscribe(() => {
        this.line.showLine()
      });
    this.previewAnimationList$ = this._communicationService.previewAnimationList$.subscribe(async (res: any) => {
      if (this._communicationService.currentComponent.style['z-index'] != this.component.componentData.style['z-index']) return
      let element = this.elRef.nativeElement.firstElementChild
      this._communicationService.playAnimation(element,res,this.renderer)
    })
  }
  
  dragStart(event: any) {
    event.source.reset()
    event.source._dragRef._initialTransform = `rotate(${this.data.style.rotate}deg)`;
    this.moveData = _.cloneDeep(this.data)
    this.left = Number(this.data.style.left)//记录移动开始位置
    this.top = Number(this.data.style.top)
  }
  ngAfterViewInit() {

  }

  setCurrentComponent(event: any) {
    event.stopPropagation()
    this._communicationService.currentComponent = <share.componentList>this.data
  }
  moveDomEnd(event: any) {
    event.source.reset()
    this.line.hiddenLine()
    this._communicationService.setOperatingList()
    this.moveData = _.cloneDeep(this.data)//更新moveData的所有状态
  }
  moveDom(event: any) {
    event.source.reset()//阻止angular使用tranform位移
    this.data.style.top = this.top + event.distance.y
    this.data.style.left = this.left + event.distance.x
    this.moveData.style.top = this.data.style.top
    this.moveData.style.left = this.data.style.left
    this.heartbeatSubject.next()
  }

  handleContextmenu(event: any) {
    event.stopPropagation()
    event.preventDefault()
    let left = Number(this.data.style.left) + event.offsetX;
    let top = Number(this.data.style.top) + event.offsetY;
    this.showMenu.emit({ data: this.data, position: { left: left, top: top } })
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

    return result
  }

}
