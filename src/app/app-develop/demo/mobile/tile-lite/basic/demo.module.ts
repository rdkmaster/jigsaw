import {NgModule} from '@angular/core';
import {JigsawMobileTileLiteModule} from "jigsaw/mobile_public_api";
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [JigsawMobileTileLiteModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
