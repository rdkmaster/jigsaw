import {NgModule} from '@angular/core';
import {JigsawTabsModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDestoryTabComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawDestoryTabComponent],
    exports: [JigsawDestoryTabComponent]
})
export class TabsDestroyDemoModule {
}
