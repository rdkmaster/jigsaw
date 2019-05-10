import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {ScatterGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ScatterGraphComponent],
    exports: [ScatterGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class ScatterGraphModule {

}
