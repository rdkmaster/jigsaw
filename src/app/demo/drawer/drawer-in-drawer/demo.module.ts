import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawDrawerModule} from "jigsaw/component/drawer/drawer";
import {DrawerInDrawerDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule],
    declarations: [DrawerInDrawerDemoComponent],
    exports: [DrawerInDrawerDemoComponent]
})
export class DrawerInDrawerDemoModule {
}
