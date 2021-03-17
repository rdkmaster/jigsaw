import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawUploadModule, JigsawInputModule, JigsawButtonModule} from "jigsaw/public_api";
import {UploadContentFieldDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [UploadContentFieldDemoComponent],
    exports: [ UploadContentFieldDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawUploadModule, JigsawInputModule, JigsawButtonModule, CommonModule]
})
export class UploadContentFieldDemoModule{
}