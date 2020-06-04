import {NgModule} from "@angular/core";
import {JigsawDrawerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerInDrawerDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule],
    declarations: [DrawerInDrawerDemoComponent],
    exports: [DrawerInDrawerDemoComponent]
})
export class DrawerInDrawerDemoModule {
}
