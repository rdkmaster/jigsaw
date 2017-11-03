import {Component} from "@angular/core";
import {routerConfig as alertConfig} from "./demo/alert/demo.module";
import {routerConfig as arrayCollectionConfig} from "./demo/array-collection/demo.module";
import {routerConfig as buttonConfig} from "./demo/button/demo.module";
import {routerConfig as checkboxConfig} from "./demo/checkbox/demo.module";
import {routerConfig as collapseConfig} from "./demo/collapse/demo.module";
import {routerConfig as comboSelectConfig} from "./demo/combo-select/demo.module";
import {routerConfig as dialogConfig} from "./demo/dialog/demo.module";
import {routerConfig as dragDropConfig} from "./demo/drag-drop/demo.module";
import {routerConfig as fishBoneConfig} from "./demo/fish-bone/demo.module";
import {routerConfig as formConfig} from "./demo/form/demo.module";
import {routerConfig as graphConfig} from "./demo/graph/demo.module";
import {routerConfig as i18nConfig} from "./demo/i18n/demo.module";
import {routerConfig as inputConfig} from "./demo/input/demo.module";
import {routerConfig as listConfig} from "./demo/list/demo.module";
import {routerConfig as loadingConfig} from "./demo/loading/demo.module";
import {routerConfig as miscConfig} from "./demo/misc/demo.module";
import {routerConfig as paginationConfig} from "./demo/pagination/demo.module";
import {routerConfig as radioConfig} from "./demo/radio/demo.module";
import {routerConfig as rangeTimeConfig} from "./demo/range-time/demo.module";
import {routerConfig as scrollbarConfig} from "./demo/scrollbar/demo.module";
import {routerConfig as selectConfig} from "./demo/select/demo.module";
import {routerConfig as sliderConfig} from "./demo/slider/demo.module";
import {routerConfig as switchConfig} from "./demo/switch/demo.module";
import {routerConfig as tableConfig} from "./demo/table/demo.module";
import {routerConfig as tabsConfig} from "./demo/tabs/demo.module";
import {routerConfig as tagConfig} from "./demo/tag/demo.module";
import {routerConfig as tileConfig} from "./demo/tile/demo.module";
import {routerConfig as timeConfig} from "./demo/time/demo.module";
import {routerConfig as tooltipConfig} from "./demo/tooltip/demo.module";
import {routerConfig as treeConfig} from "./demo/tree/demo.module";
import {routerConfig as trustedHtmlConfig} from "./demo/trusted-html/demo.module";

@Component({
    template: `
        <div *ngFor="let route of routes">
            <h2>{{route.path}}</h2>
            <hr>
            <ul *ngFor="let child of route.childRoutes">
                <li><a routerLink="{{route.path}}/{{child.path}}">{{child.path}}</a></li>
            </ul>
        </div>
    `,
    styles: [`
        ul li {
            display: inline;
        }
    `]
})
export class DemoListComponent {
    public static routerConfig = [
        {
            path: "alert",
            loadChildren: "./demo/alert/demo.module#AlertDemoModule",
        },
        {
            path: "array-collection",
            loadChildren: "./demo/array-collection/demo.module#ArrayCollectionDemoModule",
        },
        {
            path: "button",
            loadChildren: "./demo/button/demo.module#ButtonDemoModule",
        },
        {
            path: "checkbox",
            loadChildren: "./demo/checkbox/demo.module#CheckBoxDemoModule",
        },
        {
            path: "collapse",
            loadChildren: "./demo/collapse/demo.module#CollapseDemoModule",
        },
        {
            path: "combo-select",
            loadChildren: "./demo/combo-select/demo.module#ComboSelectDemoModule",
        },
        {
            path: "dialog",
            loadChildren: "./demo/dialog/demo.module#DialogDemoModule",
        },
        {
            path: "drag-drop",
            loadChildren: "./demo/drag-drop/demo.module#DragDropDemoModule",
        },
        {
            path: "fish-bone",
            loadChildren: "./demo/fish-bone/demo.module#FishBoneDemoModule",
        },
        {
            path: "form",
            loadChildren: "./demo/form/demo.module#FormDemoModule",
        },
        {
            path: "graph",
            loadChildren: "./demo/graph/demo.module#GraphDemoModule",
        },
        {
            path: "i18n",
            loadChildren: "./demo/i18n/demo.module#I18nDemoModule",
        },
        {
            path: "input",
            loadChildren: "./demo/input/demo.module#InputDemoModule",
        },
        {
            path: "list",
            loadChildren: "./demo/list/demo.module#ListDemoModule",
        },
        {
            path: "loading",
            loadChildren: "./demo/loading/demo.module#LoadingDemoModule",
        },
        {
            path: "misc",
            loadChildren: "./demo/misc/demo.module#MiscDemoModule",
        },
        {
            path: "pagination",
            loadChildren: "./demo/pagination/demo.module#PaginationDemoModule",
        },
        // {
        //     path: "popup",
        //     childRoutes: [
        //         "/alert/popup", "/dialog/popup-option", "/dialog/misc"
        //     ]
        // },
        {
            path: "radio",
            loadChildren: "./demo/radio/demo.module#RadioDemoModule",
        },
        {
            path: "range-time",
            loadChildren: "./demo/range-time/demo.module#RangeTimeDemoModule",
        },
        {
            path: "scrollbar",
            loadChildren: "./demo/scrollbar/demo.module#ScrollbarDemoModule",
        },
        {
            path: "select",
            loadChildren: "./demo/select/demo.module#SelectDemoModule",
        },
        {
            path: "slider",
            loadChildren: "./demo/slider/demo.module#SliderDemoModule",
        },
        {
            path: "switch",
            loadChildren: "./demo/switch/demo.module#SwitchDemoModule",
        },
        {
            path: "table",
            loadChildren: "./demo/table/demo.module#TableDemoModule",
        },
        {
            path: "tabs",
            loadChildren: "./demo/tabs/demo.module#TabsDemoModule",
        },
        {
            path: "tag",
            loadChildren: "./demo/tag/demo.module#TagDemoModule",
        },
        {
            path: "tile",
            loadChildren: "./demo/tile/demo.module#TileSelectDemoModule",
        },
        {
            path: "time",
            loadChildren: "./demo/time/demo.module#TimeDemoModule",
        },
        {
            path: "tooltip",
            loadChildren: "./demo/tooltip/demo.module#TooltipDemoModule",
        },
        {
            path: "tree",
            loadChildren: "./demo/tree/demo.module#ZtreeDemoModule",
        },
        {
            path: "trusted-html",
            loadChildren: "./demo/trusted-html/demo.module#TrustedHtmlDemoModule",
        },
        {
            path: '', component: DemoListComponent
        },
        {
            path: '**', redirectTo: ''
        },
    ];

    routes: any[] = DemoListComponent.routerConfig.concat();

    constructor() {
        this._addRouterConfig('alert', alertConfig);
        this._addRouterConfig('array-collection', arrayCollectionConfig);
        this._addRouterConfig('button', buttonConfig);
        this._addRouterConfig('checkbox', checkboxConfig);
        this._addRouterConfig('collapse', collapseConfig);
        this._addRouterConfig('combo-select', comboSelectConfig);
        this._addRouterConfig('dialog', dialogConfig);
        this._addRouterConfig('drag-drop', dragDropConfig);
        this._addRouterConfig('fish-bone', fishBoneConfig);
        this._addRouterConfig('form', formConfig);
        this._addRouterConfig('graph', graphConfig);
        this._addRouterConfig('i18n', i18nConfig);
        this._addRouterConfig('input', inputConfig);
        this._addRouterConfig('list', listConfig);
        this._addRouterConfig('loading', loadingConfig);
        this._addRouterConfig('misc', miscConfig);
        this._addRouterConfig('pagination', paginationConfig);
        this._addRouterConfig('radio', radioConfig);
        this._addRouterConfig('range-time', rangeTimeConfig);
        this._addRouterConfig('scrollbar', scrollbarConfig);
        this._addRouterConfig('select', selectConfig);
        this._addRouterConfig('slider', sliderConfig);
        this._addRouterConfig('switch', switchConfig);
        this._addRouterConfig('table', tableConfig);
        this._addRouterConfig('tabs', tabsConfig);
        this._addRouterConfig('tag', tagConfig);
        this._addRouterConfig('tile', tileConfig);
        this._addRouterConfig('time', timeConfig);
        this._addRouterConfig('tooltip', tooltipConfig);
        this._addRouterConfig('tree', treeConfig);
        this._addRouterConfig('trusted-html', trustedHtmlConfig);
    }

    private _addRouterConfig(path: string, config: any[]) {
        const cfg: any = this.routes.find(item => item.path === path);
        if (!cfg) {
            console.error('ERROR: invalid router path: ' + path);
            return;
        }
        cfg.childRoutes = config;
    }
}
