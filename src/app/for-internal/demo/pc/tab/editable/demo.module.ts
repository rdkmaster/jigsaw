import {NgModule} from '@angular/core';
import {JigsawTabsModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TabsEditableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTabsModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    declarations: [TabsEditableDemoComponent],
    exports: [TabsEditableDemoComponent],
})
export class TabsEditableDemoModule {
}
