import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule} from "jigsaw/public_api";
import {TableCheckBoxInputDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [
        JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule
    ],
    declarations: [TableCheckBoxInputDemoComponent],
    exports: [TableCheckBoxInputDemoComponent]
})
export class TableCheckBoxInputDemoModule {
}
