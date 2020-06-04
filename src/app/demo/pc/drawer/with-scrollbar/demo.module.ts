import {NgModule} from "@angular/core";
import {JigsawDrawerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerWithScrollbarDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawDemoDescriptionModule],
    declarations: [DrawerWithScrollbarDemoComponent],
    exports: [DrawerWithScrollbarDemoComponent]
})
export class DrawerWithScrollbarDemoModule {
}
