import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselecItemsChangeComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule, CommonModule ],
    declarations: [ TileselecItemsChangeComponent ],
    bootstrap: [ TileselecItemsChangeComponent ]
})
export class TileSelectItemsChangeDemoModule {}
