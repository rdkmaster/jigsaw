import {NgModule} from '@angular/core';
import {ButtonBarBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileButtonBarModule} from "jigsaw/mobile-components/list-and-tile/button-bar";
import {JigsawMobileRadioLiteModule} from "jigsaw/mobile-components/radio/radio-lite";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";

@NgModule({
    imports: [JigsawMobileButtonBarModule, JigsawMobileRadioLiteModule, JigsawDemoDescriptionModule, JigsawMobileSwitchModule],
    declarations: [ButtonBarBasicDemoComponent],
    exports: [ButtonBarBasicDemoComponent]
})
export class ButtonBarBasicDemoModule {
}
