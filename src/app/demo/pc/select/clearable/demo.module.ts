import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectClearableDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectClearableDemoComponent],
    exports: [SelectClearableDemoComponent]
})
export class SelectClearableDemoModule {
}
