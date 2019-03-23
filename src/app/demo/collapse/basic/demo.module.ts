import {NgModule} from "@angular/core";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseBasicDemoComponent} from "./demo.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";

@NgModule({
    declarations: [CollapseBasicDemoComponent],
    exports: [CollapseBasicDemoComponent],
    imports: [JigsawCollapseModule, JigsawInputModule, JigsawDemoDescriptionModule,JigsawButtonModule]
})
export class CollapseBasicDemoModule {

}
