import {NgModule} from "@angular/core";
import {JigsawDrawerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerWithScrollbarDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [DrawerWithScrollbarDemoComponent],
    exports: [DrawerWithScrollbarDemoComponent]
})
export class DrawerWithScrollbarDemoModule {
}
