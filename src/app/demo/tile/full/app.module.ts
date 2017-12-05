import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {TileSelectFullDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTileSelectModule, CommonModule, JigsawSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TileSelectFullDemoComponent],
    exports: [TileSelectFullDemoComponent]
})
export class TileSelectFullDemoModule {
}
