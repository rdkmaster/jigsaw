import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectSelectedItemsComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselectSelectedItemsComponent ],
    bootstrap: [ TileselectSelectedItemsComponent ]
})
export class TileSelectSelectedItemsDemoModule {}
