import {NgModule} from '@angular/core';
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTileLiteModule} from "jigsaw/pc-components/list-and-tile/tile-lite";

@NgModule({
    imports: [JigsawTileLiteModule, JigsawDemoDescriptionModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
