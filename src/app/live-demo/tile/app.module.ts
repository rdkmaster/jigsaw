import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/list-and-tile/tile";
import { TileselectBasicDemoComponent }  from './app.component';
import {CommonModule} from "@angular/common";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";

@NgModule({
    imports: [ JigsawTileSelectModule, CommonModule, JigsawSwitchModule ],
    declarations: [ TileselectBasicDemoComponent ],
    bootstrap: [ TileselectBasicDemoComponent ]
})
export class TileSelectBasicDemoModule {}
