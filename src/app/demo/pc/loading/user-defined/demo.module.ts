import {NgModule} from "@angular/core";
import {JigsawLoadingModule, LoadingService, PopupService} from "jigsaw/public_api";
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
