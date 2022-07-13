import {NgModule} from '@angular/core';
import {JigsawButtonBarModule} from "jigsaw/public_api";
import {ButtonBarSetHeightComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawButtonBarModule,
        DemoTemplateModule
    ],
    declarations: [ButtonBarSetHeightComponent],
    exports: [ButtonBarSetHeightComponent]
})
export class ButtonBarSetHeightDemoModule {
}
