import {NgModule} from "@angular/core";
import {ngForDemoComponent} from "./app.component";
import {JigsawCollapseModule} from "../../../../jigsaw/component/collapse/collapse";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
@NgModule({
    declarations: [ngForDemoComponent],
    imports: [CommonModule,JigsawCollapseModule,JigsawButtonModule]
})
export class ngForDemoModule{

}
