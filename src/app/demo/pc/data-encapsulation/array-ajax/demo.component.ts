import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ArrayCollectionAjaxDemoComponent {
    consoleTexts = new ArrayCollection<string>();

    constructor(http: HttpClient) {
        const ac = new ArrayCollection();
        ac.http = http;
        ac.fromAjax('mock-data/core-members');
        ac.dataReviser = data => {
            data.push({id: 6, name: '朱明鹏'});
            return data;
        };

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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
