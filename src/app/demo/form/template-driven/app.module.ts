import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {TemplateDrivenDemoComponent} from "./app.component";

@NgModule({
    imports: [JigsawInputModule, FormsModule, CommonModule],
    declarations: [TemplateDrivenDemoComponent],
    bootstrap: [TemplateDrivenDemoComponent],
    entryComponents: []
})
export class TemplateDrivenDemoModule {

}
