import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectMultipleSelectDemoComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule , CommonModule],
    declarations: [ TileselectMultipleSelectDemoComponent ],
    bootstrap: [ TileselectMultipleSelectDemoComponent ]
})
export class TileSelectMultiSelectDemoModule {}
