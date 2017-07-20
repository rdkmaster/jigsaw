import { NgModule } from '@angular/core';
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectBasicDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTileSelectModule ],
    declarations: [ TileselectBasicDemoComponent ],
    bootstrap: [ TileselectBasicDemoComponent ]
})
export class TileSelectBasicDemoModule {}
