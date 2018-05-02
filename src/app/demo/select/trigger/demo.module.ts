import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectTriggerDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectTriggerDemoComponent],
    exports: [SelectTriggerDemoComponent]
})
export class SelectTriggerDemoModule {
}
