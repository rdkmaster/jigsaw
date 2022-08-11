import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {TableSetHeaderClassDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableSetHeaderClassDemoComponent],
    exports: [TableSetHeaderClassDemoComponent]
})
export class TableSetHeaderClassDemoModule {
}
