import {NgModule} from "@angular/core";
import {ButtonPresetDemoComponent} from "./app.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";

@NgModule({
    declarations: [ButtonPresetDemoComponent],
    imports: [JigsawButtonModule],
    exports: [ButtonPresetDemoComponent]
})
export class ButtonPresetDemoModule{

}
