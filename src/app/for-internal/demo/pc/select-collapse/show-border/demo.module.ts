import { NgModule } from '@angular/core';
import { JigsawSelectModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SelectCollapseShowBorderDemoComponent } from './demo.component';
import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule],
    declarations: [SelectCollapseShowBorderDemoComponent],
    exports: [SelectCollapseShowBorderDemoComponent]
})
export class SelectCollapseShowBorderDemoModule {
}
