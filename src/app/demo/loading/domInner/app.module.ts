import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {DomInnerDemoComponent} from "./app.component";
@NgModule({
    declarations: [DomInnerDemoComponent],
    bootstrap: [DomInnerDemoComponent],
    imports: [JigsawLoadingModule,JigsawButtonModule,CommonModule]
})
export class DomInnerDemoModule{

}
