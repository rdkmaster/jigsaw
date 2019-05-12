import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectDisabledDemoComponent} from './demo.component';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [JigsawSelectModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [SelectDisabledDemoComponent],
    exports: [SelectDisabledDemoComponent]
})
export class SelectDisabledDemoModule {
}
