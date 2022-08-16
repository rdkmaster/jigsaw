import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/public_api";
import {TileSelecItemsChangeComponent} from './demo.component';


@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelecItemsChangeComponent],
    exports: [TileSelecItemsChangeComponent]
})
export class TileSelectItemsChangeDemoModule {
}
