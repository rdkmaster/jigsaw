import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselecItemsChangeComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselecItemsChangeComponent ],
    bootstrap: [ TileselecItemsChangeComponent ]
})
export class TileSelectItemsChangeDemoModule {}
