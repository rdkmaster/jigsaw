import {Component} from "@angular/core";
import {routerConfig as buttonConfig} from "./demo/mobile/button/demo-set.module";
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
       // rc.splice(0, 2);
        this._mergeRoutes(rc);
        return rc;
    }

    private static _mergeRoutes(routerConfig: any[]) {
        this._addRouterConfig(routerConfig, 'button', buttonConfig);
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
