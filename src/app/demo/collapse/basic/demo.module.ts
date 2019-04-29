import {NgModule} from "@angular/core";
import {JigsawCollapseModule} from "jigsaw/pc-components/collapse/collapse";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseBasicDemoComponent} from "./demo.component";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    declarations: [CollapseBasicDemoComponent],
    exports: [CollapseBasicDemoComponent],
    imports: [JigsawCollapseModule, JigsawInputModule, JigsawDemoDescriptionModule,JigsawButtonModule]
})
export class CollapseBasicDemoModule {

}
