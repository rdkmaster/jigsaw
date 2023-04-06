import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSelectModule, JigsawSwitchModule, JigsawNumericInputModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectCollapseInfiniteScrollDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule, JigsawSwitchModule,
        CommonModule, JigsawNumericInputModule, JigsawButtonBarModule],
    declarations: [SelectCollapseInfiniteScrollDemoComponent],
    exports: [SelectCollapseInfiniteScrollDemoComponent]
})
export class SelectCollapseInfiniteScrollDemoModule {
}
