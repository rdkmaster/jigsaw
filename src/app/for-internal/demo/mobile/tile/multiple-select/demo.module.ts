import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawMobileTileSelectModule} from "jigsaw/mobile_public_api";
import {TileSelectMultipleSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectMultipleSelectDemoComponent],
    exports: [TileSelectMultipleSelectDemoComponent]
})
export class TileSelectMultiSelectDemoModule {
}
