import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMenuModule} from "jigsaw/pc-components/menu";
import {CascadingMenuDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule
    ],
    declarations: [CascadingMenuDemo],
    exports: [CascadingMenuDemo]
})
export class CascadingMenuModule {
}
