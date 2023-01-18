import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawButtonModule, JigsawButtonBarModule, JigsawSwitchModule, JigsawRadioLiteModule } from "jigsaw/public_api";
import { ButtonBarAllComponent } from "./demo.component";
import { ButtonBarObjectsArrayComponent } from "./objects-array/demo.component";
import { ButtonBarStringArrayComponent } from "./string-array/demo.component";
import { ButtonBarColorTypeComponent } from "./color-type/demo.component";
import { ButtonBarIconsComponent } from "./icons/demo.component";
import { ButtonBarMultipleComponent } from "./multiple/demo.component";
import { ButtonBarSetHeightComponent } from "./set-height/demo.component";
import {ButtonBarTitleComponent} from "./title/demo.component";


@NgModule({
    declarations: [
        ButtonBarAllComponent,
        ButtonBarObjectsArrayComponent,
        ButtonBarStringArrayComponent,
        ButtonBarColorTypeComponent,
        ButtonBarIconsComponent,
        ButtonBarMultipleComponent,
        ButtonBarSetHeightComponent,
        ButtonBarTitleComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawButtonBarModule,
        JigsawSwitchModule,
        JigsawRadioLiteModule

    ]
})
export class ButtonBarDemoModule {
}
