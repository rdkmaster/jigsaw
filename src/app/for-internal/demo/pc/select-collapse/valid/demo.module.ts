import { NgModule } from '@angular/core';
import { JigsawSelectModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SelectCollapseValidDemoComponent } from './demo.component';
import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule],
    declarations: [SelectCollapseValidDemoComponent],
    exports: [SelectCollapseValidDemoComponent]
})
export class SelectCollapseValidDemoModule {
}
