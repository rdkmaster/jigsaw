import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo/demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {JigsawButtonModule, JigsawButtonBarModule, JigsawSwitchModule, JigsawRadioLiteModule} from "jigsaw/public_api";
import {ButtonBarAllComponent} from "./demo.component";
import {ButtonBarObjectsArrayComponent} from "./objects-array/demo.component";
import {ButtonBarStringArrayComponent} from "./string-array/demo.component";
import {ButtonBarColorTypeComponent} from "./color-type/demo.component";
import {ButtonBarIconsComponent} from "./icons/demo.component";
import {ButtonBarMultipleChoiceComponent} from "./multiple-choice/demo.component";
import {ButtonBarSetHeightComponent} from "./set-height/demo.component";


@NgModule({
    declarations: [
        ButtonBarAllComponent,
        ButtonBarObjectsArrayComponent,
        ButtonBarStringArrayComponent,
        ButtonBarColorTypeComponent,
        ButtonBarIconsComponent,
        ButtonBarMultipleChoiceComponent,
        ButtonBarSetHeightComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawButtonBarModule,
        JigsawSwitchModule,
        JigsawRadioLiteModule

    ],
    exports: [ButtonBarAllComponent]
})
export class ButtonBarDemoModule {
}
