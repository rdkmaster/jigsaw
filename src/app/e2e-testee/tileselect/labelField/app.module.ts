import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectLabelFieldComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule, CommonModule ],
    declarations: [ TileselectLabelFieldComponent ],
    bootstrap: [ TileselectLabelFieldComponent ]
})
export class TileSelectLabelFieldDemoModule {}
