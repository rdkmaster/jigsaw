import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSelectModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {GroupSelectClearableDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule, JigsawButtonModule],
    declarations: [GroupSelectClearableDemoComponent],
    exports: [GroupSelectClearableDemoComponent]
})
export class GroupSelectClearableDemoModule {
}
