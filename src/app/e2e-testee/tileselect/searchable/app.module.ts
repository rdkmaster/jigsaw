import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectSearchableComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule , CommonModule],
    declarations: [ TileselectSearchableComponent ],
    bootstrap: [ TileselectSearchableComponent ]
})
export class TileSelectSearchableDemoModule {}
