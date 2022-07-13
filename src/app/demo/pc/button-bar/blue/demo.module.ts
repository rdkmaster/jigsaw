import {NgModule} from '@angular/core';
import {JigsawButtonBarModule, JigsawSwitchModule} from "jigsaw/public_api";
import {ButtonBarBlueBackgroundComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawButtonBarModule,
        JigsawSwitchModule,
        DemoTemplateModule
    ],
    declarations: [ButtonBarBlueBackgroundComponent],
    exports: [ButtonBarBlueBackgroundComponent]
})
export class ButtonBarBlueBackgroundDemoModule {
}
