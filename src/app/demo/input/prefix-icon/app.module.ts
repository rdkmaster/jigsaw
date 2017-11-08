import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputPrefixIconDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    bootstrap: [InputPrefixIconDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputPrefixIconDemoModule {

}
