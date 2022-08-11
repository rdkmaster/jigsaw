import {NgModule} from "@angular/core";
import {JigsawDrawerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DrawerWithScrollbarDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [DrawerWithScrollbarDemoComponent],
    exports: [DrawerWithScrollbarDemoComponent]
})
export class DrawerWithScrollbarDemoModule {
}
