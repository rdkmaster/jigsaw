import {NgModule} from "@angular/core";
import {JigsawLoadingModule, LoadingService, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BallLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BallLoadingDemoComponent],
    exports: [BallLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule,JigsawButtonModule],
    providers: [LoadingService]
})
export class BallLoadingDemoModule {
}
