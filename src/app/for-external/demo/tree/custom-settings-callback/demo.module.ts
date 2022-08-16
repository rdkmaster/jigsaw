import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeCustomSettingCallbackDemoComponent} from './demo.component';

import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTreeExtModule,  DemoTemplateModule],
    declarations: [ZtreeCustomSettingCallbackDemoComponent],
    exports: [ZtreeCustomSettingCallbackDemoComponent]
})
export class TreeCustomSettingCallbackDemoModule {
}
