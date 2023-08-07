import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectBasicDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule],
    declarations: [SelectBasicDemoComponent],
    exports: [SelectBasicDemoComponent]
})
export class SelectBasicDemoModule {
}
