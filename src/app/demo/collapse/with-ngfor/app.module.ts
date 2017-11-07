import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseWithNGForDemoComponent} from "./app.component";

@NgModule({
    declarations: [CollapseWithNGForDemoComponent],
    bootstrap: [CollapseWithNGForDemoComponent],
    imports: [CommonModule, JigsawCollapseModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ngForDemoModule {

}
