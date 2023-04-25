import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSwitchModule, JigsawTreeExtModule} from "jigsaw/public_api";
import {TreeSaveOpenStatusDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule],
    declarations: [TreeSaveOpenStatusDemoComponent],
    exports: [TreeSaveOpenStatusDemoComponent]
})
export class TreeSaveOpenStatusDemoModule {
}
