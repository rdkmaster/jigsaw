import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {HttpClient} from "@angular/common/http";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})
export class ArrayCollectionAjaxDemoComponent extends DemoBase {
    consoleTexts = new ArrayCollection<string>();

    constructor(http: HttpClient) {
        super();

        const ac = new ArrayCollection();
        ac.http = http;
        ac.fromAjax('mock-data/core-members');

        this.consoleAppend("list of our first core members:");
        ac.onAjaxComplete(() => {
            ac.forEach((author:any) => {
                this.consoleAppend("id: " + author.id + ", name=" + author.name);
            });
        });
    }

     consoleAppend(msg: string): void {
        this.consoleTexts.push((this.consoleTexts.length + 1) + ': ' + msg);
    }
}
