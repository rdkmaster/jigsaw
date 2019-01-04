import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerWithTabDemoComponent} from "./demo.component";
import {JigsawDrawerModule} from "jigsaw/component/drawer/drawer";
import {JigsawTabsModule} from "jigsaw/component/tabs";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule, JigsawTabsModule],
    declarations: [DrawerWithTabDemoComponent],
    exports: [DrawerWithTabDemoComponent]
})
export class DrawerWithTabDemoModule {

}
