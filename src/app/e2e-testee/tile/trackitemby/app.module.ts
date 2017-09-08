import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/list-and-tile/tile";
import { TileselectTrackItemByDemoComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule, CommonModule ],
    declarations: [ TileselectTrackItemByDemoComponent ],
    bootstrap: [ TileselectTrackItemByDemoComponent ]
})
export class TileSelectTrackItemByDemoModule {}
