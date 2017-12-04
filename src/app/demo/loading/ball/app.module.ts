import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BallLoadingDemoComponent} from "./app.component";

@NgModule({
    declarations: [BallLoadingDemoComponent],
    exports: [BallLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule],
    providers: [LoadingService]
})
export class BallLoadingDemoModule {
}
