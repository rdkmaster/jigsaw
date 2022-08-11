import { Component, OnInit } from "@angular/core";
import { PopupPositionType } from 'jigsaw/public_api';
import { routerConfigPC } from "./router-config";

@Component({
    template: `
        <div *ngFor="let router of routes; index as i">
            <span>{{i+1}}.</span>
            <a routerLink="{{getUrl(router)}}">{{router.path.replace('pc/', '')}}</a>
            <br/>
        </div>
    `
})
export class PCDemoListComponent implements OnInit {
    public floatOptions = { posType: PopupPositionType.fixed };
    public routes: any[] = DemoListManager.fullRouterConfig;
    public selectedItems: any[];
    public jComponents: string[] = this.routes.map(item => item.path);

    showHideDemos(selectedItems: string[]) {
        this.routes.forEach(item => {
            item.hidden = !selectedItems.find(component => component === item.path)
        })
        if (!selectedItems.length) {
            this.routes.forEach(item => {
                item.hidden = false
            })
        }
        localStorage.setItem('jigsaw-demo-show-list', JSON.stringify([...selectedItems]));
    }

    getUrl(router): string {
        return `/${router.path}`;
    }

    getDesc(childRouter): string {
        return childRouter.hasOwnProperty('desc') ? childRouter.desc : childRouter.path;
    }

    ngOnInit(): void {
        this.selectedItems = JSON.parse(localStorage.getItem('jigsaw-demo-show-list')) || [];
        this.showHideDemos(this.selectedItems);
    }

    onOpenChange(open: boolean) {
        if (open) {
            return;
        }
        if (this.jComponents.length == this.selectedItems.length) {
            this.selectedItems = [];
        }
    }
}

export class DemoListManager {
    public static get fullRouterConfig() {
        const rc = routerConfigPC.concat().sort((item1, item2) => item1.path.localeCompare(item2.path));
        console.log(rc);
        return rc;
    }
}
