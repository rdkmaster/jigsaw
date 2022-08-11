import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectLineEllipsisDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SelectLineEllipsisDemoComponent],
    exports: [SelectLineEllipsisDemoComponent]
})
export class SelectLineEllipsisDemoModule {
}
