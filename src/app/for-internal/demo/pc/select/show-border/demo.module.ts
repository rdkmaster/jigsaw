import {NgModule} from '@angular/core';
import {JigsawSelectModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectShowBorderDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule],
    declarations: [SelectShowBorderDemoComponent],
    exports: [SelectShowBorderDemoComponent]
})
export class SelectShowBorderDemoModule {
}
