import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/pc-components/loading/loading";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
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
