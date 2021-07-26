import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, PopupService, JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RefreshDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RefreshDemoComponent],
    exports: [RefreshDemoComponent],
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawButtonModule,
        JigsawTableModule
    ],
    providers: [PopupService]
})
export class RefreshDemoModule {
}
