import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTabModule} from "jigsaw/component/tabs/index";
import {JigsawTabsWithNgForComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTabModule, JigsawDemoDescriptionModule],
    declarations: [JigsawTabsWithNgForComponent],
    exports: [JigsawTabsWithNgForComponent]
})
export class TabsWithNgForDemoModule {
}
