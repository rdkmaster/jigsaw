import {NgModule} from '@angular/core';
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTileLiteModule} from "jigsaw/pc-components/list-and-tile/tile-lite";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [JigsawTileLiteModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
