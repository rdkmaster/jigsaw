import {NgModule} from "@angular/core";
import {JigsawLoadingModule, JigsawMobileButtonModule, LoadingService, PopupService} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DefinedLoading} from "./definedLoading/definedLoading";
import {DefinedLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DefinedLoadingDemoComponent, DefinedLoading],
    exports: [DefinedLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule],
    providers: [PopupService, LoadingService]
})
export class DefinedLoadingDemoModule {
}
