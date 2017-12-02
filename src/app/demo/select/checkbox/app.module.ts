import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectCheckboxDemoComponent} from './app.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule],
    declarations: [SelectCheckboxDemoComponent],
    exports: [SelectCheckboxDemoComponent]
})
export class SelectCheckboxDemoModule {
}
