import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawLoadingModule, LoadingService, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DefinedLoading} from "./definedLoading/definedLoading";
import {DefinedLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DefinedLoadingDemoComponent, DefinedLoading],
    exports: [DefinedLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService, LoadingService]
})
export class DefinedLoadingDemoModule {
}
