import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { NavigationBarAllDemoComponent } from "./demo.component";
import {
    JigsawButtonModule,
    JigsawHeaderModule,
    JigsawInputModule,
    JigsawTagModule,
    JigsawColorSelectModule,
    JigsawNavigationBarModule,
} from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { NavigationBarBasicDemoComponent } from "./basic/demo.component";
import { NavigationBarBackgroundDemoComponent } from "./background/demo.component";
import { NavigationBarBlankDemoComponent } from "./blank/demo.component";
import { NavigationBarColorDemoComponent } from "./color/demo.component";

@NgModule({
    declarations: [
        NavigationBarAllDemoComponent,
        NavigationBarBasicDemoComponent,
        NavigationBarBackgroundDemoComponent,
        NavigationBarBlankDemoComponent,
        NavigationBarColorDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawHeaderModule,
        JigsawInputModule,
        JigsawTagModule,
        JigsawColorSelectModule,
        CommonModule,
        JigsawNavigationBarModule
    ],
})
export class NavigationBarDemoModule { }
