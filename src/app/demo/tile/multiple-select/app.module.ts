import {NgModule} from '@angular/core';
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {TileSelectMultipleSelectDemoComponent} from './app.component';
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectMultipleSelectDemoComponent],
    bootstrap: [TileSelectMultipleSelectDemoComponent]
})
export class TileSelectMultiSelectDemoModule {
}
