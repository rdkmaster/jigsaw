import {NgModule} from "@angular/core";
import {JigsawDrawerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerInDrawerDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [DrawerInDrawerDemoComponent],
    exports: [DrawerInDrawerDemoComponent]
})
export class DrawerInDrawerDemoModule {
}
