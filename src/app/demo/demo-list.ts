import {NgModule, Component, ElementRef, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";
import {AffixUtils} from "jigsaw/core/utils/internal-utils";

@Component({
    selector: 'jigsaw-demo-list',
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
                    url: '/alert/in-dom'
                },
                {
                    label: 'popup',
                    url: '/alert/popup'
                },
                {
                    label: 'customized',
                    url: '/alert/customized'
                }
            ]
        },
        {
            title: 'ArrayCollection',
            navList: [
                {
                    label: 'ajax',
                    url: '/array-collection/ajax'
                },
                {
                    label: 'basic',
                    url: '/array-collection/basic'
                },
                {
                    label: 'server side pagination',
                    url: '/array-collection/server-side-pagination'
                }
            ]
        },
        {
            title: 'Button',
            navList: [
                {
                    label: 'basic',
                    url: '/button/basic'
                },
                {
                    label: 'disable',
                    url: '/button/disable'
                },
                {
                    label: 'width_height',
                    url: '/button/width_height'
                },
                {
                    label: 'preset',
                    url: '/button/preset'
                },
                {
                    label: 'with-loading-inside',
                    url: '/button/with-loading'
                },
                {
                    label: 'with-loading-outside',
                    url: '/loading/domInner'
                }
            ]
        },
        {
            title: 'CheckBox',
            navList: [
                {
                    label: 'basic',
                    url: '/checkbox/basic'
                },
                {
                    label: 'disable',
                    url: '/checkbox/disable'
                }
            ]
        },
        {
            title: 'Loading',
            navList: [
                {
                    label: 'basic',
                    url: '/loading/basic'
                },
                {
                    label: 'ballLoading',
                    url: '/loading/ballLoading'
                },
                {
                    label: 'userDefined',
                    url: '/loading/userDefined'
                },
                {
                    label: 'with-loading-inside',
                    url: '/button/with-loading'
                },
                {
                    label: 'with-loading-outside',
                    url: '/loading/domInner'
                },
                {
                    label: 'color',
                    url: '/loading/color'
                },
            ]
        },
        {
            title: 'Switch',
            navList: [
                {
                    label: 'basic',
                    url: '/switch/basic'
                }
            ]
        },
        {
            title: 'Table',
            navList: [
                {
                    label: 'basic',
                    url: '/table/basic'
                },
                {
                    label: 'renderer',
                    url: '/table/renderer'
                },
                {
                    label: 'performs',
                    url: '/table/performs'
                },
                {
                    label: 'setColumnWidth',
                    url: '/table/setColumnWidth'
                },
                {
                    label: 'setColumnVisible',
                    url: '/table/setColumnVisible'
                },
                {
                    label: 'setHeaderRender',
                    url: '/table/setHeaderRender'
                },
                {
                    label: 'setHeaderClass',
                    url: '/table/setHeaderClass'
                },
                {
                    label: 'setHeaderSort',
                    url: '/table/setHeaderSort'
                },
                {
                    label: 'setCellRender',
                    url: '/table/setCellRender'
                },
                {
                    label: 'setCellClass',
                    url: '/table/setCellClass'
                },
                {
                    label: 'setCellEditable',
                    url: '/table/setCellEditable'
                },
                {
                    label: 'setColumnGroup',
                    url: '/table/setColumnGroup'
                },
                {
                    label: 'addColumn',
                    url: '/table/addColumn'
                },
                {
                    label: 'addIDColumn',
                    url: '/table/addIDColumn'
                },
                {
                    label: 'addCheckboxColumn',
                    url: '/table/addCheckboxColumn'
                },
                {
                    label: 'fixedHead',
                    url: '/table/fixedHead'
                },
                {
                    label: 'pageable',
                    url: '/table/pageable'
                },
                {
                    label: 'dataFromAjax',
                    url: '/table/dataFromAjax'
                },
                {
                    label: 'scrollAmount',
                    url: '/table/scrollAmount'
                },
                {
                    label: 'withPopup',
                    url: '/table/withPopup'
                },
                {
                    label: 'dataChange',
                    url: '/table/dataChange'
                },
                {
                    label: 'addIDWithPaging',
                    url: '/table/addIDWithPaging'
                },
                {
                    label: 'addIDWithDebouncePaging',
                    url: '/table/addIDWithDebouncePaging'
                },
                {
                    label: 'rendererOfTemplateRef',
                    url: '/table/rendererOfTemplateRef'
                },
                {
                    label: 'lineEllipsis',
                    url: '/table/lineEllipsis'
                }, {
                    label: 'localPaging',
                    url: '/table/localPaging'
                },
            ]
        },
        {
            title: 'Dialog',
            navList: [
                {
                    label: 'title',
                    url: '/dialog/title'
                },
                {
                    label: 'buttons',
                    url: '/dialog/buttons'
                },
                {
                    label: 'top',
                    url: '/dialog/top'
                },
                {
                    label: 'popOption',
                    url: '/dialog/popOption'
                },
                {
                    label: 'in-dom',
                    url: '/dialog/in-dom'
                },
                {
                    label: 'misc',
                    url: '/dialog/misc'
                }
            ]
        },
        {
            title: 'Popup',
            navList: [
                {
                    label: 'tracing-event',
                    url: '/popup/tracing-event'
                },
                {
                    label: 'alert-popup',
                    url: '/alert/popup'
                },
                {
                    label: 'dialog-popOption',
                    url: '/dialog/popOption'
                },
                {
                    label: 'dialog-misc',
                    url: '/dialog/misc'
                },
                {
                    label: 'tooltip-dialog',
                    url: '/tooltip/dialog'
                }
            ]
        },
        {
            title: 'Input',
            navList: [
                {
                    label: 'basic',
                    url: '/input/basic'
                },
                {
                    label: 'valueChange',
                    url: '/input/valueChange'
                },
                {
                    label: 'focus',
                    url: '/input/focus'
                },
                {
                    label: 'prefixIcon',
                    url: '/input/prefixIcon'
                },
            ]
        },
        {
            title: 'Scrollbar',
            navList: [
                {
                    label: 'basic',
                    url: '/scrollbar/basic'
                },
                {
                    label: 'user-define',
                    url: '/scrollbar/user-define'
                },
                {
                    label: 'setOptions',
                    url: '/scrollbar/setOptions'
                },
            ]
        },
        {
            title: 'Select',
            navList: [
                {
                    label: 'basic',
                    url: '/select/basic'
                },
                {
                    label: 'scroll',
                    url: '/select/scroll'
                },
                /*{
                    label: 'checkbox',
                    url: '/select/checkbox'
                },*/
            ]
        },
        {
            title: 'Radio',
            navList: [
                {
                    label: 'basic',
                    url: '/radio/basic'
                },
                {
                    label: 'labelField',
                    url: '/radio/labelField'
                },
                {
                    label: 'trackItemBy',
                    url: '/radio/trackItemBy'
                },
            ]
        },
        {
            title: 'Graph',
            navList: [
                {
                    label: 'basic',
                    url: '/graph/basic'
                },
                {
                    label: 'resize',
                    url: '/graph/resize'
                },
                {
                    label: 'line-bar-graph-basic',
                    url: '/graph/line-bar-graph-basic'
                },
                {
                    label: 'line-bar-graph-ajax',
                    url: '/graph/line-bar-graph-ajax'
                },
                {
                    label: 'pie-graph-basic',
                    url: '/graph/pie-graph-basic'
                },
                {
                    label: 'noData',
                    url: '/graph/noData'
                },
            ]
        },
        {
            title: 'TileSelect',
            navList: [
                {
                    label: 'basic',
                    url: '/tileselect/basic'
                },
                {
                    label: 'SelectedItems',
                    url: '/tileselect/SelectedItems'
                },
                {
                    label: 'MultipleSelect',
                    url: '/tileselect/MultipleSelect'
                },
                {
                    label: 'tileOptionWidth',
                    url: '/tileselect/tileOptionWidth'
                },
                {
                    label: 'searchable',
                    url: '/tileselect/searchable'
                },
                {
                    label: 'labelField',
                    url: '/tileselect/labelField'
                },
                {
                    label: 'ItemsChange',
                    url: '/tileselect/ItemsChange'
                },
                {
                    label: 'trackitemby',
                    url: '/tileselect/trackitemby'
                },
            ]
        },
        {
            title: 'Time',
            navList: [
                {
                    label: 'basic',
                    url: '/time/basic'
                },
                {
                    label: 'limitEnd',
                    url: '/time/limitEnd'
                },
                {
                    label: 'limitStart',
                    url: '/time/limitStart'
                },
                {
                    label: 'weekStart',
                    url: '/time/weekStart'
                },
                {
                    label: 'gr',
                    url: '/time/gr'
                },
                {
                    label: 'recommended',
                    url: '/time/recommended'
                },
                {
                    label: 'grItems',
                    url: '/time/grItems'
                },
                {
                    label: 'refreshInterval',
                    url: '/time/refreshInterval'
                },
                {
                    label: 'withComboSelect',
                    url: '/time/withComboSelect'
                },
            ]
        },
        {
            title: 'RangeTime',
            navList: [
                {
                    label: 'basic',
                    url: '/rangeTime/basic'
                },
                {
                    label: 'limitEnd',
                    url: '/rangeTime/limitEnd'
                },
                {
                    label: 'limitStart',
                    url: '/rangeTime/limitStart'
                },
                {
                    label: 'weekStart',
                    url: '/rangeTime/weekStart'
                },
                {
                    label: 'gr',
                    url: '/rangeTime/gr'
                },
                {
                    label: 'recommended',
                    url: '/rangeTime/recommended'
                },
                {
                    label: 'grItems',
                    url: '/rangeTime/grItems'
                },
                {
                    label: 'refreshInterval',
                    url: '/rangeTime/refreshInterval'
                },
            ]
        },
        {
            title: 'Pagination',
            navList: [
                {
                    label: 'basic',
                    url: '/pagination/basic'
                },
                {
                    label: 'with-table-data',
                    url: '/pagination/with-table-data'
                },
            ]
        },
        {
            title: 'Tag',
            navList: [
                {
                    label: 'basic',
                    url: '/tag/basic'
                }
            ]
        },
        {
            title: 'Tabs',
            navList: [
                {
                    label: 'basic',
                    url: '/tabs/basic'
                },
                {
                    label: 'dynamicTab',
                    url: '/tabs/dynamicTab'
                },
                {
                    label: 'withInputAndTable',
                    url: '/tabs/withInputAndTable'
                },
                {
                    label: 'withNgFor',
                    url: '/tabs/withNgFor'
                },
                {
                    label: 'hideTab',
                    url: '/tabs/hideTab'
                },
                {
                    label: 'showTab',
                    url: '/tabs/showTab'
                },
                {
                    label: 'removeTab',
                    url: '/tabs/removeTab'
                },
            ]
        },
        {
            title: 'ComboSelect',
            navList: [
                {
                    label: 'basic',
                    url: '/combo-select/basic'
                },
                {
                    label: 'multiple',
                    url: '/combo-select/multiple'
                },
                {
                    label: 'autoWidth',
                    url: '/combo-select/autoWidth'
                },
                {
                    label: 'labelField',
                    url: '/combo-select/labelField'
                },
                {
                    label: 'change',
                    url: '/combo-select/change'
                },
                {
                    label: 'open',
                    url: '/combo-select/open'
                },
                {
                    label: 'disable',
                    url: '/combo-select/disable'
                },
                {
                    label: 'editable',
                    url: '/combo-select/editable'
                },
                {
                    label: 'collapse',
                    url: '/combo-select/collapse'
                },
                {
                    label: 'setWidth',
                    url: '/combo-select/setWidth'
                },
            ]
        },
        {
            title: 'Slider',
            navList: [
                {
                    label: 'slider 全家桶',
                    url: '/slider/basic'
                },
                {
                    label: 'slider 单独的垂直滚动条',
                    url: '/slider/vertical'
                }
            ]
        },
        {
            title: 'Tree',
            navList: [
                {
                    label: 'tree',
                    url: '/tree/basic'
                },
                {
                    label: 'dataFromAjax',
                    url: '/tree/dataFromAjax'
                },
                {
                    label: 'editable',
                    url: '/tree/editable'
                },
                {
                    label: 'async',
                    url: '/tree/async'
                },
            ]
        },
        {
            title: 'Collapse',
            navList: [
                {
                    label: 'collapse 全家桶',
                    url: '/collapse/basic'
                },
                {
                    label: 'ngFor',
                    url: '/collapse/ngFor'
                }
            ]
        },
        {
            title: 'Tooltip',
            navList: [
                {
                    label: 'in-dom',
                    url: '/tooltip/in-dom'
                },
                {
                    label: 'dialog',
                    url: '/tooltip/dialog'
                },
                {
                    label: 'inline',
                    url: '/tooltip/inline'
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
        JigsawCollapseModule,
        JigsawScrollBarModule
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
