import {NgModule} from "@angular/core";
import {CollapseBasicDemo} from "./app.component";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CollapseBasicDemo],
    bootstrap: [CollapseBasicDemo],
    imports: [JigsawComboSelectModule, JigsawCollapseModule, JigsawDemoDescriptionModule]
})
export class CollapseBasicDemoModule {

}
