import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {JigsawMobileTileSelectModule} from "jigsaw/mobile-components/list-and-tile/tile";
import {TileSelectFullDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTileSelectModule, CommonModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectFullDemoComponent],
    exports: [TileSelectFullDemoComponent]
})
export class TileSelectFullDemoModule {
}
