import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/public_api";
import {TileSelectLabelFieldComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectLabelFieldComponent],
    exports: [TileSelectLabelFieldComponent]
})
export class TileSelectLabelFieldDemoModule {
}
