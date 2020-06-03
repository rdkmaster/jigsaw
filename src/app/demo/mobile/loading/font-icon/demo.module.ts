import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule, LoadingService, PopupService, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FontLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [FontLoadingDemoComponent],
    exports: [FontLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawMobileButtonModule, CommonModule, JigsawDemoDescriptionModule],
    providers: [PopupService, LoadingService]
})
export class FontLoadingDemoModule {

}
