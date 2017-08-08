import {
    Component, Renderer2,ElementRef, ViewContainerRef, ViewEncapsulation
} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "../../../../jigsaw/component/table/table-api";
import {TableSwimLaneCell} from "./table-renderer";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class swimLaneDiagramDemoComponent {
    tableData: TableData;
    elementRef: ElementRef;
    neHover:boolean=true;
    currentIndex:any;

    neList = [
        {name: 'eNB', desc: '100.89.140.69', ip: '100.89.140.69'},
        {name: 'eMSC', desc: 'XNMME03', ip: '221.177.187.1'},
        {name: 'PCRF', desc: 'XNSAEGW02', ip: '221.177.187.112'},
    ];

    swimLaneData = [
        {
            signalid: 1,
            timestamp: 1499755079939243,
            signaldesc: 'NAS_EPS Service request',
            fromnedesc: '100.89.140.69',
            fromneip:'100.89.140.69',
            tonedesc: 'XNMME03',
            toneip:'100.89.254.145'
        },
        {
            signalid: 2,
            timestamp: 1499755079944271,
            signaldesc: 'S1AP InitialContextSetupRequest',
            fromnedesc: 'XNMME03',
            fromneip:'100.89.254.145',
            tonedesc: '100.89.140.69',
            toneip:'100.89.140.69'
        },
        {
            signalid: 3,
            timestamp: 1499755080028953,
            signaldesc: 'NAS_EPS Service request',
            fromnedesc: 'XNMME03',
            fromneip:'100.89.254.145',
            tonedesc: '100.89.140.69',
            toneip:'100.89.140.69'
        },
        {
            signalid: 4,
            timestamp: 1499755080030389,
            signaldesc: 'S1AP InitialContextSetupRequest',
            fromnedesc: '100.89.140.69',
            fromneip:'100.89.140.69',
            tonedesc: 'XNMME03',
            toneip:'100.89.254.145'
        },
        {
            signalid: 5,
            timestamp: 1499755080035498,
            signaldesc: 'GTPV2 Modify Bearer Request',
            fromnedesc: 'XNMME03',
            fromneip:'   221.177.187.1',
            tonedesc: 'XNSAEGW02',
            toneip:'221.177.187.17'
        },
        {
            signalid: 6,
            timestamp: 1499755080040392,
            signaldesc: 'GTPV2 Modify Bearer Response',
            fromnedesc: 'XNSAEGW02',
            fromneip:'221.177.187.17',
            tonedesc: 'XNMME03',
            toneip:'221.177.187.1'
        },
        {
            signalid: 7,
            timestamp: 1499755080049906,
            signaldesc: 'GTPV2 Update Bearer Request',
            fromnedesc: 'XNSAEGW02',
            fromneip:'221.177.187.17',
            tonedesc: 'XNMME03',
            toneip:'221.177.187.1'
        },
        {
            signalid: 8,
            timestamp: 1499755080064918,
            signaldesc: 'GTPV2 Update Bearer Response',
            fromnedesc: 'XNMME03',
            fromneip:'221.177.187.1',
            tonedesc: 'XNSAEGW02',
            toneip:'221.177.187.17'
        },
        {
            signalid: 9,
            timestamp: 1499755080068520,
            signaldesc: 'NAS_EPS Service request',
            fromnedesc: '100.89.140.69',
            fromneip:'100.89.140.69',
            tonedesc: 'XNMME03',
            toneip:'100.89.254.145'
        }
    ];

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, elementRef: ElementRef) {
        this.elementRef=elementRef;
        this.tableData = new TableData([], ['id', 'date'], ['id', 'date']);
        for (let i = 0; i < this.neList.length; i++) {
            this.tableData.field.push('swimLang' + i);
            this.tableData.header.push('swimLang' + i);
        }
        for (let i = 0; i < this.swimLaneData.length; i++) {
            const swimLane = this.swimLaneData[i];

            const fromNeIndex = this.neList.findIndex(ne => ne.desc === swimLane.fromnedesc);
            const toNeIndex = this.neList.findIndex(ne => ne.desc === swimLane.tonedesc);
            const swimLaneIndex = fromNeIndex < toNeIndex ? fromNeIndex : toNeIndex;

            const data: any[] = [];
            for (let j = 0; j < this.tableData.field.length; j++) {
                data[j] = {haveSignal:false,isDashed:true};
            }

            data[0] = swimLane.signalid;
            data[1] = new Date(swimLane.timestamp / 1000).toLocaleString();
            let usetime: number | string;
            if (i == 0) {
                usetime = null;
            } else {
                usetime = swimLane.timestamp - this.swimLaneData[i - 1].timestamp;
            }
            data[swimLaneIndex + 2] = {
                usetime: usetime,
                signaldesc: swimLane.signaldesc,
                fromnedesc: swimLane.fromnedesc,
                fromneip:swimLane.fromneip,
                tonedesc: swimLane.tonedesc,
                toneip:swimLane.toneip,
                neList: this.neList,
                haveSignal:true,
                isDashed:false
            };
            for (let j = swimLaneIndex+3; j < this.tableData.field.length; j++) {
                data[j] = {haveSignal:false,isDashed:false};
            }
            this.tableData.data.push(data)
        }
        const nullData:any[]=['','',{}];
        for (let j = 0; j < this.tableData.field.length; j++) {
            nullData[j] = null;
            if(j>=2) nullData[j] = {haveSignal:false,isDashed:false};
        }
        for(let j=0;j<2;j++){
            this.tableData.data.push(nullData);
        }
        console.log(this.tableData.data);
    }

    ngAfterViewInit() {
        console.log(this.elementRef.nativeElement.parentElement.clientWidth);
        this.columnDefines = [
            {
                target: 0,
                width: '50px'
            },
            {
                target: 1,
                width: '150px'
            },
            {
                target: (field, index) => {
                    return index > 1
                },
                width: '200px',
                cell: {
                    renderer: TableSwimLaneCell
                }
            },{
                target:this.neList.length+1,
                width:this.elementRef.nativeElement.parentElement.clientWidth-200-(this.neList.length-1)*200 +'px'
            }
        ];
    }

    columnDefines: ColumnDefine[];

    handleRowSelect(rowIndex: number){
        console.log(rowIndex);
    }

    handleDbRowSelect(rowIndex: number){
        console.log(rowIndex);
    }
}

