import {NgModule} from '@angular/core';
import {JigsawSelectModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectPresetDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule],
    declarations: [SelectPresetDemoComponent],
    exports: [SelectPresetDemoComponent]
})
export class SelectPresetDemoModule {
}
