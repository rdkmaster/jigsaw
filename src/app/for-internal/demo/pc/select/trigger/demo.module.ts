import {NgModule} from '@angular/core';
import {JigsawSelectModule, JigsawRadioModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectTriggerDemoComponent} from './demo.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [JigsawSelectModule, JigsawRadioModule, JigsawDemoDescriptionModule, JigsawHeaderModule, CommonModule],
    declarations: [SelectTriggerDemoComponent],
    exports: [SelectTriggerDemoComponent]
})
export class SelectTriggerDemoModule {
}
