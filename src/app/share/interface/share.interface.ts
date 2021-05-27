export namespace share{
    export interface position{left:string|number,top:string|number,transform?:string}
    export interface dotsSateType{
        t:Partial<CSSStyleDeclaration>|number,
        b:Partial<CSSStyleDeclaration>|number,
        l:Partial<CSSStyleDeclaration>|number,
        r:Partial<CSSStyleDeclaration>|number,
        tl:Partial<CSSStyleDeclaration>|number,
        tr:Partial<CSSStyleDeclaration>|number,
        bl:Partial<CSSStyleDeclaration>|number,
        br:Partial<CSSStyleDeclaration>|number,
    }
    export interface size{
        width:number|string,
        height:number
    }
    export interface componentList {
        id?:string,
        componentType:string,
        label:string,
        icon:string,
        propValue:Function|string,
        animations:children[],
        events:{[key:string]:any},
        style:any,
       
        distanceX?:number|null,//移动中元素的位移像素
        distanceY?:number|null//移动中元素的位移像素
    }
    export interface operatingType{
        isCreateOperating:boolean,
        isDeleteOperating:boolean,
        data:componentList
    }
    export interface pointType{
        [key:string]:coordinateType[]
    }
    export interface coordinateType{
        x:number,
        y:number
    }
    export interface showLineType{
            isNearly: boolean,
            line: string,
            dragShift: any,
            lineShift: any,
          
        }
    export interface lineType {
        top:showLineType[],
        left:showLineType[]
    }
    export interface Animation{
        label:string,
        children:children[]
    }
    export interface children{
        value:string,
            label:string,
            status:boolean
    }
}