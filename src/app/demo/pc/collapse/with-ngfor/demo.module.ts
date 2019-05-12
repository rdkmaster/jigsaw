import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/pc-components/collapse/collapse";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseWithNGForDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CollapseWithNGForDemoComponent],
    exports: [CollapseWithNGForDemoComponent],
    imports: [CommonModule, JigsawCollapseModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ngForDemoModule {

}
