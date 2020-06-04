import {NgModule} from '@angular/core';
import {JigsawMobileButtonBarModule, JigsawMobileRadioLiteModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {ButtonBarBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileButtonBarModule, JigsawMobileRadioLiteModule, JigsawDemoDescriptionModule, JigsawMobileSwitchModule],
    declarations: [ButtonBarBasicDemoComponent],
    exports: [ButtonBarBasicDemoComponent]
})
export class ButtonBarBasicDemoModule {
}
