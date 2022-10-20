import { Component, NgModule, Input, } from "@angular/core";

@Component({
    selector: "doc-template",
    templateUrl: "./doc-template.html",
    styleUrls: ["./doc-template.scss"],
})
export class DocTemplate {
    @Input()
    public docContent: string;
}

@NgModule({
    imports: [],
    declarations: [DocTemplate],
    exports: [DocTemplate],
})
export class DocTemplateModule {

}
