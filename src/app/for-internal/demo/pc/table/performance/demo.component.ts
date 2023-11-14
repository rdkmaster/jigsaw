import { Component } from "@angular/core";
import { TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TablePerformanceDemoComponent {
    public tableData: TableData;

    constructor() {
        const templateRow: string[] = [
            "YJ001", "10,-1", "null", "null", "啊啊啊啊啊啊啊", "195", "Q21", "WMWHSE2", "1694670", "150206", "015020600140",
            "diplexer(L/MH)（698~960/1710~2690MHz）,diplexer(L/MH)（698~960/1710~2690MHz),ZC", "B", "TJ", "SC", "27", "null",
            "0", "03", "片", "PCS", "10", "FLT18D0917L-3244B", "FLT18D0917L-3244B",
            "插入损耗:Typ0.6dB~Max0.7dB;硫化风险等级:不涉及;,Classical insertion loss:Typ0.6dB~Max0.7dB;,null", "null", "null",
            "0", "null", "null", "null", "00134460", "00324438", "null", "0", "0", "null", "null", "null", "null", "null",
            "null", "null", "null", "null", "null", "null,/,/,null", "10039252", "015020600140", "null", "null", "null",
            "null", "null", "null", "null", "null", "1", "2023-11-04 12:30:25", "0", "2022-09-26 14:04:11", "10039252",
            "2023-11-04 12:30:25", "null", "2023-11-06 00:53:07.637", "2023-11-06 00:53:07.637",
            "ods/scp(10.54.155.99)/504390229156724736/APP_ISCP.BA_ITEM/v_scp_iaps_db", "Y", "1", "null", "null", "null",
            "null", "1608", "01"
        ];
        const dataArray: string[][] = [];
        for (let i = 1; i <= 120; i++) {
            const modifiedRow = [...templateRow];
            modifiedRow[0] = "YJ" + String(i).padStart(3, '0');
            dataArray.push(modifiedRow);
        }

        this.tableData = new TableData()
        this.tableData.fromObject({
            header: [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
                "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58",
                "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77",
                "78", "79", "80", "81", "82"
            ],
            field: [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
                "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58",
                "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77",
                "78", "79", "80", "81", "82"
            ],
            data: dataArray
        });
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
