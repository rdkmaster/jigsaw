import {NgModule} from '@angular/core';
import {JigsawButtonBarModule, JigsawButtonModule, JigsawRadioLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {ButtonBarBasicComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawButtonBarModule,
        JigsawRadioLiteModule,
        JigsawDemoDescriptionModule,
        JigsawSwitchModule,
        JigsawHeaderModule,
        JigsawButtonModule,
        DemoTemplateModule
    ],
    declarations: [ButtonBarBasicComponent],
    exports: [ButtonBarBasicComponent]
})
export class ButtonBarBasicDemoModule {
}
