import {NgModule} from "@angular/core";
import {JigsawLoadingModule, LoadingService, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BallLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BallLoadingDemoComponent],
    exports: [BallLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule],
    providers: [LoadingService]
})
export class BallLoadingDemoModule {
}
