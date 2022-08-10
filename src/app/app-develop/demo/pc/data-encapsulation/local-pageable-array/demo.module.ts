import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {LocalPageableArrayDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LocalPageableArrayDemoComponent],
    exports: [LocalPageableArrayDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule]
})
export class LocalPageableArrayDemoModule {

}
