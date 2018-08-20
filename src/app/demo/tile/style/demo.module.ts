import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {TileSelectStyleComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectStyleComponent],
    exports: [TileSelectStyleComponent]
})
export class TileSelectStyleDemoModule {
}
