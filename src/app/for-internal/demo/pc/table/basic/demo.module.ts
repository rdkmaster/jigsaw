import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TableBasicDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableBasicDemoComponent],
    exports: [TableBasicDemoComponent]
})
export class TableBasicDemoModule {
}
