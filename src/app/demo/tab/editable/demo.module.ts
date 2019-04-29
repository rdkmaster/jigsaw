import {NgModule} from '@angular/core';
import {JigsawTabsModule} from "jigsaw/pc-components/tabs/index";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
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
