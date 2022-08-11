import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawSwitchModule, JigsawTileSelectModule} from "jigsaw/public_api";
import {TileSelectFullDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TileSelectFullDemoComponent],
    exports: [TileSelectFullDemoComponent]
})
export class TileSelectFullDemoModule {
}
