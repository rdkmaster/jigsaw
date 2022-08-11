import {NgModule} from '@angular/core';
import {JigsawMobileButtonBarModule, JigsawMobileRadioLiteModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {ButtonBarBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [JigsawMobileButtonBarModule, JigsawMobileRadioLiteModule, JigsawDemoDescriptionModule, JigsawMobileSwitchModule, JigsawMobileHeaderModule],
    declarations: [ButtonBarBasicDemoComponent],
    exports: [ButtonBarBasicDemoComponent]
})
export class ButtonBarBasicDemoModule {
}
