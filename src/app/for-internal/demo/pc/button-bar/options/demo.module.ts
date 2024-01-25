import {NgModule} from '@angular/core';
import {JigsawButtonBarModule, JigsawButtonModule, JigsawNumericInputModule, JigsawRadioLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {ButtonBarOptionsDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawButtonBarModule, JigsawRadioLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawHeaderModule, JigsawButtonModule, JigsawNumericInputModule],
    declarations: [ButtonBarOptionsDemoComponent],
    exports: [ButtonBarOptionsDemoComponent]
})
export class ButtonBarOptionsDemoModule {
}
