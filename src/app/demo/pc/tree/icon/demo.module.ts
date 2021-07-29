import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawHeaderModule} from "jigsaw/public_api";
import {ZtreeIconDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [ZtreeIconDemoComponent],
    exports: [ZtreeIconDemoComponent]
})
export class TreeIconDemoModule {
}
