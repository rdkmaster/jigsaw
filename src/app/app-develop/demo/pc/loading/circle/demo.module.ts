import {NgModule} from "@angular/core";
import {JigsawLoadingModule, LoadingService, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {CircleLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CircleLoadingDemoComponent],
    exports: [CircleLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawDemoDescriptionModule,JigsawButtonModule,JigsawHeaderModule],
    providers: [LoadingService]
})
export class CircleLoadingDemoModule {
}
