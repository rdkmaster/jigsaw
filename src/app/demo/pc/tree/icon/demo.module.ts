import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawHeaderModule} from "jigsaw/public_api";
import {ZTreeIconDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [ZTreeIconDemoComponent],
    exports: [ZTreeIconDemoComponent]
})
export class ZTreeIconDemoModule {
}
