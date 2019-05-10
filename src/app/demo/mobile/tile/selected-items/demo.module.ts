import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawMobileTileSelectModule} from "jigsaw/mobile-components/list-and-tile/tile";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TileSelectSelectedItemsComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectSelectedItemsComponent],
    exports: [TileSelectSelectedItemsComponent]
})
export class TileSelectSelectedItemsDemoModule {
}
