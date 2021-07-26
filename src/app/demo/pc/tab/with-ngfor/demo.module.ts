import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawTabsModule} from "jigsaw/public_api";
import {JigsawTabsWithNgForComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTabsModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [JigsawTabsWithNgForComponent],
    exports: [JigsawTabsWithNgForComponent]
})
export class TabsWithNgForDemoModule {
}
