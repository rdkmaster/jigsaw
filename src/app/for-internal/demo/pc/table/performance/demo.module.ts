import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TablePerformanceDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TablePerformanceDemoComponent],
    exports: [TablePerformanceDemoComponent]
})
export class TablePerformanceDemoModule {
}
