import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/common/components/loading/loading";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
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
