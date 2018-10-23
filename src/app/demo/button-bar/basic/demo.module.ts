import {NgModule} from '@angular/core';
import {ButtonBarBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonBarModule} from "jigsaw/component/list-and-tile/button-bar";
import {JigsawRadioLiteModule} from "jigsaw/component/radio/radio-lite";
import {JigsawSwitchModule} from "jigsaw/component/switch";

@NgModule({
    imports: [JigsawButtonBarModule, JigsawRadioLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [ButtonBarBasicDemoComponent],
    exports: [ButtonBarBasicDemoComponent]
})
export class ButtonBarBasicDemoModule {
}
