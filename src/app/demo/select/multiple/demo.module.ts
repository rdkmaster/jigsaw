import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectMultipleDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectMultipleDemoComponent],
    exports: [SelectMultipleDemoComponent]
})
export class SelectMultipleDemoModule {
}
