import { Component, OnInit } from "@angular/core";
import { PopupPositionType } from 'jigsaw/public_api';
import { routerConfigPC, componentGroup } from "../router-config";

@Component({
    templateUrl: './pc-demo-list.component.html',
    styleUrls: ['./pc-demo-list.component.scss']
})
export class PCDemoListComponent {
    public routerGroup: any[] = DemoListManager.fullRouterConfig;

    getUrl(router): string {
        return `/${router.path}`;
    }
}

export class DemoListManager {
    public static get fullRouterConfig() {
        const routerGroup = [
            { groupName: componentGroup.general, routers: [] },
            { groupName: componentGroup.entry, routers: [] },
            { groupName: componentGroup.display, routers: [] },
            { groupName: componentGroup.navigation, routers: [] },
            { groupName: componentGroup.message, routers: [] },
            { groupName: componentGroup.container, routers: [] },
            { groupName: componentGroup.layout, routers: [] },
            { groupName: componentGroup.schema, routers: [] },
            { groupName: componentGroup.other, routers: [] }
        ]
        routerConfigPC.forEach(router => {
            if (router.group === undefined) {
                routerGroup.find(item => item.groupName === componentGroup.other).routers.push(router);
            } else {
                routerGroup.find(item => item.groupName === router.group).routers.push(router);
            }
        })
        routerGroup.forEach(group => {
            group.routers.sort((item1, item2) => item1.path.localeCompare(item2.path))
        })
        return routerGroup;
    }
}

