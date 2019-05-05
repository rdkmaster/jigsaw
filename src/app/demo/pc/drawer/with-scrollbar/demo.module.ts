import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawDrawerModule} from "jigsaw/pc-components/drawer/drawer";
import {DrawerWithScrollbarDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule],
    declarations: [DrawerWithScrollbarDemoComponent],
    exports: [DrawerWithScrollbarDemoComponent]
})
export class DrawerWithScrollbarDemoModule {
}
