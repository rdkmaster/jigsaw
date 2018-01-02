import {NgModule} from "@angular/core";
import {BoxLayoutDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawBoxModule} from "jigsaw/component/box/box";

@NgModule({
    declarations: [BoxLayoutDemoComponent],
    exports: [BoxLayoutDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule]
})
export class BoxLayoutDemoModule {

}
