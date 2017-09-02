import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectOptionWidthComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselectOptionWidthComponent ],
    bootstrap: [ TileselectOptionWidthComponent ]
})
export class TileSelectOptionWidthDemoModule {}
