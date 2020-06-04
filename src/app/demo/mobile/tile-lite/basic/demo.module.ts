import {NgModule} from '@angular/core';
import {JigsawMobileTileLiteModule} from "jigsaw/mobile_public_api";
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTileLiteModule, JigsawDemoDescriptionModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
