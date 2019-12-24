import {NgModule} from "@angular/core";
import {UploadContentFieldDemoComponent} from "./demo.component";
import {JigsawUploadModule} from "jigsaw/pc-components/upload/index";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule} from "../../../../../jigsaw/pc-components/button/button";

@NgModule({
    declarations: [UploadContentFieldDemoComponent],
    exports: [ UploadContentFieldDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawUploadModule, JigsawInputModule, JigsawButtonModule]
})
export class UploadContentFieldDemoModule{

}
