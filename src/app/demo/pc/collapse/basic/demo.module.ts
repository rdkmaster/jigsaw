import {NgModule} from "@angular/core";
import {JigsawCollapseModule, JigsawInputModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CollapseBasicDemoComponent],
    exports: [CollapseBasicDemoComponent],
    imports: [JigsawCollapseModule, JigsawInputModule, JigsawDemoDescriptionModule,JigsawButtonModule]
})
export class CollapseBasicDemoModule {

}
