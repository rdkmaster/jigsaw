import {Component} from "@angular/core";
import {ArrayCollection, PageableArray} from "../../../../../core/data/array-collection";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'demo.html'
})
export class ArrayCollectionBasicDemoComponent {
    consoleTexts = new ArrayCollection<string>();

    constructor(http: Http) {
        const arr: number[] = [1, 2, 3];
        const ac: ArrayCollection<number> = new ArrayCollection([1, 2, 3]);
        console.log(ac.length);
        console.log(arr.length);
        ac.push(4);
        arr.push(4);
        // ac[100] = 1111;
        console.log(ac.length);
        console.log(arr.length);

        ac.set(100, 1111);
        arr[100] = 1111;
        console.log(ac.length);
        console.log(arr.length);



        console.log(ac);
        console.log(arr);

        // ac.set(5, 1111);
        // console.log(ac);
        // console.log(ac.get(5));
        //
        // console.log(ac[5]);
        //
        // console.log(ac.length);


        // this.consoleAppend("ac.toString(): " + ac.toString());
        //
        //
        //
        // this.consoleAppend('');
        // this.consoleAppend('attention!');
        // this.consoleAppend("ac[2] = 'any string'; // not allowed! use ac.set(2, 'any string') instead!");
        // this.consoleAppend("ac.set(2, 'any string'); // it's fine");
        // this.consoleAppend("const str = ac[2]; // it's fine");
        //
        // this.consoleAppend('');
        // this.consoleAppend('ac.forEach test:');
        // ac.forEach(item => {
        //     this.consoleAppend('item: ' + item);
        // });
    }

    private consoleAppend(msg: string): void {
        this.consoleTexts.push((this.consoleTexts.length + 1) + ': ' + msg);
    }
}
