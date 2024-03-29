import { NgModule } from '@angular/core';
import { JigsawNumericInputModule, JigsawSelectModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SelectManualSearchDemoComponent } from './demo.component';

import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule, JigsawNumericInputModule],
    declarations: [SelectManualSearchDemoComponent],
    exports: [SelectManualSearchDemoComponent]
})
export class SelectManualSearchDemoModule {
}
