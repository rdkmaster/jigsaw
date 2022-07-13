import {NgModule} from "@angular/core";
import {JigsawDrawerModule, JigsawTabsModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerWithTabDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule, JigsawTabsModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [DrawerWithTabDemoComponent],
    exports: [DrawerWithTabDemoComponent]
})
export class DrawerWithTabDemoModule {

}
