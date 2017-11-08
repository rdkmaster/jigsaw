import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/list-and-tile/tile";
import { TileSelectSelectedItemsComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [ JigsawTileSelectModule, CommonModule ],
    declarations: [ TileSelectSelectedItemsComponent ],
    bootstrap: [ TileSelectSelectedItemsComponent ]
})
export class TileSelectSelectedItemsDemoModule {}
