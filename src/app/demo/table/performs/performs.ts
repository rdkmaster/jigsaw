import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-api";
import {DefaultCellRenderer} from "jigsaw/component/table/table-renderer";
import {TableHeadIcon} from "../renderer/table-renderer";

@Component({
    templateUrl: 'performs.html',
    styleUrls: ['performs.scss']
})
export class TablePerformsDemoComponent{
    tableData: TableData;

    constructor() {
        let start = new Date().getTime();
        this.generatorTableData();
        setTimeout(()=>{
            console.log(new Date().getTime() - start);
        }, 0)
    }

    generatorTableData(){
        let a = 1;
        let b = 1;
        let c = 1;

        let data = [];
        let header = [];
        let field = [];

        for(let i = 0; i < 100; i++){
            let dataItem = [];
            for(let j = 0; j < 100; j++){
                dataItem.push(a++);
            }
            data.push(dataItem);
        }

        for(let i = 0; i < 100; i++){
            header.push("h" + b++);
        }

        for(let i = 0; i < 100; i++){
            field.push("f" + c++);
        }

        console.log(data);
        console.log(header);
        console.log(field);

        this.tableData = new TableData(data, field, header);
    }

     _columns: ColumnDefine[] = [
        {
            target: (field, index) => {
                return index >= 0
            },
            header: {
                renderer: TableHeadIcon
            }
        },
        {
            target: (field, index) => {
                return index < 10
            },
            cell: {
                renderer: DefaultCellRenderer
            }
        }
    ];
}
