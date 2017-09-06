import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/list-and-tile/tile";
import { TileselectSearchableComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule , CommonModule],
    declarations: [ TileselectSearchableComponent ],
    bootstrap: [ TileselectSearchableComponent ]
})
export class TileSelectSearchableDemoModule {}
