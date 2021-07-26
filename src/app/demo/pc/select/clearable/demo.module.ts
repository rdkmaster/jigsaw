import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectClearableDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SelectClearableDemoComponent],
    exports: [SelectClearableDemoComponent]
})
export class SelectClearableDemoModule {
}
