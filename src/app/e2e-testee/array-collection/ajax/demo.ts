import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'demo.html'
})
export class ArrayCollectionAjaxDemoComponent {
    consoleTexts = new ArrayCollection<string>();

    constructor(http: Http) {
        const ac = new ArrayCollection();
        ac.http = http;
        ac.fromAjax('mock-data/array-collection/core-members.json');

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
