import {NgModule} from '@angular/core';
import {JigsawSelectModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectSizeDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [SelectSizeDemoComponent],
    exports: [SelectSizeDemoComponent]
})
export class SelectSizeDemoModule {
}
