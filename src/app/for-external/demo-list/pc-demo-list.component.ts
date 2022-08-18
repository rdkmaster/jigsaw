import { Component, OnInit } from "@angular/core";
import { PopupPositionType } from 'jigsaw/public_api';
import { routerConfigPC, componentGroup } from "../router-config";

@Component({
    templateUrl: './pc-demo-list.component.html',
    styleUrls: ['./pc-demo-list.component.scss']
})
export class PCDemoListComponent implements OnInit {
    public floatOptions = { posType: PopupPositionType.fixed };
    public routerGroup: any[] = DemoListManager.fullRouterConfig;
    public selectedItems: any[];
    // public jComponents: string[] = this.routes.map(item => item.path);

    // showHideDemos(selectedItems: string[]) {
    //     this.routes.forEach(item => {
    //         item.hidden = !selectedItems.find(component => component === item.path)
    //     })
    //     if (!selectedItems.length) {
    //         this.routes.forEach(item => {
    //             item.hidden = false
    //         })
    //     }
    //     localStorage.setItem('jigsaw-demo-show-list', JSON.stringify([...selectedItems]));
    // }

    getUrl(router): string {
        return `/${router.path}`;
    }

    getDesc(childRouter): string {
        return childRouter.hasOwnProperty('desc') ? childRouter.desc : childRouter.path;
    }

    ngOnInit(): void {
        this.selectedItems = JSON.parse(localStorage.getItem('jigsaw-demo-show-list')) || [];
        // this.showHideDemos(this.selectedItems);
    }

    // onOpenChange(open: boolean) {
    //     if (open) {
    //         return;
    //     }
    //     if (this.jComponents.length == this.selectedItems.length) {
    //         this.selectedItems = [];
    //     }
    // }
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
        console.log(routerConfigPC)
        routerConfigPC.forEach(router => {
            if (router.group === undefined) {
                routerGroup.find(item => item.groupName === componentGroup.other).routers.push(router);
            } else {
                routerGroup.find(item => item.groupName === router.group).routers.push(router);
            }
        })
        return routerGroup;
    }
}

