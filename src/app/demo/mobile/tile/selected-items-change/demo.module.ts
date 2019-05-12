import {NgModule} from '@angular/core';
import {JigsawMobileTileSelectModule} from "jigsaw/mobile-components/list-and-tile/tile";
import {TileSelecItemsChangeComponent} from './demo.component';
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelecItemsChangeComponent],
    exports: [TileSelecItemsChangeComponent]
})
export class TileSelectItemsChangeDemoModule {
}
