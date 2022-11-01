import { Component, NgModule } from "@angular/core";

@Component({
    selector: "doc-footer-template",
    templateUrl: "./doc-footer-template.html",
    styleUrls: ["./doc-footer-template.scss"]
})
export class DocFooterTemplate { }

@NgModule({
    imports: [],
    declarations: [DocFooterTemplate],
    exports: [DocFooterTemplate],
})
export class DocFooterTemplateModule {

}
