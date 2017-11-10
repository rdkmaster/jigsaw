import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TileSelectSelectedItemsComponent} from './app.component';

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectSelectedItemsComponent],
    bootstrap: [TileSelectSelectedItemsComponent]
})
export class TileSelectSelectedItemsDemoModule {
}
