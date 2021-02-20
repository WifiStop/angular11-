import { share } from 'src/app/share/interface/share.interface';
import { Component, Input, OnInit } from '@angular/core';
import { CommunicationService } from '../../../share/service/communication.service'
@Component({
  selector: 'app-mark-line',
  templateUrl: './mark-line.component.html',
  styleUrls: ['./mark-line.component.scss']
})
export class MarkLineComponent implements OnInit {
  @Input() data!: share.componentList;
  @Input() componentData!: share.componentList;
  lines: string[] = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']
  public get lineStyle(): { [key: string]: share.position } {
    if (!this.data) return {}
    const { width, height, top, left } = this.translateComponentStyle(this.data.style)

    const side = {
      xt: { top: top, left: 0 },
      xc: { top: top + height / 2, left: 0 },
      xb: { top: top + height, left: 0 },
      yl: { top: 0, left: left },
      yc: { top: 0, left: left + width / 2 },
      yr: { top: 0, left: left + width },
    }
    return side

  }
  lineClassName: { [key: string]: string } = {
    xt: 'horizontal-line',
    xc: 'horizontal-line',
    xb: 'horizontal-line',
    yl: 'vertical-line',
    yc: 'vertical-line',
    yr: 'vertical-line',
  }
  lineStatus: { [key: string]: boolean } = {
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false,
  }
  diff: number = 4;
  translateComponentStyle(style: { [key: string]: any }) {
    style = { ...style }
    if (style.rotate != 0) {
      const newWidth = style.width * this._communicationService.cos(style.rotate) + style.height * this._communicationService.sin(style.rotate)
      const diffX = (style.width - newWidth) / 2
      style.left += diffX
      style.right = style.left + newWidth

      const newHeight = style.height * this._communicationService.cos(style.rotate) + style.width * this._communicationService.sin(style.rotate)
      const diffY = (newHeight - style.height) / 2
      style.top -= diffY
      style.bottom = style.top + newHeight

      style.width = newWidth
      style.height = newHeight
    } else {
      style.bottom = style.top + style.height
      style.right = style.left + style.width
    }

    return style
  }
  getStyle(style: share.position) {
    if (!style) return {}
    return { top: style.top + 'px', left: style.left + 'px' }
  }
  showLine() {
    if (!this.data) return
    let curComponentStyle = this.translateComponentStyle(this.data.style)
    const curCenterWidth = curComponentStyle.width / 2
    const curCenterHeight = curComponentStyle.height / 2
    let conditionsList: any = []
    this._communicationService.getComponentDataList().forEach((item, index) => {
      if (item.style['z-index'] == this.data.style['z-index']) return
      const itemComponentStyle = this.translateComponentStyle(item.style)
      let { top, left, right, bottom } = itemComponentStyle
      const componentHalfwidth = itemComponentStyle.width / 2
      const componentHalfHeight = itemComponentStyle.height / 2
      const conditions = {
        top: [
          {
            isNearly: this.isNearly(curComponentStyle.top, top),
            line: 'xt',
            dragShift: top,
          },
          {
            isNearly: this.isNearly(curComponentStyle.top + curCenterHeight, top),
            line: 'xc',
            dragShift: top - curCenterHeight,
          },
          {
            isNearly: this.isNearly(curComponentStyle.bottom, top),
            line: 'xb',
            dragShift: top - curComponentStyle.height,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: this.isNearly(curComponentStyle.top, top + componentHalfHeight),
            line: 'xt',
            dragShift: top + componentHalfHeight,
            componentHalfHeight,
          },
          {
            isNearly: this.isNearly(curComponentStyle.top + curCenterHeight, top + componentHalfHeight),
            line: 'xc',
            dragShift: top + componentHalfHeight - curCenterHeight,

          },
          {
            isNearly: this.isNearly(curComponentStyle.bottom, top + componentHalfHeight),
            line: 'xb',
            dragShift: top + componentHalfHeight - curComponentStyle.height,

          },
          {
            isNearly: this.isNearly(curComponentStyle.top, bottom),
            line: 'xt',
            dragShift: bottom,

          },
          {
            isNearly: this.isNearly(curComponentStyle.top + curCenterHeight, bottom),
            line: 'xc',
            dragShift: bottom - curCenterHeight,

          },
          {
            isNearly: this.isNearly(curComponentStyle.bottom, bottom),
            line: 'xb',
            dragShift: bottom - curComponentStyle.height,

          },
        ],
        left: [
          {
            isNearly: this.isNearly(curComponentStyle.left, left),
            line: 'yl',
            dragShift: left,
          },
          {
            isNearly: this.isNearly(curComponentStyle.left + curCenterWidth, left),
            line: 'yc',
            dragShift: left - curCenterWidth,
          },
          {
            isNearly: this.isNearly(curComponentStyle.right, left),
            line: 'yr',
            dragShift: left - curComponentStyle.width,
          },
          {
            isNearly: this.isNearly(curComponentStyle.left, left + componentHalfwidth),
            line: 'yl',
            dragShift: left + componentHalfwidth,
          },
          {
            isNearly: this.isNearly(curComponentStyle.left + curCenterWidth, left + componentHalfwidth),
            line: 'yc',
            dragShift: left + componentHalfwidth - curCenterWidth,
          },
          {
            isNearly: this.isNearly(curComponentStyle.right, left + componentHalfwidth),
            line: 'yr',
            dragShift: left + componentHalfwidth - curComponentStyle.width,
          },
          {
            isNearly: this.isNearly(curComponentStyle.left, right),
            line: 'yl',
            dragShift: right,

          },
          {
            isNearly: this.isNearly(curComponentStyle.left + curCenterWidth, right),
            line: 'yc',
            dragShift: right - curCenterWidth,

          },
          {
            isNearly: this.isNearly(curComponentStyle.right, right),
            line: 'yr',
            dragShift: right - curComponentStyle.width,

          },
        ],
      }
      const { rotate } = this.data.style
      conditionsList.push(conditions)
      for (let key in conditions) {
        conditions[key].forEach((item: share.showLineType) => {
          if (!item.isNearly) return
          let side = rotate!=0?this.translatecurComponentShift(key,item,curComponentStyle):item.dragShift
          this.componentData.style[key] = side
          this.data.style[key] = side
          this.lineStatus[item.line] = true

        });

      }
      // console.log(conditions)
    })
    this.hideLine(conditionsList)
  }
  translatecurComponentShift(key:string, condition:share.showLineType, curComponentStyle:any) {
    const { width, height } = this.data.style
    if (key == 'top') {
        return Math.round(condition.dragShift - (height - curComponentStyle.height) / 2)
    }

    return Math.round(condition.dragShift - (width - curComponentStyle.width) / 2)
}
  //让不满足条件的标线隐藏
  hideLine(conditionsList: share.lineType[]): void {
    let typeList: share.showLineType[] = []
    conditionsList.forEach((item: share.lineType) => {
      for (let key in item) {
        this.lines.forEach(type => {
          let lineArr = item[key].filter((line: share.showLineType) => line.line == type && line.isNearly)
          typeList = [...typeList,...lineArr]
        })
      }
    })
    this.lines.forEach(item=>{
      let line = typeList.find(res=>res.line==item)
      if(!line) this.lineStatus[item]=false
    })
  }
  isNearly(dragValue: number, targetValue: number) {
    // console.log(dragValue,targetValue)
    return Math.abs(dragValue - targetValue) <= this.diff
  }
  hiddenLine() {
    for (let status in this.lineStatus) {
      this.lineStatus[status] = false
    }
  }

  constructor(
    private _communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
  }

}
