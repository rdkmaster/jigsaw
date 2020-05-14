import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawCascadingMenuModule} from "jigsaw/common/directive/cascading-menu";
import {CascadingMenuDemo} from  "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawCascadingMenuModule
    ],
    declarations: [CascadingMenuDemo],
    exports: [CascadingMenuDemo]
})
export class CascadingMenuModule {
}
