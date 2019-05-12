import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {RelationalGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [RelationalGraphComponent],
    exports: [RelationalGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class RelationalGraphModule {

}
