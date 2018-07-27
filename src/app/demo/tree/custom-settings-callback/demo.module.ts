import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import {ZtreeCustomSettingCallbackDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeCustomSettingCallbackDemoComponent],
    exports: [ZtreeCustomSettingCallbackDemoComponent]
})
export class TreeCustomSettingCallbackDemoModule {
}
