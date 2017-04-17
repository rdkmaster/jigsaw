import {Component} from "@angular/core";
import {ArrayCollection, PageableArray} from "../../../../../core/data/array-collection";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'demo.html'
})
export class ArrayCollectionBasicDemoComponent {
    consoleTexts = new ArrayCollection<string>();

    constructor(http: Http) {
        const ac: ArrayCollection<number> = new ArrayCollection([1, 2, 3]);
        ac.push(4);
        this.consoleAppend("ac.toString(): " + ac.toString());

        this.consoleAppend('');
        this.consoleAppend('attention!');
        this.consoleAppend("ac[2] = 'any string'; // not allowed! use ac.set(2, 'any string') instead!");
        this.consoleAppend("ac.set(2, 'any string'); // it's fine");
        this.consoleAppend("const str = ac[2]; // it's fine");

        this.consoleAppend('');
        this.consoleAppend('ac.forEach test:');
        ac.forEach(item => {
            this.consoleAppend('item: ' + item);
        });
    }

    private consoleAppend(msg: string): void {
        this.consoleTexts.push((this.consoleTexts.length + 1) + ': ' + msg);
    }
}
