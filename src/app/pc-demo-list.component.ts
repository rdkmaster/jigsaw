import {Component} from "@angular/core";
import {routerConfig as alertConfig} from "./demo/pc/alert/demo-set.module";
import {routerConfig as autoCompleteInputConfig} from "./demo/pc/auto-complete-input/demo-set.module";
import {routerConfig as arrayCollectionConfig} from "./demo/pc/data-encapsulation/demo-set.module";
import {routerConfig as boxConfig} from "./demo/pc/box/demo-set.module";
import {routerConfig as buttonConfig} from "./demo/pc/button/demo-set.module";
import {routerConfig as buttonBarConfig} from "./demo/pc/button-bar/demo-set.module";
import {routerConfig as cascadeConfig} from "./demo/pc/cascade/demo-set.module";
import {routerConfig as checkboxConfig} from "./demo/pc/checkbox/demo-set.module";
import {routerConfig as collapseConfig} from "./demo/pc/collapse/demo-set.module";
import {routerConfig as comboSelectConfig} from "./demo/pc/combo-select/demo-set.module";
import {routerConfig as dialogConfig} from "./demo/pc/dialog/demo-set.module";
import {routerConfig as dragDropConfig} from "./demo/pc/drag-drop/demo-set.module";
import {routerConfig as drawerConfig} from "./demo/pc/drawer/demo-set.module";
import {routerConfig as editableBoxConfig} from "./demo/pc/editable-box/demo-set.module";
import {routerConfig as fishBoneConfig} from "./demo/pc/fish-bone/demo-set.module";
import {routerConfig as floatConfig} from "./demo/pc/float/demo-set.module";
import {routerConfig as formConfig} from "./demo/pc/form/demo-set.module";
import {routerConfig as graphConfig} from "./demo/pc/graph/demo-set.module";
import {routerConfig as i18nConfig} from "./demo/pc/i18n/demo-set.module";
import {routerConfig as inputConfig} from "./demo/pc/input/demo-set.module";
import {routerConfig as numericInputConfig} from "./demo/pc/numeric-input/demo-set.module";
import {routerConfig as listConfig} from "./demo/pc/list/demo-set.module";
import {routerConfig as listLiteConfig} from "./demo/pc/list-lite/demo-set.module";
import {routerConfig as loadingConfig} from "./demo/pc/loading/demo-set.module";
import {routerConfig as miscConfig} from "./demo/pc/misc/demo-set.module";
import {routerConfig as movableConfig} from "./demo/pc/movable/demo-set.module";
import {routerConfig as notificationConfig} from "./demo/pc/notification/demo-set.module";
import {routerConfig as paginationConfig} from "./demo/pc/pagination/demo-set.module";
import {routerConfig as popupConfig} from "./demo/pc/popup/demo-set.module";
import {routerConfig as radioConfig} from "./demo/pc/radio-group/demo-set.module";
import {routerConfig as radioLiteConfig} from "./demo/pc/radio-lite/demo-set.module";
import {routerConfig as rateConfig} from "./demo/pc/rate/demo-set.module";
import {routerConfig as rangeTimeConfig} from "./demo/pc/range-time/demo-set.module";
import {routerConfig as scrollbarConfig} from "./demo/pc/scrollbar/demo-set.module";
import {routerConfig as selectConfig} from "./demo/pc/select/demo-set.module";
import {routerConfig as sliderConfig} from "./demo/pc/slider/demo-set.module";
import {routerConfig as stepsConfig} from "./demo/pc/steps/demo-set.module";
import {routerConfig as switchConfig} from "./demo/pc/switch/demo-set.module";
import {routerConfig as tableConfig} from "./demo/pc/table/demo-set.module";
import {routerConfig as tabsConfig} from "./demo/pc/tab/demo-set.module";
import {routerConfig as tagConfig} from "./demo/pc/tag/demo-set.module";
import {routerConfig as textareaConfig} from "./demo/pc/textarea/demo-set.module";
import {routerConfig as tileConfig} from "./demo/pc/tile/demo-set.module";
import {routerConfig as tileLiteConfig} from "./demo/pc/tile-lite/demo-set.module";
import {routerConfig as timeConfig} from "./demo/pc/time/demo-set.module";
import {routerConfig as tooltipConfig} from "./demo/pc/tooltip/demo-set.module";
import {routerConfig as treeConfig} from "./demo/pc/tree/demo-set.module";
import {routerConfig as trustedHtmlConfig} from "./demo/pc/trusted-html/demo-set.module";
import {routerConfig as uploadConfig} from "./demo/pc/upload/demo-set.module";
import {routerConfig as iconConfig} from "./demo/pc/icon/demo-set.module";
import {routerConfig as transferConfig} from "./demo/pc/transfer/demo-set.module";
import {routerConfig as breadcrumbConfig} from "./demo/pc/breadcrumb/demo-set.module";
import {routerConfigPC} from "./router-config";

@Component({
    template: `
        <div *ngFor="let router of routes">
            <h3>{{router.path.replace('pc/','')}}</h3>
            <hr>
            <a *ngFor="let childRouter of router.childRouters"
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
export class PCDemoListComponent {
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
        const rc = routerConfigPC.concat().sort((item1, item2) => item1.path.localeCompare(item2.path));
        rc.splice(0, 2);
        this._mergeRoutes(rc);
        return rc;
    }

    private static _mergeRoutes(routerConfig: any[]) {
        this._addRouterConfig(routerConfig, 'alert', alertConfig);
        this._addRouterConfig(routerConfig, 'auto-complete-input', autoCompleteInputConfig);
        this._addRouterConfig(routerConfig, 'data-encapsulation', arrayCollectionConfig);
        this._addRouterConfig(routerConfig, 'box', boxConfig);
        this._addRouterConfig(routerConfig, 'button', buttonConfig);
        this._addRouterConfig(routerConfig, 'button-bar', buttonBarConfig);
        this._addRouterConfig(routerConfig, 'cascade', cascadeConfig);
        this._addRouterConfig(routerConfig, 'checkbox', checkboxConfig);
        this._addRouterConfig(routerConfig, 'collapse', collapseConfig);
        this._addRouterConfig(routerConfig, 'combo-select', comboSelectConfig);
        this._addRouterConfig(routerConfig, 'dialog', dialogConfig);
        this._addRouterConfig(routerConfig, 'drag-drop', dragDropConfig);
        this._addRouterConfig(routerConfig, 'drawer', drawerConfig);
        this._addRouterConfig(routerConfig, 'editable-box', editableBoxConfig);
        this._addRouterConfig(routerConfig, 'fish-bone', fishBoneConfig);
        this._addRouterConfig(routerConfig, 'float', floatConfig);
        this._addRouterConfig(routerConfig, 'form', formConfig);
        this._addRouterConfig(routerConfig, 'graph', graphConfig);
        this._addRouterConfig(routerConfig, 'i18n', i18nConfig);
        this._addRouterConfig(routerConfig, 'input', inputConfig);
        this._addRouterConfig(routerConfig, 'numeric-input', numericInputConfig);
        this._addRouterConfig(routerConfig, 'list', listConfig);
        this._addRouterConfig(routerConfig, 'list-lite', listLiteConfig);
        this._addRouterConfig(routerConfig, 'loading', loadingConfig);
        this._addRouterConfig(routerConfig, 'misc', miscConfig);
        this._addRouterConfig(routerConfig, 'movable', movableConfig);
        this._addRouterConfig(routerConfig, 'notification', notificationConfig);
        this._addRouterConfig(routerConfig, 'pagination', paginationConfig);
        this._addRouterConfig(routerConfig, 'popup', popupConfig);
        this._addRouterConfig(routerConfig, 'radio-group', radioConfig);
        this._addRouterConfig(routerConfig, 'radio-lite', radioLiteConfig);
        this._addRouterConfig(routerConfig, 'rate', rateConfig);
        this._addRouterConfig(routerConfig, 'range-time', rangeTimeConfig);
        this._addRouterConfig(routerConfig, 'scrollbar', scrollbarConfig);
        this._addRouterConfig(routerConfig, 'select', selectConfig);
        this._addRouterConfig(routerConfig, 'slider', sliderConfig);
        this._addRouterConfig(routerConfig, 'steps', stepsConfig);
        this._addRouterConfig(routerConfig, 'switch', switchConfig);
        this._addRouterConfig(routerConfig, 'table', tableConfig);
        this._addRouterConfig(routerConfig, 'tab', tabsConfig);
        this._addRouterConfig(routerConfig, 'tag', tagConfig);
        this._addRouterConfig(routerConfig, 'textarea', textareaConfig);
        this._addRouterConfig(routerConfig, 'tile', tileConfig);
        this._addRouterConfig(routerConfig, 'tile-lite', tileLiteConfig);
        this._addRouterConfig(routerConfig, 'time', timeConfig);
        this._addRouterConfig(routerConfig, 'tooltip', tooltipConfig);
        this._addRouterConfig(routerConfig, 'tree', treeConfig);
        this._addRouterConfig(routerConfig, 'trusted-html', trustedHtmlConfig);
        this._addRouterConfig(routerConfig, 'upload', uploadConfig);
        this._addRouterConfig(routerConfig, 'icon', iconConfig);
        this._addRouterConfig(routerConfig, 'transfer', transferConfig);
        this._addRouterConfig(routerConfig, 'breadcrumb', breadcrumbConfig);
    }

    private static _addRouterConfig(routerConfig: any[], path: string, childConfig: any[]) {
        const cfg: any = routerConfig.find(item => item.path === 'pc/' + path);
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
