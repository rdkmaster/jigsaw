import { NgModule } from '@angular/core';
import { JigsawInputModule, JigsawSelectModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SelectGroupSearchableDemoComponent } from './demo.component';
import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule, JigsawInputModule],
    declarations: [SelectGroupSearchableDemoComponent],
    exports: [SelectGroupSearchableDemoComponent]
})
export class SelectGroupSearchableDemoModule {
}
