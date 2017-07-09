import {Component, ElementRef, OnInit, ViewEncapsulation} from "@angular/core";
import {ArrayCollection, PageableArray} from "jigsaw/core/data/array-collection";
import {Http} from "@angular/http";

type TestMsg = {
    test: boolean,
    msg: string
}

@Component({
    templateUrl: 'demo.html',
    styles: ['.error{color: red}'],
    encapsulation: ViewEncapsulation.None
})
export class ArrayCollectionBasicDemoComponent implements OnInit {
    consoleTexts = new ArrayCollection<TestMsg>();

    constructor(http: Http, private elementRef: ElementRef) {
        const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        const ac: ArrayCollection<number> = new ArrayCollection([1, 2, 3, 4, 5, 6, 7, 8]);
        this.consoleAppend(ac, arr, 'new');

        ac.set(100, 1111);
        arr[100] = 1111;
        this.consoleAppend(ac, arr, 'set value');
        this.consoleAppendForStr(ac[2], arr[2], 'get value');

        ac.push(4);
        arr.push(4);
        this.consoleAppend(ac, arr, 'push');

        ac.pop();
        arr.pop();
        this.consoleAppend(ac, arr, 'pop');

        ac.reverse();
        arr.reverse();
        this.consoleAppend(ac, arr, 'reverse');

        ac.shift();
        arr.shift();
        this.consoleAppend(ac, arr, 'shift');

        const acStr = ac.join(',,');
        const arrStr = arr.join(',,');
        this.consoleAppendForStr(acStr, arrStr, 'join');

        const concatAc = ac.concat([40, 50, 60]);
        const concatArr = arr.concat([40, 50, 60]);
        this.consoleAppend(concatAc, concatArr, 'concat');

        const sliceAc = ac.slice(4);
        const sliceArr = arr.slice(4);
        this.consoleAppend(sliceAc, sliceArr, 'slice');

        ac.sort((a, b) => a - b);
        arr.sort((a, b) => a - b);
        this.consoleAppend(ac, arr, 'sort');

        ac.splice(2, 2, 20, 21, 22);
        arr.splice(2, 2, 20, 21, 22);
        this.consoleAppend(ac, arr, 'splice');

        ac.unshift(30, 31);
        arr.unshift(30, 31);
        this.consoleAppend(ac, arr, 'unshift');

        console.log(ac.toString());
        console.log(arr.toString());
        console.log(ac.length == arr.length);
        console.log(ac.toString() == arr.toString());
    }

     consoleAppend(ac: ArrayCollection<number>, arr: Array<number>, msg: string): void {
        if (this.isEqual(ac, arr)) {
            this.consoleTexts.push({test: true, msg: msg + ' success'})
        } else {
            this.consoleTexts.push({
                test: false, msg: msg + ` false<br> ac: ${ac.toString()} length: ${ac.length}<br>
                                    arr: ${arr.toString()} length: ${arr.length}`
            })
        }
    }

     consoleAppendForStr(acStr: string | number, arrStr: string | number, msg: string): void {
        if (acStr == arrStr) {
            this.consoleTexts.push({test: true, msg: msg + ' success'})
        } else {
            this.consoleTexts.push({
                test: false, msg: msg + ` false<br> acStr: ${acStr}<br> arrStr: ${arrStr}`
            })
        }
    }

     isEqual(ac: ArrayCollection<number>, arr: Array<number>) {
        return ac.length == arr.length && ac.toString() == arr.toString();
    }

    ngOnInit() {
        let consoleElStr = '';
        this.consoleTexts.forEach(consoleTest => {
            if (consoleTest.test) {
                consoleElStr += `<p class="log">${consoleTest.msg}</p>`
            } else {
                consoleElStr += `<p class="error">${consoleTest.msg}</p>`
            }
        });
        this.elementRef.nativeElement.querySelector('.ac-test-result').innerHTML = consoleElStr;
    }
}
