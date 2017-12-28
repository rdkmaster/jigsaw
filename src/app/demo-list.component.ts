import {Component} from "@angular/core";
import {routerConfig as alertConfig} from "./demo/alert/demo.module";
import {routerConfig as arrayCollectionConfig} from "./demo/data-encapsulation/demo.module";
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
import {routerConfig as layoutConfig} from "./demo/layout/demo.module";
import {routerConfig as listConfig} from "./demo/list/demo.module";
import {routerConfig as loadingConfig} from "./demo/loading/demo.module";
import {routerConfig as miscConfig} from "./demo/misc/demo.module";
import {routerConfig as paginationConfig} from "./demo/pagination/demo.module";
import {routerConfig as popupConfig} from "./demo/popup/demo.module";
import {routerConfig as radioConfig} from "./demo/radio-group/demo.module";
import {routerConfig as rangeTimeConfig} from "./demo/range-time/demo.module";
import {routerConfig as scrollbarConfig} from "./demo/scrollbar/demo.module";
import {routerConfig as selectConfig} from "./demo/select/demo.module";
import {routerConfig as sliderConfig} from "./demo/slider/demo.module";
import {routerConfig as switchConfig} from "./demo/switch/demo.module";
import {routerConfig as tableConfig} from "./demo/table/demo.module";
import {routerConfig as tabsConfig} from "./demo/tab/demo.module";
import {routerConfig as tagConfig} from "./demo/tag/demo.module";
import {routerConfig as tileConfig} from "./demo/tile/demo.module";
import {routerConfig as timeConfig} from "./demo/time/demo.module";
import {routerConfig as tooltipConfig} from "./demo/tooltip/demo.module";
import {routerConfig as treeConfig} from "./demo/tree/demo.module";
import {routerConfig as trustedHtmlConfig} from "./demo/trusted-html/demo.module";
import {routerConfig} from "./router-config";

@Component({
    template: `
        <div *ngFor="let router of routes">
            <h3>{{router.path}}</h3>
            <hr>
            <a *ngFor="let childRouter of router.childRouters"
               [ngStyle]="{'font-weight': (childRouter.recommended ? 'bold' : '')}"
               routerLink="{{getUrl(router, childRouter)}}">
                {{getDesc(childRouter)}}
            </a>
        </div>
    `,
    styles: [`
        a {
            margin-right: 12px;
        }

        div {
            margin-bottom: 12px;
        }
    `]
})
export class DemoListComponent {
    routes: any[] = DemoListManager.fullRouterConfig;

    getUrl(router, childRouter): string {
        return childRouter.hasOwnProperty('url') ? childRouter.url : `/${router.path}/${childRouter.path}`;
    }

    getDesc(childRouter): string {
        return childRouter.hasOwnProperty('desc') ? childRouter.desc : childRouter.path;
    }
}

export class DemoListManager {

    public static get fullRouterConfig() {
        const rc = routerConfig.concat().sort((item1, item2) => item1.path.localeCompare(item2.path));
        rc.splice(0, 2);
        this._mergeRoutes(rc);
        return rc;
    }

    private static _mergeRoutes(routerConfig: any[]) {
        this._addRouterConfig(routerConfig, 'alert', alertConfig);
        this._addRouterConfig(routerConfig, 'data-encapsulation', arrayCollectionConfig);
        this._addRouterConfig(routerConfig, 'button', buttonConfig);
        this._addRouterConfig(routerConfig, 'checkbox', checkboxConfig);
        this._addRouterConfig(routerConfig, 'collapse', collapseConfig);
        this._addRouterConfig(routerConfig, 'combo-select', comboSelectConfig);
        this._addRouterConfig(routerConfig, 'dialog', dialogConfig);
        this._addRouterConfig(routerConfig, 'drag-drop', dragDropConfig);
        this._addRouterConfig(routerConfig, 'fish-bone', fishBoneConfig);
        this._addRouterConfig(routerConfig, 'form', formConfig);
        this._addRouterConfig(routerConfig, 'graph', graphConfig);
        this._addRouterConfig(routerConfig, 'i18n', i18nConfig);
        this._addRouterConfig(routerConfig, 'input', inputConfig);
        this._addRouterConfig(routerConfig, 'layout', layoutConfig);
        this._addRouterConfig(routerConfig, 'list', listConfig);
        this._addRouterConfig(routerConfig, 'loading', loadingConfig);
        this._addRouterConfig(routerConfig, 'misc', miscConfig);
        this._addRouterConfig(routerConfig, 'pagination', paginationConfig);
        this._addRouterConfig(routerConfig, 'popup', popupConfig);
        this._addRouterConfig(routerConfig, 'radio-group', radioConfig);
        this._addRouterConfig(routerConfig, 'range-time', rangeTimeConfig);
        this._addRouterConfig(routerConfig, 'scrollbar', scrollbarConfig);
        this._addRouterConfig(routerConfig, 'select', selectConfig);
        this._addRouterConfig(routerConfig, 'slider', sliderConfig);
        this._addRouterConfig(routerConfig, 'switch', switchConfig);
        this._addRouterConfig(routerConfig, 'table', tableConfig);
        this._addRouterConfig(routerConfig, 'tab', tabsConfig);
        this._addRouterConfig(routerConfig, 'tag', tagConfig);
        this._addRouterConfig(routerConfig, 'tile', tileConfig);
        this._addRouterConfig(routerConfig, 'time', timeConfig);
        this._addRouterConfig(routerConfig, 'tooltip', tooltipConfig);
        this._addRouterConfig(routerConfig, 'tree', treeConfig);
        this._addRouterConfig(routerConfig, 'trusted-html', trustedHtmlConfig);
    }

    private static _addRouterConfig(routerConfig: any[], path: string, childConfig: any[]) {
        const cfg: any = routerConfig.find(item => item.path === path);
        if (!cfg) {
            console.error('ERROR: invalid router path: ' + path);
            return;
        }
        cfg.childRouters = [];
        childConfig.concat()
            .sort((item1, item2) => {
                const desc1 = item1.hasOwnProperty('desc') ? item1.desc : item1.path;
                const desc2 = item1.hasOwnProperty('desc') ? item2.desc : item2.path;
                return desc1.localeCompare(desc2);
            })
            .forEach(config => cfg.childRouters.push(config));
    }
}
