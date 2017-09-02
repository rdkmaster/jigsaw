import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectTrackItemByDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselectTrackItemByDemoComponent ],
    bootstrap: [ TileselectTrackItemByDemoComponent ]
})
export class TileSelectTrackItemByDemoModule {}
