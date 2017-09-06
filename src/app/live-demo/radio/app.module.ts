import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioLiveDemoComponent} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RadioLiveDemoComponent],
    bootstrap: [RadioLiveDemoComponent],
    imports: [JigsawRadioModule, CommonModule]
})
export class RadioLiveDemoModule{

}
