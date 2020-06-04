import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawSwitchModule, JigsawTileSelectModule} from "jigsaw/public_api";
import {TileSelectFullDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectFullDemoComponent],
    exports: [TileSelectFullDemoComponent]
})
export class TileSelectFullDemoModule {
}
