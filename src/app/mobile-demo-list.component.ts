import {Component} from "@angular/core";
import {routerConfig as alertConfig} from "./demo/mobile/alert/demo-set.module";
import {routerConfig as buttonConfig} from "./demo/mobile/button/demo-set.module";
import {routerConfig as buttonBarConfig} from "./demo/mobile/button-bar/demo-set.module";
import {routerConfig as checkboxConfig} from "./demo/mobile/checkbox/demo-set.module";
import {routerConfig as dialogConfig} from "./demo/mobile/dialog/demo-set.module";
import {routerConfig as floatConfig} from "./demo/mobile/float/demo-set.module";
import {routerConfig as graphConfig} from "./demo/mobile/graph/demo-set.module";
import {routerConfig as i18nConfig} from "./demo/mobile/i18n/demo-set.module";
import {routerConfig as inputConfig} from "./demo/mobile/input/demo-set.module";
import {routerConfig as listConfig} from "./demo/mobile/list/demo-set.module";
import {routerConfig as listLiteConfig} from "./demo/mobile/list-lite/demo-set.module";
import {routerConfig as loadingConfig} from "./demo/mobile/loading/demo-set.module";
import {routerConfig as movableConfig} from "./demo/mobile/movable/demo-set.module";
import {routerConfig as radioConfig} from "./demo/mobile/radio-group/demo-set.module";
import {routerConfig as radioLiteConfig} from "./demo/mobile/radio-lite/demo-set.module";
import {routerConfig as rateConfig} from "./demo/mobile/rate/demo-set.module";
import {routerConfig as scrollbarConfig} from "./demo/mobile/scrollbar/demo-set.module";
import {routerConfig as sliderConfig} from "./demo/mobile/slider/demo-set.module";
import {routerConfig as switchConfig} from "./demo/mobile/switch/demo-set.module";
import {routerConfig as tabsConfig} from "./demo/mobile/tab/demo-set.module";
import {routerConfig as tagConfig} from "./demo/mobile/tag/demo-set.module";
import {routerConfig as tileConfig} from "./demo/mobile/tile/demo-set.module";
import {routerConfig as tileLiteConfig} from "./demo/mobile/tile-lite/demo-set.module";
import {routerConfig as trustedHtmlConfig} from "./demo/mobile/trusted-html/demo-set.module";
import {routerConfig as iconConfig} from "./demo/mobile/icon/demo-set.module";
import {routerConfigMobile} from "./router-config";


@Component({
    template: `
        <div *ngFor="let router of routes">
            <h3>{{router.path.replace('mobile/','')}}</h3>
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
export class MobileDemoListComponent {
    routes: any[] = MobileDemoListManager.fullRouterConfig;

    getUrl(router, childRouter): string {
        return childRouter.hasOwnProperty('url') ? childRouter.url : `/${router.path}/${childRouter.path}`;
    }

    getDesc(childRouter): string {
        return childRouter.hasOwnProperty('desc') ? childRouter.desc : childRouter.path;
    }
}

export class MobileDemoListManager {

    public static get fullRouterConfig() {
        const rc = routerConfigMobile.concat().sort((item1, item2) => item1.path.localeCompare(item2.path));
        this._mergeRoutes(rc);
        return rc;
    }

    private static _mergeRoutes(routerConfig: any[]) {
        this._addRouterConfig(routerConfig, 'alert', alertConfig);
        this._addRouterConfig(routerConfig, 'button', buttonConfig);
        this._addRouterConfig(routerConfig, 'button-bar', buttonBarConfig);
        this._addRouterConfig(routerConfig, 'checkbox', checkboxConfig);
        this._addRouterConfig(routerConfig, 'dialog', dialogConfig);
        this._addRouterConfig(routerConfig, 'float', floatConfig);
        this._addRouterConfig(routerConfig, 'graph', graphConfig);
        this._addRouterConfig(routerConfig, 'i18n', i18nConfig);
        this._addRouterConfig(routerConfig, 'input', inputConfig);
        this._addRouterConfig(routerConfig, 'list', listConfig);
        this._addRouterConfig(routerConfig, 'list-lite', listLiteConfig);
        this._addRouterConfig(routerConfig, 'loading', loadingConfig);
        this._addRouterConfig(routerConfig, 'movable', movableConfig);
        this._addRouterConfig(routerConfig, 'radio-group', radioConfig);
        this._addRouterConfig(routerConfig, 'radio-lite', radioLiteConfig);
        this._addRouterConfig(routerConfig, 'rate', rateConfig);
        this._addRouterConfig(routerConfig, 'scrollbar', scrollbarConfig);
        this._addRouterConfig(routerConfig, 'slider', sliderConfig);
        this._addRouterConfig(routerConfig, 'switch', switchConfig);
        this._addRouterConfig(routerConfig, 'tab', tabsConfig);
        this._addRouterConfig(routerConfig, 'tag', tagConfig);
        this._addRouterConfig(routerConfig, 'tile', tileConfig);
        this._addRouterConfig(routerConfig, 'tile-lite', tileLiteConfig);
        this._addRouterConfig(routerConfig, 'trusted-html', trustedHtmlConfig);
        this._addRouterConfig(routerConfig, 'icon', iconConfig);
    }

    private static _addRouterConfig(routerConfig: any[], path: string, childConfig: any[]) {
        const cfg: any = routerConfig.find(item => item.path === 'mobile/' + path);
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
