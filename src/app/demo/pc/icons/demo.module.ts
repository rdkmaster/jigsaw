import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {IconsDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [IconsDemoComponent],
    exports: [IconsDemoComponent]
})
export class IconsDemoModule {
}
