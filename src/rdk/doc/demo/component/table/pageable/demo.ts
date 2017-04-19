import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";

@Component({
  templateUrl: 'demo.html'
})
export class TablePageableDemoComponent {
    constructor() {
        const tg:TestGeneric<string> = new TestGeneric('123');
        console.log(typeof tg.getData());
    }
}

class TestGeneric<T = number> {
    constructor(private data:T) {

    }
    getData():T {
        return this.data;
    }
}
