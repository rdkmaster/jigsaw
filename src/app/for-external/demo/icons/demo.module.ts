import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawIconModule } from "jigsaw/public_api";
import { IconsDemoComponent } from "./demo.component";
import {JigsawMarkdownModule} from "../../../libs/markdown/markdown";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawMarkdownModule
    ],
    declarations: [IconsDemoComponent],
    exports: [IconsDemoComponent]
})
export class IconsDemoModule {
}
