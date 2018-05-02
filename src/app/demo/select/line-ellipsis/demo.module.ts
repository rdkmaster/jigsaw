import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectLineEllipsisDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectLineEllipsisDemoComponent],
    exports: [SelectLineEllipsisDemoComponent]
})
export class SelectLineEllipsisDemoModule {
}
