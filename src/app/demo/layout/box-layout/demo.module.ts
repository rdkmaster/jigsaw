import {NgModule} from "@angular/core";
import {BoxLayoutDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawBoxModule} from "jigsaw/component/box/box";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [BoxLayoutDemoComponent],
    exports: [BoxLayoutDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule]
})
export class BoxLayoutDemoModule {

}
