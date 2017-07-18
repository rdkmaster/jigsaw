import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {ngForDemoComponent} from "./app.component";
@NgModule({
    declarations: [ngForDemoComponent],
    bootstrap: [ ngForDemoComponent ],
    imports: [CommonModule,JigsawCollapseModule,JigsawButtonModule]
})
export class ngForDemoModule{

}
