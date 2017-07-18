import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectLabelFieldComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselectLabelFieldComponent ],
    bootstrap: [ TileselectLabelFieldComponent ]
})
export class TileSelectLabelFieldDemoModule {}
