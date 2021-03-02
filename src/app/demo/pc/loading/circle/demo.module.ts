import {NgModule} from "@angular/core";
import {JigsawLoadingModule, LoadingService, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CircleLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CircleLoadingDemoComponent],
    exports: [CircleLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule,JigsawButtonModule],
    providers: [LoadingService]
})
export class CircleLoadingDemoModule {
}
