import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule} from "jigsaw/public_api";
import {StackAreaGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [StackAreaGraphComponent],
    exports: [StackAreaGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class StackAreaGraphModule {

}
