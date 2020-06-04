import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawMobileSwitchModule, JigsawMobileTileSelectModule} from "jigsaw/mobile_public_api";
import {TileSelectFullDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectFullDemoComponent],
    exports: [TileSelectFullDemoComponent]
})
export class TileSelectFullDemoModule {
}
