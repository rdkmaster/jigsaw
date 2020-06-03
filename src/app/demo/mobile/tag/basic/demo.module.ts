import {NgModule} from '@angular/core';
import {JigsawMobileTagModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {TagBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTagModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule],
    declarations: [TagBasicDemoComponent],
    exports: [TagBasicDemoComponent]
})
export class TagBasicDemoModule {
}
