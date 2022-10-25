import { Component, NgModule, Input, ViewEncapsulation, } from "@angular/core";
import { JigsawTrustedHtmlModule } from 'jigsaw/public_api';

@Component({
    selector: "doc-template",
    templateUrl: "./doc-template.html",
    styleUrls: ["./doc-template.scss"],
    encapsulation: ViewEncapsulation.None
})
export class DocTemplate {
    @Input()
    public docContent: string;
}

@NgModule({
    imports: [JigsawTrustedHtmlModule],
    declarations: [DocTemplate],
    exports: [DocTemplate],
})
export class DocTemplateModule {

}
