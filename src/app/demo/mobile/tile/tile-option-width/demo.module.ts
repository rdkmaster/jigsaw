import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawMobileTileSelectModule} from "jigsaw/mobile-components/list-and-tile/tile";
import {TileSelectOptionWidthComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectOptionWidthComponent],
    exports: [TileSelectOptionWidthComponent]
})
export class TileSelectOptionWidthDemoModule {
}
