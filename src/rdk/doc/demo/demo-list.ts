import {NgModule, Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RdkBlock, RdkBlockModule} from "../../component/block/block";
import {RdkCollapseModule} from "../../component/collapse/collapse";
import {RdkScrollBarModule} from "../../component/scrollbar/scrollbar";
import {AffixUtils} from "../../core/utils/internal-utils";

@Component({
    selector: 'rdk-demo-list',
    templateUrl: 'demo-list.html',
    styleUrls: ['demo-list.scss']
})
export class DemoListComponent implements OnInit{
    constructor(private elementRef: ElementRef){

    }
    navHeight: number;
    ngOnInit(){
        this.navHeight = (document.body.clientHeight -
            AffixUtils.offset(this.elementRef.nativeElement.querySelector('.left-box')).top) - 10;
    }
}

// 请按照组件的字符序排列
const demoListRoutes = [
    {
        path: '',
        component: DemoListComponent,
        children: [
            {
                path: 'alert',
                loadChildren: './component/alert/demo.module#AlertDemoModule'
            },
            {
                path: 'array-collection',
                loadChildren: './component/array-collection/demo.module#ArrayCollectionDemoModule'
            },
            {
                path: 'button',
                loadChildren: './component/button/demo.module#ButtonDemoModule'
            },
            {
                path: 'checkbox',
                loadChildren: './component/checkbox/demo.module#CheckBoxDemoModule'
            },
            {
                path: 'loading',
                loadChildren: './component/loading/demo.module#LoadingDemoModule'
            },
            {
                path: 'input',
                loadChildren: './component/input/demo.module#InputDemoModule'
            },
            {
                path: 'popup',
                loadChildren: './component/popup/demo.module#PopupDemoModule'
            },
            {
                path: 'scrollbar',
                loadChildren: './component/scrollbar/demo.module#ScrollbarDemoModule'
            },
            {
                path: 'select',
                loadChildren: './component/select/demo.module#SelectDemoModule'
            },
            {
                path: 'table',
                loadChildren: './component/table/demo.module#TableDemoModule'
            },
            {
                path: 'switch',
                loadChildren: './component/switch/switch-demo.module#SwitchDemoModule'
            },
            {
                path: 'time',
                loadChildren: './component/time/time-demo.module#TimeDemoModule'
            },
            {
                path: 'radio',
                loadChildren: './component/radio/radio-demo.module#RadioDemoModule'
            },
            {
                path: 'tileselect',
                loadChildren: './component/tileselect/tileselect-demo.module#TileSelectDemoModule'
            },
            {
                path: 'graph',
                loadChildren: './component/graph/graph-demo.module#GraphDemoModule'
            },
            {
                path: 'pagination',
                loadChildren: './component/pagination/pagination-demo.module#PaginationDemoModule'
            },
            {
                path: 'tag',
                loadChildren: './component/tag/tag-demo.module#TagDemoModule'
            },
            {
                path: 'tabs',
                loadChildren: './component/tabs/tabs-demo.module#TabsDemoModule'
            },
            {
                path: 'combo-select',
                loadChildren: './component/combo-select/combo-select-demo.module#ComboSelectDemoModule'
            },
            {
                path: 'slider',
                loadChildren: './component/slider/slider-demo.module#SliderDemoModule'
            },
            {
                path:'tree',
                loadChildren:'./component/ztree/demo.module#ZtreeDemoModule'
            },
            {
                path: 'collapse',
                loadChildren: './component/collapse/collapse-module#CollapseDemoModule'
            },
            {
                path: 'dialog',
                loadChildren: './component/dialog/demo.module#DialogDemoModule'
            },{
                path: 'rangeTime',
                loadChildren: './component/range-time/range-time-demo.module#RangeTimeDemoModule'
            },
            {
                path: 'tooltip',
                loadChildren: './component/tooltip/demo.module#TooltipDemoModule'
            },
        ]
    },
    {
        path: '**', //fallback router must in the last
        component: DemoListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(demoListRoutes),
        RdkBlockModule,
        RdkCollapseModule,
        RdkScrollBarModule
    ],
    exports: [],
    declarations: [
        DemoListComponent
    ],
    providers: [],
    entryComponents: [RdkBlock]
})
export class DemoListModule {
    constructor(){

    }


}
