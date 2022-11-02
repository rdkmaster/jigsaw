import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawAutoCompleteInputModule, JigsawMenuModule } from "jigsaw/public_api";
import { JigsawHeaderModule } from "jigsaw/public_api";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { NavigationMenuAllDemoComponent } from "./demo.component";
import { NavigationMenuDemoComponent } from "./menu/demo.component";
import { NavigationSubMenuDemoComponent } from "./submenu/demo.component";
import { NavigationFoldDemoComponent } from "./fold/demo.component";
import { NavigationWithBadgeDemoComponent } from "./with-badge/demo.component";

@NgModule({
    declarations: [
        NavigationMenuAllDemoComponent,
        NavigationMenuDemoComponent,
        NavigationSubMenuDemoComponent,
        NavigationFoldDemoComponent,
        NavigationWithBadgeDemoComponent
    ],
    imports: [
        CommonModule,
        JigsawMenuModule,
        JigsawAutoCompleteInputModule,
        JigsawHeaderModule,
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule
    ],
})
export class NavigationMenuDemoModule {
}
