import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {JigsawTabsWithNgForComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTabsModule, JigsawDemoDescriptionModule],
    declarations: [JigsawTabsWithNgForComponent],
    bootstrap: [JigsawTabsWithNgForComponent]
})
export class TabsWithNgForDemoModule {
}
