import {NgModule} from "@angular/core";
import {JigsawDrawerModule, JigsawTabsModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerWithTabDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule, JigsawTabsModule],
    declarations: [DrawerWithTabDemoComponent],
    exports: [DrawerWithTabDemoComponent]
})
export class DrawerWithTabDemoModule {

}
