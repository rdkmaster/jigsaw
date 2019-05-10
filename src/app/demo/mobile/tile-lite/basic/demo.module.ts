import {NgModule} from '@angular/core';
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileTileLiteModule} from "jigsaw/mobile-components/list-and-tile/tile-lite";

@NgModule({
    imports: [JigsawMobileTileLiteModule, JigsawDemoDescriptionModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
