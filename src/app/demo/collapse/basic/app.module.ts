import {NgModule} from "@angular/core";
import {CollapseBasicDemoComponent} from "./app.component";
import {JigsawCollapseModule} from "../../../../jigsaw/component/collapse/collapse";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
@NgModule({
    declarations: [CollapseBasicDemoComponent],
    imports: [JigsawCollapseModule,JigsawInputModule]
})
export class CollapseBasicDemoModule{

}
