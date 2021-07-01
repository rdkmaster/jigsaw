import {NgModule} from '@angular/core';
import {JigsawSelectModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectPresetDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [SelectPresetDemoComponent],
    exports: [SelectPresetDemoComponent]
})
export class SelectPresetDemoModule {
}
