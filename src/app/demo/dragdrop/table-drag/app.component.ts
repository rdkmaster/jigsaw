import {AfterViewInit, Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine} from "jigsaw/component/table/table-api";
import {TableDelRow, TableReplaceRow} from "./table-renderer";
import {JigsawDroppable} from "../../../../jigsaw/directive/dragdrop/droppable";
import {JigsawDraggable} from "../../../../jigsaw/directive/dragdrop/draggable";


@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class TableDragDemoComponent implements AfterViewInit{
    @ViewChildren(JigsawDraggable) draggables: QueryList<JigsawDraggable>;
    @ViewChild('tableDrop', {read: JigsawDroppable}) tableDrop: JigsawDroppable;
    @ViewChild('trashDrop', {read: JigsawDroppable}) trashDrop: JigsawDroppable;
    tableData: TableData;

    employees: any[] = [
        ["Andy","Coder","$17149","2017/4/26","R&D Dept I",65],
        ["Vivian","Accountant","$18272","2017/4/22","R&D Dept II",892],
        ["Wendy","Coder","$17257","2017/4/26","HR I",394],
        ["Joyce","System Architect","$12106","2017/4/27","R&D Dept III",93],
        ["Tracy","System Architect","$10531","2017/4/23","HR II",580],
        ["Nancy","Coder","$13585","2017/4/26","Marketing II",900],
        ["Johnny","Accountant","$16346","2017/4/26","R&D Dept III",403]
    ];

    constructor(){
        this.tableData = new TableData([
            ["Emily","Coder","$15128","2017/4/21","HR II",316],
            ["Shirley","Accountant","$11845","2017/4/25","R&D Dept II",711],
            ["Eason","Coder","$17636","2017/4/24","Marketing I",796]
        ],[
            "name",
            "position",
            "salary",
            "start_date",
            "office",
            "extn"
        ],[
            "姓名",
            "职位",
            "薪资",
            "入职日期",
            "部门",
            "其他"
        ]);
    }

    additionalColumns: AdditionalColumnDefine[] = [
        {
            width: '10%',
            header: {
                text: '换行',
                class: 'red-text'
            },
            cell: {
                renderer: TableReplaceRow
            }
        },
        {
            width: '10%',
            header: {
                text: '删除',
                class: 'red-text'
            },
            cell: {
                renderer: TableDelRow
            }
        }
    ];

    ngAfterViewInit(){
        //拖拽用户块
        this.draggables.forEach(draggable => {
            draggable.dragStart.subscribe(event => {
                console.log('drag start');
                event.dataTransfer.setData('text', JSON.stringify(draggable.dragData));
            });

            draggable.dragging.subscribe(event => {
                console.log('drag');
            });

            draggable.dragEnd.subscribe(event => {
                console.log('drag end');
            })
        });

        this.tableDrop.dragEnter.subscribe(event => {
            console.log('drag enter');
            event.dataTransfer.dropEffect = 'move';
        });

        this.tableDrop.dragOver.subscribe(event => {
            console.log('drag over');
            event.dataTransfer.dropEffect = 'move';
        });

        this.tableDrop.dragLeave.subscribe(event => {
            console.log('drag leave');
        });

        //数据拖入表格
        this.tableDrop.dropped.subscribe(event => {
            console.log('drop');
            const employeeData = JSON.parse(event.dataTransfer.getData('text'));
            const index = this.employees.findIndex(employee => employee.toString() === employeeData.toString());
            if(index != -1){
                this.employees.splice(index, 1);
                this.tableData.data.push(employeeData);
                this.tableData.refresh();
            }
        });


        this.trashDrop.dragEnter.subscribe(event => {
            console.log('drag enter');
            event.dataTransfer.dropEffect = 'copy';
        });

        this.trashDrop.dragOver.subscribe(event => {
            console.log('drag over');
            event.dataTransfer.dropEffect = 'copy';
        });

        this.trashDrop.dragLeave.subscribe(event => {
            console.log('drag leave');
        });

        //表格行数据放入垃圾桶
        this.trashDrop.dropped.subscribe(event => {
            const delRowIndex = parseInt(event.dataTransfer.getData('text'));
            this.tableData.data.splice(delRowIndex, 1);
            this.tableData.refresh();
        });
    }
}
