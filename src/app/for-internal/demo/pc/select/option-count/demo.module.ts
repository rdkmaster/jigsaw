import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectOptionCountDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SelectOptionCountDemoComponent],
    exports: [SelectOptionCountDemoComponent]
})
export class SelectOptionCountDemoModule {
}
