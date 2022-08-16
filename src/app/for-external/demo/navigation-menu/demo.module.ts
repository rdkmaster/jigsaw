import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawAutoCompleteInputModule, JigsawMenuModule } from "jigsaw/public_api";
import { JigsawHeaderModule } from "jigsaw/public_api";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { NavigationMenuAllDemoComponent } from "./demo.component";
import { NavigationMenuDemoComponent } from "./menu/demo.component";
import { NavigationSubMenuDemoComponent } from "./submenu/demo.component";
import { NavigationFoldDemoComponent } from "./fold/demo.component";
import { NavigationWithBadgeDemoComponent } from "./with-badge/demo.component";

@NgModule({
    declarations: [NavigationMenuAllDemoComponent, NavigationMenuDemoComponent, NavigationSubMenuDemoComponent,
        NavigationFoldDemoComponent, NavigationWithBadgeDemoComponent],
    imports: [
        CommonModule, JigsawMenuModule, JigsawAutoCompleteInputModule, JigsawHeaderModule, DemoTemplateModule,
        JigsawMarkdownModule],
})
export class NavigationMenuDemoModule {
}
