import {NgModule} from "@angular/core";
import {SelectDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawSelectModule} from "../../../../jigsaw/pc-components/select";
import {SelectBasicDemoComponent} from "./basic/demo.component";
import {SelectClearableDemoComponent} from "./clearable/demo.component";
import {SelectOptionCountDemoComponent} from "./option-count/demo.component";
import {SelectSearchableDemoComponent} from "./searchable/demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {SelectLineEllipsisDemoComponent} from "./line-ellipsis/demo.component";
import {SelectOptionWidthDemoComponent} from "./option-width/demo.component";
import {JigsawNumericInputModule} from "../../../../jigsaw/pc-components/input/numeric-input";
import {SelectTriggerDemoComponent} from "./trigger/demo.component";
import {JigsawRadioModule} from "../../../../jigsaw/pc-components/radio/radios";
import {SelectMultipleSelectDemoComponent} from "./multiple-select/demo.component";
import {SelectStringDemoComponent} from "./string/demo.component";
import {SelectInteractionDemoComponent} from "./interaction/demo.component";

@NgModule({
    declarations: [SelectDemoComponent, SelectBasicDemoComponent, SelectClearableDemoComponent, SelectOptionCountDemoComponent,
        SelectSearchableDemoComponent, SelectLineEllipsisDemoComponent, SelectOptionWidthDemoComponent, SelectTriggerDemoComponent,
        SelectMultipleSelectDemoComponent, SelectStringDemoComponent, SelectInteractionDemoComponent],
    imports: [JigsawMarkdownModule, DemoTemplateModule, JigsawSelectModule, JigsawButtonModule, JigsawNumericInputModule,
        JigsawRadioModule]
})
export class SelectDemoModule {
}
