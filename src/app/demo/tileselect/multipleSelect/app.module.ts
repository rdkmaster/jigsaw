import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectMultipleSelectDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselectMultipleSelectDemoComponent ],
    bootstrap: [ TileselectMultipleSelectDemoComponent ]
})
export class TileSelectMultiSelectDemoModule {}
