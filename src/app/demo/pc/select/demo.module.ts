import {NgModule} from "@angular/core";
import {
    JigsawButtonModule, JigsawCheckBoxModule,
    JigsawNumericInputModule,
    JigsawRadioModule,
    JigsawSelectModule, JigsawSwitchModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {SelectBasicComponent} from "./basic/demo.component";
import {SelectAsyncComponent} from "./async/demo.component";
import {SelectPresetComponent} from "./preset/demo.component";
import {SelectOptionCountComponent} from "./option-count/demo.component";
import {SelectLineEllipsisComponent} from "./line-ellipsis/demo.component";
import {SelectTriggerComponent} from "./trigger/demo.component";
import {SelectMultipleComponent} from "./multiple/demo.component";
import {SelectSearchableComponent} from "./searchable/demo.component";
import {SelectSizeComponent} from "./size/demo.component";
import {SelectClearableComponent} from "./clearable/demo.component";
import {SelectMultipleSelectComponent} from "./multiple-select/demo.component";
import {SelectOptionWidthComponent} from "./option-width/demo.component";
import {SelectValueChangeComponent} from "./value-change/demo.component";
import {SelectValidComponent} from "./valid/demo.component";


@NgModule({
    declarations: [
        SelectAllComponent,
        SelectBasicComponent,
        SelectAsyncComponent,
        SelectPresetComponent,
        SelectOptionCountComponent,
        SelectLineEllipsisComponent,
        SelectTriggerComponent,
        SelectMultipleComponent,
        SelectSearchableComponent,
        SelectSizeComponent,
        SelectClearableComponent,
        SelectMultipleSelectComponent,
        SelectOptionWidthComponent,
        SelectValueChangeComponent,
        SelectValidComponent
    ],
    exports: [SelectAllComponent],
    imports: [
        JigsawButtonModule,
        JigsawDemoDescriptionModule,
        JigsawMarkdownModule,
        DemoTemplateModule,
        JigsawSelectModule,
        JigsawRadioModule,
        JigsawNumericInputModule,
        JigsawSwitchModule,
        JigsawCheckBoxModule
    ],
})
export class SelectAllModule {

}
