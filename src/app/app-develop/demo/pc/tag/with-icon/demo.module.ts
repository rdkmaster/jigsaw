import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TagWithIconDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule],
    declarations: [TagWithIconDemoComponent],
    exports: [TagWithIconDemoComponent]
})
export class TagWithIconDemoModule {
}
