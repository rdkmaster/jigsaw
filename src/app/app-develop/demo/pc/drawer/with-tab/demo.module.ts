import {NgModule} from "@angular/core";
import {JigsawDrawerModule, JigsawTabsModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {DrawerWithTabDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule, JigsawTabsModule, JigsawHeaderModule],
    declarations: [DrawerWithTabDemoComponent],
    exports: [DrawerWithTabDemoComponent]
})
export class DrawerWithTabDemoModule {

}
