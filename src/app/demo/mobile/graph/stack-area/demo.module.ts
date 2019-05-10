import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {StackAreaGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [StackAreaGraphComponent],
    exports: [StackAreaGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class StackAreaGraphModule {

}
