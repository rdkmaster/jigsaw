import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectClearableDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectClearableDemoComponent],
    exports: [SelectClearableDemoComponent]
})
export class SelectClearableDemoModule {
}
