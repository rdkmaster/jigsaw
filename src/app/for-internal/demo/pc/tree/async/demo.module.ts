import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTreeExtModule} from "jigsaw/public_api";
import {ZTreeAsyncDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [ZTreeAsyncDemoComponent],
    exports: [ZTreeAsyncDemoComponent]
})
export class ZTreeAsyncDemoModule {
}
