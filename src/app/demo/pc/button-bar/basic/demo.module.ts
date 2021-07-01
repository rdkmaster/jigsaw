import {NgModule} from '@angular/core';
import {JigsawButtonBarModule, JigsawRadioLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {ButtonBarBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawButtonBarModule, JigsawRadioLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawHeaderModule],
    declarations: [ButtonBarBasicDemoComponent],
    exports: [ButtonBarBasicDemoComponent]
})
export class ButtonBarBasicDemoModule {
}
