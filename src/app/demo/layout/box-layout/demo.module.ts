import {NgModule} from "@angular/core";
import {BoxLayoutDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/index";

@NgModule({
    declarations: [BoxLayoutDemoComponent],
    exports: [BoxLayoutDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule]
})
export class BoxLayoutDemoModule {

}
