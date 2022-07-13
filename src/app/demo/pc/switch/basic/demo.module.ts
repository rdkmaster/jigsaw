import {NgModule} from '@angular/core';
import {JigsawSwitchModule} from "jigsaw/public_api";
import {SwitchBasicComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawSwitchModule, DemoTemplateModule],
    declarations: [SwitchBasicComponent],
    exports: [SwitchBasicComponent]
})
export class SwitchBasicDemoModule {
}
