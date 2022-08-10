import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawMobileSwitchModule, JigsawMobileTileSelectModule} from "jigsaw/mobile_public_api";
import {TileSelectFullDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule],
    declarations: [TileSelectFullDemoComponent],
    exports: [TileSelectFullDemoComponent]
})
export class TileSelectFullDemoModule {
}
