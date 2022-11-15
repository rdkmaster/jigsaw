import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingService, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {StringifyDemoComponent} from "./demo.component";

@NgModule({
    declarations: [StringifyDemoComponent],
    exports: [StringifyDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    providers: [LoadingService]
})
export class StringifyDemoModule {
}
