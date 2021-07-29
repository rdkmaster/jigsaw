import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZTreeAsyncDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZTreeAsyncDemoComponent],
    exports: [ZTreeAsyncDemoComponent]
})
export class ZTreeAsyncDemoModule {
}
