import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingService} from "jigsaw/service/loading.service";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AjaxEventsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AjaxEventsDemoComponent],
    exports: [AjaxEventsDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    providers: [LoadingService]
})
export class AjaxEventsDemoModule {
}
