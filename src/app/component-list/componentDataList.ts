import {share} from '../share/interface/share.interface'
// 公共样式
const commonStyle:{[key:string]:any} = {
    rotate: 0, 
    opacity: 1,
}

// 编辑器左侧组件列表
const list:share.componentList[] = [
    {
        componentType: 'text',
        label: '文字',
        propValue: '文字',
        icon: 'el-icon-edit',
        animations: [],
        events: {},
        style: {
            width: 200,
            height: 33,
            'font-size': 14,
            'font-weight': 500,
            'line-height': '',
            'letter-spacing': 0,
            'text-align': '',
            color: '',
        },
       
    },
    {
        componentType: 'button', 
        label: '按钮', 
        propValue: '按钮',
        icon: 'el-icon-thumb',
        animations: [],
        events: {},
        style: {
            width: 100,
            height: 34,
            'border-width': '',
            'border-color': '',
            'border-cadius': '',
            'font-size': 14,
            'font-weight': 500,
            'line-height': '',
            'letter-spacing': 0,
            'text-align': '',
            color: '',
            'background-color': '',
        },
       
    },
    {
        componentType: 'Picture', 
        label: '图片', 
        icon: 'el-icon-picture',
        propValue: '',
        animations: [],
        events: {},
        style: {
            width: 300,
            height: 300,
            'border-radius': '',
        },
        
    },
]

list.forEach(item => {
    item.style = { ...item.style, ...commonStyle }
})

export default list