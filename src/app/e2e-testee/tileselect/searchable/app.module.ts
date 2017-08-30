import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectSearchableComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselectSearchableComponent ],
    bootstrap: [ TileselectSearchableComponent ]
})
export class TileSelectSearchableDemoModule {}
