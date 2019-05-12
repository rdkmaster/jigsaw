import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {LocalPageableArrayDemoComponent} from "./demo.component";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";

@NgModule({
    declarations: [LocalPageableArrayDemoComponent],
    exports: [LocalPageableArrayDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule]
})
export class LocalPageableArrayDemoModule {

}
