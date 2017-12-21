import {NgModule} from "@angular/core";
import {LayoutBasicDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawLayoutModule} from "../../../../jigsaw/component/layout/layout";

@NgModule({
    declarations: [LayoutBasicDemoComponent],
    exports: [LayoutBasicDemoComponent],
    imports: [JigsawLayoutModule, JigsawDemoDescriptionModule]
})
export class LayoutBasicDemoModule {

}
