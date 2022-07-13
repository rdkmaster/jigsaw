import {NgModule} from '@angular/core';
import {JigsawSelectModule, JigsawCheckBoxModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectMultipleDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawCheckBoxModule, JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SelectMultipleDemoComponent],
    exports: [SelectMultipleDemoComponent]
})
export class SelectMultipleDemoModule {
}
