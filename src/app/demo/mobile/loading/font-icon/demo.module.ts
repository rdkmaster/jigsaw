import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/common/components/loading/loading";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
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
