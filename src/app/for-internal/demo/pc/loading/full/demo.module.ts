import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawLoadingModule, JigsawInputModule, JigsawButtonModule, LoadingService,
    PopupService
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LoadingFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LoadingFullDemoComponent],
    exports: [LoadingFullDemoComponent],
    imports: [
        JigsawLoadingModule, JigsawInputModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule
    ],
    providers: [PopupService, LoadingService]
})
export class LoadingFullDemoModule {

}
