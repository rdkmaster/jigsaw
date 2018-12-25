import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {TabsWithTableInIEComponent, TableContent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTableModule} from "../../../../jigsaw/component/table/table";
import {JigsawPaginationModule} from "../../../../jigsaw/component/pagination/pagination";

@NgModule({
    imports: [CommonModule, JigsawTabsModule, JigsawDemoDescriptionModule, JigsawTableModule, JigsawPaginationModule],
    declarations: [TabsWithTableInIEComponent, TableContent],
    exports: [TabsWithTableInIEComponent],
    entryComponents: [TableContent]
})
export class TabsWithTableInIEDemoModule {
}
