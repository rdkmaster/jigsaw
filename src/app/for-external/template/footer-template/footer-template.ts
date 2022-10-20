import { Component, NgModule, Input, ViewEncapsulation, } from "@angular/core";

@Component({
    selector: "footer-template",
    templateUrl: "./footer-template.html",
    styleUrls: ["./footer-template.scss"],
    encapsulation: ViewEncapsulation.None
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
