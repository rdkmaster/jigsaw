import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule} from "jigsaw/public_api";
import {TagWithIconDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TagWithIconDemoComponent],
    exports: [TagWithIconDemoComponent]
})
export class TagWithIconDemoModule {
}
