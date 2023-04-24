import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {TreeSaveOpenStatusDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [TreeSaveOpenStatusDemoComponent],
    exports: [TreeSaveOpenStatusDemoComponent]
})
export class TreeSaveOpenStatusDemoModule {
}
