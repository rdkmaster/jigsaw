import {NgModule} from '@angular/core';
import {JigsawTileLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {TileLiteBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTileLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawHeaderModule],
    declarations: [TileLiteBasicDemoComponent],
    exports: [TileLiteBasicDemoComponent]
})
export class TileLiteBasicDemoModule {
}
