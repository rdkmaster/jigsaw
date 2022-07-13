import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectSearchableDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SelectSearchableDemoComponent],
    exports: [SelectSearchableDemoComponent]
})
export class SelectSearchableDemoModule {
}
