import {NgModule} from "@angular/core";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseBasicDemoComponent} from "./app.component";

@NgModule({
    declarations: [CollapseBasicDemoComponent],
    bootstrap: [CollapseBasicDemoComponent],
    imports: [JigsawCollapseModule, JigsawInputModule, JigsawDemoDescriptionModule]
})
export class CollapseBasicDemoModule {

}
