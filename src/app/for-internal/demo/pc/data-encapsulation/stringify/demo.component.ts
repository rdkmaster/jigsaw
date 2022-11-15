import {Component} from "@angular/core";
import {ArrayCollection, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class StringifyDemoComponent {
    arrayCollection = new ArrayCollection([11, 22, 33]);
    tableData = new TableData([
        [11, 12, 13],
        [21, 22, 23],
    ], ['f1', 'f2', 'f3'], ['f1', 'f2', 'f3']);

    stringify(data): string {
        return JSON.stringify(data, null, 2);
    }

    constructor() {
        console.log('origin ArrayCollection:', this.arrayCollection);
        console.log('json of ArrayCollection:', this.arrayCollection.toJSON());
        console.log('origin GeneralCollection:', this.tableData);
        console.log('json of GeneralCollection:', this.tableData.toJSON());
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '内置数据对象实现了 toJSON() 函数，在序列化成JSON字符串时，可以剔除内部无意义的属性';
    description: string = '';
}
