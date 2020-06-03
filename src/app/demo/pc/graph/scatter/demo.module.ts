import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule} from "jigsaw/public_api";
import {ScatterGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [ScatterGraphComponent],
    exports: [ScatterGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class ScatterGraphModule {

}
