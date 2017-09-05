import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile/tile";
import { TileselectOptionWidthComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule, CommonModule ],
    declarations: [ TileselectOptionWidthComponent ],
    bootstrap: [ TileselectOptionWidthComponent ]
})
export class TileSelectOptionWidthDemoModule {}
