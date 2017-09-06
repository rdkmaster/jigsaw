import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/list-and-tile/tile";
import { TileselectSelectedItemsComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule, CommonModule ],
    declarations: [ TileselectSelectedItemsComponent ],
    bootstrap: [ TileselectSelectedItemsComponent ]
})
export class TileSelectSelectedItemsDemoModule {}
