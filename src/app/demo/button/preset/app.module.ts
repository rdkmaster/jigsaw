import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {ButtonPresetDemoComponent} from "./app.component";

@NgModule({
    declarations: [ButtonPresetDemoComponent],
    bootstrap: [ ButtonPresetDemoComponent ],
    imports: [JigsawButtonModule]
})
export class ButtonPresetDemoModule{

}
