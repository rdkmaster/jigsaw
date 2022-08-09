import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../markdown/markdown';
import {ListLiteAllComponent} from "./demo.component";
import {JigsawListLiteModule, JigsawButtonModule, JigsawComboSelectModule, JigsawSwitchModule} from "jigsaw/public_api";
import {ListLiteSingleSelectDemoComponent} from "./single-select/demo.component";
import {ListLiteMultipleSelectDemoComponent} from "./multiple-select/demo.component";
import {ListLiteStringArrayDemoComponent} from "./string-array/demo.component";
import {ListLiteLineEllipsisDemoComponent} from "./line-ellipsis/demo.component";
import {ListLiteOptionCountDemoComponent} from "./option-count/demo.component";
import {ListLitePresetValueDemoComponent} from "./preset-value/demo.component";
import {ListLiteSearchableDemoComponent} from "./searchable/demo.component";
import {ListLiteWithComboDemoComponent} from "./with-combo/demo.component";
import {ListLiteWithIconDemoComponent} from "./with-icon/demo.component";

@NgModule({
    declarations: [
        ListLiteAllComponent,
        ListLiteSingleSelectDemoComponent,
        ListLiteMultipleSelectDemoComponent,
        ListLiteStringArrayDemoComponent,
        ListLiteLineEllipsisDemoComponent,
        ListLiteOptionCountDemoComponent,
        ListLitePresetValueDemoComponent,
        ListLiteSearchableDemoComponent,
        ListLiteWithComboDemoComponent,
        ListLiteWithIconDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawListLiteModule,
        JigsawButtonModule,
        JigsawComboSelectModule,
        JigsawSwitchModule
    ]
})
export class ListLiteDemoModule {
}
