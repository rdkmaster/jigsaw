import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawInputModule, JigsawViewportModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LocalPageableSelectArrayDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LocalPageableSelectArrayDemoComponent],
    exports: [LocalPageableSelectArrayDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule, JigsawViewportModule]
})
export class LocalPageableSelectArrayDemoModule {

}
