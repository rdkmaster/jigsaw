import {NgModule} from '@angular/core';
import {JigsawMobileTagModule} from "jigsaw/mobile-components/tag/tag";
import {TagBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";

@NgModule({
    imports: [JigsawMobileTagModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule],
    declarations: [TagBasicDemoComponent],
    exports: [TagBasicDemoComponent]
})
export class TagBasicDemoModule {
}
