import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/public_api";
import {TileSelectMultipleSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectMultipleSelectDemoComponent],
    exports: [TileSelectMultipleSelectDemoComponent]
})
export class TileSelectMultiSelectDemoModule {
}
