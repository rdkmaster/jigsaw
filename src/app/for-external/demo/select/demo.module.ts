import { NgModule } from "@angular/core";
import { SelectDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { SelectBasicDemoComponent } from "./basic/demo.component";
import { SelectClearableDemoComponent } from "./clearable/demo.component";
import { SelectOptionCountDemoComponent } from "./option-count/demo.component";
import { SelectSearchableDemoComponent } from "./searchable/demo.component";
import { JigsawButtonModule, JigsawSelectModule, JigsawNumericInputModule, JigsawRadioModule } from "jigsaw/public_api";
import { SelectLineEllipsisDemoComponent } from "./line-ellipsis/demo.component";
import { SelectOptionWidthDemoComponent } from "./option-width/demo.component";
import { SelectTriggerDemoComponent } from "./trigger/demo.component";
import { SelectMultipleSelectDemoComponent } from "./multiple-select/demo.component";
import { SelectStringDemoComponent } from "./string/demo.component";
import { SelectInteractionDemoComponent } from "./interaction/demo.component";

@NgModule({
    declarations: [SelectDemoComponent, SelectBasicDemoComponent, SelectClearableDemoComponent, SelectOptionCountDemoComponent,
        SelectSearchableDemoComponent, SelectLineEllipsisDemoComponent, SelectOptionWidthDemoComponent, SelectTriggerDemoComponent,
        SelectMultipleSelectDemoComponent, SelectStringDemoComponent, SelectInteractionDemoComponent],
    imports: [JigsawMarkdownModule, DemoTemplateModule, JigsawSelectModule, JigsawButtonModule, JigsawNumericInputModule,
        JigsawRadioModule]
})
export class SelectDemoModule {
}
