import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeCrossSelectDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/pc-components/cascade/cascade";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";

@NgModule({
    declarations: [CascadeCrossSelectDemoComponent],
    exports: [CascadeCrossSelectDemoComponent],
    imports: [JigsawCascadeModule, JigsawTileSelectModule, JigsawDemoDescriptionModule, CommonModule]
})
export class CascadeCrossSelectDemoModule {
}
