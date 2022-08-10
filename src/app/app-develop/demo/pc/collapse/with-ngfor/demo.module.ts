import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {CollapseWithNGForDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CollapseWithNGForDemoComponent],
    exports: [CollapseWithNGForDemoComponent],
    imports: [CommonModule, JigsawCollapseModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ngForDemoModule {

}
