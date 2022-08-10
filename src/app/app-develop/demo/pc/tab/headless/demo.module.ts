import {NgModule} from '@angular/core';
import {
    JigsawSwitchModule, JigsawTabsModule, JigsawButtonBarModule, JigsawInputModule,
    JigsawTableModule, JigsawGraphModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {TabHeadlessDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTabsModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawInputModule,
        JigsawTableModule, JigsawGraphModule
    ],
    declarations: [TabHeadlessDemoComponent],
    exports: [TabHeadlessDemoComponent]
})
export class TabHeadlessDemoModule {
}
