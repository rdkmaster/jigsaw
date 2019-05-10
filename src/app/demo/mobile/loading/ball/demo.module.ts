import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/common/components/loading/loading";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BallLoadingDemoComponent} from "./demo.component";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";

@NgModule({
    declarations: [BallLoadingDemoComponent],
    exports: [BallLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule],
    providers: [LoadingService]
})
export class BallLoadingDemoModule {
}
