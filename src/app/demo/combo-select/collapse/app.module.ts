import {NgModule} from "@angular/core";
import {CollapseBasicDemo} from "./app.component";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
@NgModule({
    declarations: [CollapseBasicDemo],
    imports: [JigsawComboSelectModule,JigsawCollapseModule]
})
export class CollapseBasicDemoModule{

}
