import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {SelectAsyncComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectAsyncComponent],
    exports: [SelectAsyncComponent]
})
export class SelectAsyncModule {
}
