import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTabsModule} from "jigsaw/pc-components/tabs/index";
import {JigsawTabsWithNgForComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTabsModule, JigsawDemoDescriptionModule],
    declarations: [JigsawTabsWithNgForComponent],
    exports: [JigsawTabsWithNgForComponent]
})
export class TabsWithNgForDemoModule {
}
