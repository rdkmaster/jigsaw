import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxModule} from "jigsaw/component/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BoxLayoutDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxLayoutDemoComponent],
    exports: [BoxLayoutDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule]
})
export class BoxLayoutDemoModule {

}
