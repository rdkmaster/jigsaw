import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingService, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {AjaxEventsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AjaxEventsDemoComponent],
    exports: [AjaxEventsDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    providers: [LoadingService]
})
export class AjaxEventsDemoModule {
}
