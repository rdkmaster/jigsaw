import {NgModule} from '@angular/core';
import {JigsawSelectModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectDisabledDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [SelectDisabledDemoComponent],
    exports: [SelectDisabledDemoComponent]
})
export class SelectDisabledDemoModule {
}
