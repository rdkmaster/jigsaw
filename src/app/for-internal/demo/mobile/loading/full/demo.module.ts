import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawLoadingModule, JigsawMobileInputModule, JigsawMobileButtonModule, LoadingService,
    PopupService
} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LoadingFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LoadingFullDemoComponent],
    exports: [LoadingFullDemoComponent],
    imports: [
        JigsawLoadingModule, JigsawMobileInputModule, JigsawMobileButtonModule, CommonModule,
        JigsawDemoDescriptionModule
    ],
    providers: [PopupService, LoadingService]
})
export class LoadingFullDemoModule {

}
