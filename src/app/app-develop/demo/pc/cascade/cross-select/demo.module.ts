import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCascadeModule, JigsawTileSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {CascadeCrossSelectDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeCrossSelectDemoComponent],
    exports: [CascadeCrossSelectDemoComponent],
    imports: [JigsawCascadeModule, JigsawTileSelectModule, JigsawDemoDescriptionModule, CommonModule]
})
export class CascadeCrossSelectDemoModule {
}
