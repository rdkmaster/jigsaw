import {NgModule} from '@angular/core';
import {JigsawButtonBarModule, JigsawButtonModule, JigsawRadioLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {ButtonBarBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawButtonBarModule, JigsawRadioLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawHeaderModule, JigsawButtonModule],
    declarations: [ButtonBarBasicDemoComponent],
    exports: [ButtonBarBasicDemoComponent]
})
export class ButtonBarBasicDemoModule {
}
