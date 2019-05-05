import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/pc-components/loading/loading";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DefinedLoading} from "./definedLoading/definedLoading";
import {DefinedLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DefinedLoadingDemoComponent, DefinedLoading],
    exports: [DefinedLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule],
    providers: [PopupService, LoadingService],
    entryComponents: [DefinedLoading]
})
export class DefinedLoadingDemoModule {
}
