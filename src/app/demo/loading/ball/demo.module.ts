import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/pc-components/loading/loading";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BallLoadingDemoComponent} from "./demo.component";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    declarations: [BallLoadingDemoComponent],
    exports: [BallLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule,JigsawButtonModule],
    providers: [LoadingService]
})
export class BallLoadingDemoModule {
}
