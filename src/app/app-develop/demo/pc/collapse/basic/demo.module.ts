import {NgModule} from "@angular/core";
import {JigsawCollapseModule, JigsawInputModule, JigsawButtonModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {CollapseBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CollapseBasicDemoComponent],
    exports: [CollapseBasicDemoComponent],
    imports: [JigsawCollapseModule, JigsawInputModule, JigsawDemoDescriptionModule,JigsawButtonModule, JigsawButtonBarModule]
})
export class CollapseBasicDemoModule {

}
