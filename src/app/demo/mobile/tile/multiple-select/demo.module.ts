import {NgModule} from '@angular/core';
import {JigsawMobileTileSelectModule} from "jigsaw/mobile-components/list-and-tile/tile";
import {TileSelectMultipleSelectDemoComponent} from './demo.component';
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectMultipleSelectDemoComponent],
    exports: [TileSelectMultipleSelectDemoComponent]
})
export class TileSelectMultiSelectDemoModule {
}
