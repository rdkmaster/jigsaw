import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeCustomSettingCallbackDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeCustomSettingCallbackDemoComponent],
    exports: [ZtreeCustomSettingCallbackDemoComponent]
})
export class TreeCustomSettingCallbackDemoModule {
}
