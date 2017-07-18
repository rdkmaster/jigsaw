import {NgModule} from "@angular/core";
import {ButtonDisableDemoComponent} from "./app.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {JigsawCheckBoxModule} from "../../../../jigsaw/component/checkbox/index";

@NgModule({
    declarations: [ButtonDisableDemoComponent],
    imports: [JigsawButtonModule,JigsawCheckBoxModule],
    exports: [ButtonDisableDemoComponent]
})
export class ButtonDisableDemoModule{

}
