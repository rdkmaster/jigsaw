import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {OnChangeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [OnChangeDemoComponent],
    exports: [OnChangeDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule]
})
export class OnChangeDemoModule {

}
