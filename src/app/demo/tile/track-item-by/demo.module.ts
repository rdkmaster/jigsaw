import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {TileSelectTrackItemByDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectTrackItemByDemoComponent],
    exports: [TileSelectTrackItemByDemoComponent]
})
export class TileSelectTrackItemByDemoModule {
}
