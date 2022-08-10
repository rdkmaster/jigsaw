import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/public_api";
import {SelectAsyncComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SelectAsyncComponent],
    exports: [SelectAsyncComponent]
})
export class SelectAsyncModule {
}
