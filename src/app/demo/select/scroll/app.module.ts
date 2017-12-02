import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectScrollDemoComponent} from './app.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectScrollDemoComponent],
    exports: [SelectScrollDemoComponent]
})
export class SelectScrollDemoModule {
}
