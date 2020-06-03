import {Component, ElementRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {TableData, ColumnDefine, JigsawTable} from "jigsaw/public_api";
import {TableSwimLaneCell} from "./table-renderer";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SwimLaneDiagramDemoComponent {
    tableData: TableData;
    neHover: boolean = true;
    currentIndex: any;
    colWidth = 200;
    @ViewChild(JigsawTable, {static: false}) table: JigsawTable;

    // 下面这个数组的个数决定了表格的列数，本demo假设它事先未知。
    neList = [
        {name: 'eNB', desc: '100.89.140.69', ip: '100.89.140.69'},
        {name: 'eMSC', desc: 'XNMME03', ip: '221.177.187.1'},
        {name: 'PCRF', desc: 'XNSAEGW02', ip: '221.177.187.112'},
    ];

    constructor(public elementRef: ElementRef) {
        this.tableData = new TableData([], ['id', 'date'], ['id', 'date']);
        for (let i = 0; i < this.neList.length; i++) {
            this.tableData.field.push('swimLang' + i);
            this.tableData.header.push('swimLang' + i);
        }
        this.swimLaneData.forEach((swimLane, index) => {
            const fromNeIndex = this.neList.findIndex(ne => ne.desc === swimLane.fromnedesc);
            const toNeIndex = this.neList.findIndex(ne => ne.desc === swimLane.tonedesc);
            const swimLaneIndex = fromNeIndex < toNeIndex ? fromNeIndex : toNeIndex;

            const data: any[] = [];
            for (let j = 0; j < this.tableData.field.length; j++) {
                data[j] = {haveSignal: false, isDashed: true};
            }

            data[0] = swimLane.signalid;
            data[1] = new Date(swimLane.timestamp / 1000).toLocaleString();
            let usetime: number | string;
            if (index == 0) {
                usetime = null;
            } else {
                usetime = swimLane.timestamp - this.swimLaneData[index - 1].timestamp;
            }
            data[swimLaneIndex + 2] = {
                usetime: usetime,
                signaldesc: swimLane.signaldesc,
                fromnedesc: swimLane.fromnedesc,
                fromneip: swimLane.fromneip,
                tonedesc: swimLane.tonedesc,
                toneip: swimLane.toneip,
                neList: this.neList,
                haveSignal: true,
                isDashed: false
            };
            for (let j = swimLaneIndex + 3; j < this.tableData.field.length; j++) {
                data[j] = {haveSignal: false, isDashed: false};
            }
            this.tableData.data.push(data)
        });
        const nullData: any[] = ['', '', {}];
        for (let j = 0; j < this.tableData.field.length; j++) {
            nullData[j] = null;
            if (j >= 2) nullData[j] = {haveSignal: false, isDashed: false};
        }
        for (let j = 0; j < 2; j++) {
            this.tableData.data.push(nullData);
        }
        console.log(this.tableData.data);
    }

    columnDefineGenerator(field, index): ColumnDefine {
        switch (index) {
            case 0:
                return {width: '50px'};
            case 1:
                return {width: '150px'};
            case this.neList.length + 1:
                return {
                    width: this.elementRef.nativeElement.parentElement.clientWidth - this.neList.length * 200,
                    cell: {
                        renderer: TableSwimLaneCell
                    }
                };
            default:
                return {
                    width: this.colWidth,
                    cell: {
                        renderer: TableSwimLaneCell
                    }
                }
        }
    }

    changeWidth(width) {
        this.colWidth = width;
        this.table.update();
    }

    swimLaneData = [
        {
            signalid: 1,
            timestamp: 1499755079939243,
            signaldesc: 'NAS_EPS Service request',
            fromnedesc: '100.89.140.69',
            fromneip: '100.89.140.69',
            tonedesc: 'XNMME03',
            toneip: '100.89.254.145'
        },
        {
            signalid: 2,
            timestamp: 1499755079944271,
            signaldesc: 'S1AP InitialContextSetupRequest',
            fromnedesc: 'XNMME03',
            fromneip: '100.89.254.145',
            tonedesc: '100.89.140.69',
            toneip: '100.89.140.69'
        },
        {
            signalid: 3,
            timestamp: 1499755080028953,
            signaldesc: 'NAS_EPS Service request',
            fromnedesc: 'XNMME03',
            fromneip: '100.89.254.145',
            tonedesc: '100.89.140.69',
            toneip: '100.89.140.69'
        },
        {
            signalid: 4,
            timestamp: 1499755080030389,
            signaldesc: 'S1AP InitialContextSetupRequest',
            fromnedesc: '100.89.140.69',
            fromneip: '100.89.140.69',
            tonedesc: 'XNMME03',
            toneip: '100.89.254.145'
        },
        {
            signalid: 5,
            timestamp: 1499755080035498,
            signaldesc: 'GTPV2 Modify Bearer Request',
            fromnedesc: 'XNMME03',
            fromneip: '   221.177.187.1',
            tonedesc: 'XNSAEGW02',
            toneip: '221.177.187.17'
        },
        {
            signalid: 6,
            timestamp: 1499755080040392,
            signaldesc: 'GTPV2 Modify Bearer Response',
            fromnedesc: 'XNSAEGW02',
            fromneip: '221.177.187.17',
            tonedesc: 'XNMME03',
            toneip: '221.177.187.1'
        },
        {
            signalid: 7,
            timestamp: 1499755080049906,
            signaldesc: 'GTPV2 Update Bearer Request',
            fromnedesc: 'XNSAEGW02',
            fromneip: '221.177.187.17',
            tonedesc: 'XNMME03',
            toneip: '221.177.187.1'
        },
        {
            signalid: 8,
            timestamp: 1499755080064918,
            signaldesc: 'GTPV2 Update Bearer Response',
            fromnedesc: 'XNMME03',
            fromneip: '221.177.187.1',
            tonedesc: 'XNSAEGW02',
            toneip: '221.177.187.17'
        },
        {
            signalid: 9,
            timestamp: 1499755080068520,
            signaldesc: 'NAS_EPS Service request',
            fromnedesc: '100.89.140.69',
            fromneip: '100.89.140.69',
            tonedesc: 'XNMME03',
            toneip: '100.89.254.145'
        }
    ];

    handleRowSelect(rowIndex: number) {
        console.log(rowIndex);
    }

    handleDbRowSelect(rowIndex: number) {
        console.log(rowIndex);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了表格应对事先未知多少列，并且需要动态调整这些列定义的方法。';
    description: string = require('!!raw-loader!./readme.md');
}
