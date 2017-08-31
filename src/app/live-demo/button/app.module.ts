import {NgModule} from "@angular/core";
import {ButtonDemoComponent} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawLoadingModule} from "../../../jigsaw/component/loading/loading";

@NgModule({
    declarations: [ButtonDemoComponent],
    bootstrap: [ ButtonDemoComponent ],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule]
})
export class ButtonDemoModule{

}
