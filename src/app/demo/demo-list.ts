import {NgModule, Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RdkCollapseModule} from "../../rdk/component/collapse/collapse";
import {RdkScrollBarModule} from "../../rdk/component/scrollbar/scrollbar";
import {AffixUtils} from "../../rdk/core/utils/internal-utils";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'rdk-demo-list',
    templateUrl: 'demo-list.html',
    styleUrls: ['demo-list.scss']
})
export class DemoListComponent implements OnInit{
    constructor(private elementRef: ElementRef){

    }
    navHeight: number;

    navData: Object = [
        {
            title: 'Alert',
            navList: [
                {
                    label: 'in-dom',
                    url: '/demo/alert/in-dom'
                },
                {
                    label: 'popup',
                    url: '/demo/alert/popup'
                },
                {
                    label: 'customized',
                    url: '/demo/alert/customized'
                }
            ]
        },
        {
            title: 'ArrayCollection',
            navList: [
                {
                    label: 'ajax',
                    url: '/demo/array-collection/ajax'
                },
                {
                    label: 'basic',
                    url: '/demo/array-collection/basic'
                },
                {
                    label: 'server side pagination',
                    url: '/demo/array-collection/server-side-pagination'
                }
            ]
        },
        {
            title: 'Button',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/button/basic'
                },
                {
                    label: 'disable',
                    url: '/demo/button/disable'
                },
                {
                    label: 'width_height',
                    url: '/demo/button/width_height'
                },
                {
                    label: 'preset',
                    url: '/demo/button/preset'
                },
                {
                    label: 'with-loading-inside',
                    url: '/demo/button/with-loading'
                },
                {
                    label: 'with-loading-outside',
                    url: '/demo/loading/domInner'
                }
            ]
        },
        {
            title: 'CheckBox',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/checkbox/basic'
                },
                {
                    label: 'disable',
                    url: '/demo/checkbox/disable'
                }
            ]
        },
        {
            title: 'Loading',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/loading/basic'
                },
                {
                    label: 'ballLoading',
                    url: '/demo/loading/ballLoading'
                },
                {
                    label: 'userDefined',
                    url: '/demo/loading/userDefined'
                },
                {
                    label: 'with-loading-inside',
                    url: '/demo/button/with-loading'
                },
                {
                    label: 'with-loading-outside',
                    url: '/demo/loading/domInner'
                },
                {
                    label: 'color',
                    url: '/demo/loading/color'
                },
            ]
        },
        {
            title: 'Switch',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/switch/basic'
                }
            ]
        },
        {
            title: 'Table',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/table/basic'
                },
                {
                    label: 'renderer',
                    url: '/demo/table/renderer'
                },
                {
                    label: 'performs',
                    url: '/demo/table/performs'
                },
                {
                    label: 'setColumnWidth',
                    url: '/demo/table/setColumnWidth'
                },
                {
                    label: 'setColumnVisible',
                    url: '/demo/table/setColumnVisible'
                },
                {
                    label: 'setHeaderRender',
                    url: '/demo/table/setHeaderRender'
                },
                {
                    label: 'setHeaderClass',
                    url: '/demo/table/setHeaderClass'
                },
                {
                    label: 'setHeaderSort',
                    url: '/demo/table/setHeaderSort'
                },
                {
                    label: 'setCellRender',
                    url: '/demo/table/setCellRender'
                },
                {
                    label: 'setCellClass',
                    url: '/demo/table/setCellClass'
                },
                {
                    label: 'setCellEditable',
                    url: '/demo/table/setCellEditable'
                },
                {
                    label: 'setColumnGroup',
                    url: '/demo/table/setColumnGroup'
                },
                {
                    label: 'addColumn',
                    url: '/demo/table/addColumn'
                },
                {
                    label: 'addIDColumn',
                    url: '/demo/table/addIDColumn'
                },
                {
                    label: 'addCheckboxColumn',
                    url: '/demo/table/addCheckboxColumn'
                },
                {
                    label: 'fixedHead',
                    url: '/demo/table/fixedHead'
                },
                {
                    label: 'pageable',
                    url: '/demo/table/pageable'
                },
                {
                    label: 'dataFromAjax',
                    url: '/demo/table/dataFromAjax'
                },
                {
                    label: 'scrollAmount',
                    url: '/demo/table/scrollAmount'
                },
                {
                    label: 'withPopup',
                    url: '/demo/table/withPopup'
                },
                {
                    label: 'dataChange',
                    url: '/demo/table/dataChange'
                },
                {
                    label: 'addIDWithPaging',
                    url: '/demo/table/addIDWithPaging'
                },
                {
                    label: 'addIDWithDebouncePaging',
                    url: '/demo/table/addIDWithDebouncePaging'
                },
                {
                    label: 'rendererOfTemplateRef',
                    url: '/demo/table/rendererOfTemplateRef'
                },
                {
                    label: 'lineEllipsis',
                    url: '/demo/table/lineEllipsis'
                },
            ]
        },
        {
            title: 'Dialog',
            navList: [
                {
                    label: 'title',
                    url: '/demo/dialog/title'
                },
                {
                    label: 'buttons',
                    url: '/demo/dialog/buttons'
                },
                {
                    label: 'top',
                    url: '/demo/dialog/top'
                },
                {
                    label: 'popOption',
                    url: '/demo/dialog/popOption'
                },
                {
                    label: 'in-dom',
                    url: '/demo/dialog/in-dom'
                },
                {
                    label: 'misc',
                    url: '/demo/dialog/misc'
                }
            ]
        },
        {
            title: 'Popup',
            navList: [
                {
                    label: 'tracing-event',
                    url: '/demo/popup/tracing-event'
                },
                {
                    label: 'alert-popup',
                    url: '/demo/alert/popup'
                },
                {
                    label: 'dialog-popOption',
                    url: '/demo/dialog/popOption'
                },
                {
                    label: 'dialog-misc',
                    url: '/demo/dialog/misc'
                },
                {
                    label: 'tooltip-dialog',
                    url: '/demo/tooltip/dialog'
                }
            ]
        },
        {
            title: 'Input',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/input/basic'
                },
                {
                    label: 'valueChange',
                    url: '/demo/input/valueChange'
                },
                {
                    label: 'focus',
                    url: '/demo/input/focus'
                },
                {
                    label: 'prefixIcon',
                    url: '/demo/input/prefixIcon'
                },
            ]
        },
        {
            title: 'Scrollbar',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/scrollbar/basic'
                },
                {
                    label: 'user-define',
                    url: '/demo/scrollbar/user-define'
                },
                {
                    label: 'setOptions',
                    url: '/demo/scrollbar/setOptions'
                },
            ]
        },
        {
            title: 'Select',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/select/basic'
                },
                {
                    label: 'scroll',
                    url: '/demo/select/scroll'
                },
                /*{
                    label: 'checkbox',
                    url: '/demo/select/checkbox'
                },*/
            ]
        },
        {
            title: 'Radio',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/radio/basic'
                },
                {
                    label: 'labelField',
                    url: '/demo/radio/labelField'
                },
                {
                    label: 'trackItemBy',
                    url: '/demo/radio/trackItemBy'
                },
            ]
        },
        {
            title: 'Graph',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/graph/basic'
                },
                {
                    label: 'resize',
                    url: '/demo/graph/resize'
                },
                {
                    label: 'line-bar-graph-basic',
                    url: '/demo/graph/line-bar-graph-basic'
                },
                {
                    label: 'line-bar-graph-ajax',
                    url: '/demo/graph/line-bar-graph-ajax'
                },
                {
                    label: 'pie-graph-basic',
                    url: '/demo/graph/pie-graph-basic'
                },
                {
                    label: 'noData',
                    url: '/demo/graph/noData'
                },
            ]
        },
        {
            title: 'TileSelect',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/tileselect/basic'
                },
                {
                    label: 'SelectedItems',
                    url: '/demo/tileselect/SelectedItems'
                },
                {
                    label: 'MultipleSelect',
                    url: '/demo/tileselect/MultipleSelect'
                },
                {
                    label: 'tileOptionWidth',
                    url: '/demo/tileselect/tileOptionWidth'
                },
                {
                    label: 'searchable',
                    url: '/demo/tileselect/searchable'
                },
                {
                    label: 'labelField',
                    url: '/demo/tileselect/labelField'
                },
                {
                    label: 'ItemsChange',
                    url: '/demo/tileselect/ItemsChange'
                },
                {
                    label: 'trackitemby',
                    url: '/demo/tileselect/trackitemby'
                },
            ]
        },
        {
            title: 'Time',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/time/basic'
                },
                {
                    label: 'limitEnd',
                    url: '/demo/time/limitEnd'
                },
                {
                    label: 'limitStart',
                    url: '/demo/time/limitStart'
                },
                {
                    label: 'weekStart',
                    url: '/demo/time/weekStart'
                },
                {
                    label: 'gr',
                    url: '/demo/time/gr'
                },
                {
                    label: 'recommended',
                    url: '/demo/time/recommended'
                },
                {
                    label: 'grItems',
                    url: '/demo/time/grItems'
                },
                {
                    label: 'refreshInterval',
                    url: '/demo/time/refreshInterval'
                },
                {
                    label: 'withComboSelect',
                    url: '/demo/time/withComboSelect'
                },
            ]
        },
        {
            title: 'RangeTime',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/rangeTime/basic'
                },
                {
                    label: 'limitEnd',
                    url: '/demo/rangeTime/limitEnd'
                },
                {
                    label: 'limitStart',
                    url: '/demo/rangeTime/limitStart'
                },
                {
                    label: 'weekStart',
                    url: '/demo/rangeTime/weekStart'
                },
                {
                    label: 'gr',
                    url: '/demo/rangeTime/gr'
                },
                {
                    label: 'recommended',
                    url: '/demo/rangeTime/recommended'
                },
                {
                    label: 'grItems',
                    url: '/demo/rangeTime/grItems'
                },
                {
                    label: 'refreshInterval',
                    url: '/demo/rangeTime/refreshInterval'
                },
            ]
        },
        {
            title: 'Pagination',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/pagination/basic'
                },
                {
                    label: 'with-table-data',
                    url: '/demo/pagination/with-table-data'
                },
            ]
        },
        {
            title: 'Tag',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/tag/basic'
                }
            ]
        },
        {
            title: 'Tabs',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/tabs/basic'
                },
                {
                    label: 'dynamicTab',
                    url: '/demo/tabs/dynamicTab'
                },
                {
                    label: 'withInput',
                    url: '/demo/tabs/withInput'
                },
                {
                    label: 'withNgFor',
                    url: '/demo/tabs/withNgFor'
                },
                {
                    label: 'hideTab',
                    url: '/demo/tabs/hideTab'
                },
                {
                    label: 'showTab',
                    url: '/demo/tabs/showTab'
                },
                {
                    label: 'removeTab',
                    url: '/demo/tabs/removeTab'
                },
            ]
        },
        {
            title: 'ComboSelect',
            navList: [
                {
                    label: 'basic',
                    url: '/demo/combo-select/basic'
                },
                {
                    label: 'multiple',
                    url: '/demo/combo-select/multiple'
                },
                {
                    label: 'autoWidth',
                    url: '/demo/combo-select/autoWidth'
                },
                {
                    label: 'labelField',
                    url: '/demo/combo-select/labelField'
                },
                {
                    label: 'change',
                    url: '/demo/combo-select/change'
                },
                {
                    label: 'open',
                    url: '/demo/combo-select/open'
                },
                {
                    label: 'disable',
                    url: '/demo/combo-select/disable'
                },
                {
                    label: 'editable',
                    url: '/demo/combo-select/editable'
                },
                {
                    label: 'collapse',
                    url: '/demo/combo-select/collapse'
                },
                {
                    label: 'setWidth',
                    url: '/demo/combo-select/setWidth'
                },
            ]
        },
        {
            title: 'Slider',
            navList: [
                {
                    label: 'slider 全家桶',
                    url: '/demo/slider/basic'
                },
                {
                    label: 'slider 单独的垂直滚动条',
                    url: '/demo/slider/vertical'
                }
            ]
        },
        {
            title: 'Tree',
            navList: [
                {
                    label: 'tree',
                    url: '/demo/tree/basic'
                },
                {
                    label: 'dataFromAjax',
                    url: '/demo/tree/dataFromAjax'
                },
                {
                    label: 'editable',
                    url: '/demo/tree/editable'
                },
                {
                    label: 'async',
                    url: '/demo/tree/async'
                },
            ]
        },
        {
            title: 'Collapse',
            navList: [
                {
                    label: 'collapse 全家桶',
                    url: '/demo/collapse/basic'
                },
                {
                    label: 'ngFor',
                    url: '/demo/collapse/ngFor'
                }
            ]
        },
        {
            title: 'Tooltip',
            navList: [
                {
                    label: 'in-dom',
                    url: '/demo/tooltip/in-dom'
                },
                {
                    label: 'dialog',
                    url: '/demo/tooltip/dialog'
                },
                {
                    label: 'inline',
                    url: '/demo/tooltip/inline'
                },
            ]
        },
    ].sort((a, b) => a.title.localeCompare(b.title));

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
                loadChildren: './alert/demo.module#AlertDemoModule'
            },
            {
                path: 'array-collection',
                loadChildren: './array-collection/demo.module#ArrayCollectionDemoModule'
            },
            {
                path: 'button',
                loadChildren: './button/demo.module#ButtonDemoModule'
            },
            {
                path: 'checkbox',
                loadChildren: './checkbox/demo.module#CheckBoxDemoModule'
            },
            {
                path: 'loading',
                loadChildren: './loading/demo.module#LoadingDemoModule'
            },
            {
                path: 'input',
                loadChildren: './input/demo.module#InputDemoModule'
            },
            {
                path: 'popup',
                loadChildren: './popup/demo.module#PopupDemoModule'
            },
            {
                path: 'scrollbar',
                loadChildren: './scrollbar/demo.module#ScrollbarDemoModule'
            },
            {
                path: 'select',
                loadChildren: './select/demo.module#SelectDemoModule'
            },
            {
                path: 'table',
                loadChildren: './table/demo.module#TableDemoModule'
            },
            {
                path: 'switch',
                loadChildren: './switch/switch-demo.module#SwitchDemoModule'
            },
            {
                path: 'time',
                loadChildren: './time/time-demo.module#TimeDemoModule'
            },
            {
                path: 'radio',
                loadChildren: './radio/radio-demo.module#RadioDemoModule'
            },
            {
                path: 'tileselect',
                loadChildren: './tileselect/tileselect-demo.module#TileSelectDemoModule'
            },
            {
                path: 'graph',
                loadChildren: './graph/graph-demo.module#GraphDemoModule'
            },
            {
                path: 'pagination',
                loadChildren: './pagination/pagination-demo.module#PaginationDemoModule'
            },
            {
                path: 'tag',
                loadChildren: './tag/tag-demo.module#TagDemoModule'
            },
            {
                path: 'tabs',
                loadChildren: './tabs/tabs-demo.module#TabsDemoModule'
            },
            {
                path: 'combo-select',
                loadChildren: './combo-select/combo-select-demo.module#ComboSelectDemoModule'
            },
            {
                path: 'slider',
                loadChildren: './slider/slider-demo.module#SliderDemoModule'
            },
            {
                path:'tree',
                loadChildren:'./tree/demo.module#ZtreeDemoModule'
            },
            {
                path: 'collapse',
                loadChildren: './collapse/collapse-module#CollapseDemoModule'
            },
            {
                path: 'dialog',
                loadChildren: './dialog/demo.module#DialogDemoModule'
            },{
                path: 'rangeTime',
                loadChildren: './range-time/range-time-demo.module#RangeTimeDemoModule'
            },
            {
                path: 'tooltip',
                loadChildren: './tooltip/demo.module#TooltipDemoModule'
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
        CommonModule,
        RdkCollapseModule,
        RdkScrollBarModule
    ],
    exports: [],
    declarations: [
        DemoListComponent
    ],
    providers: [],
})
export class DemoListModule {
    constructor(){

    }


}
