import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSelectModule, JigsawSwitchModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectGroupInfiniteScrollDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule, JigsawSwitchModule,
        CommonModule, JigsawNumericInputModule],
    declarations: [SelectGroupInfiniteScrollDemoComponent],
    exports: [SelectGroupInfiniteScrollDemoComponent]
})
export class SelectGroupInfiniteScrollDemoModule {
}
