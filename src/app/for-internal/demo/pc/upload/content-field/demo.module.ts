import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawUploadModule, JigsawInputModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {UploadContentFieldDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [UploadContentFieldDemoComponent],
    exports: [ UploadContentFieldDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawUploadModule, JigsawInputModule, JigsawButtonModule, CommonModule, JigsawHeaderModule]
})
export class UploadContentFieldDemoModule{
}
