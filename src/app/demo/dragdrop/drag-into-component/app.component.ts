import {AfterViewInit, Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {JigsawDraggable} from "jigsaw/directive/dragdrop/draggable";
import {JigsawDroppable} from "jigsaw/directive/dragdrop/droppable";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class DragIntoCmptDemoComponent implements AfterViewInit{
    @ViewChildren(JigsawDraggable) draggables: QueryList<JigsawDraggable>;
    @ViewChild(JigsawDroppable) droppable: JigsawDroppable;

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

    ngAfterViewInit(){
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

        this.droppable.dragEnter.subscribe(event => {
            console.log('drag enter');
        });

        this.droppable.dragOver.subscribe(event => {
            console.log('drag over');
        });

        this.droppable.dragLeave.subscribe(event => {
            console.log('drag leave');
        });

        this.droppable.dropped.subscribe(event => {
            console.log('drop');
            const employeeData = JSON.parse(event.dataTransfer.getData('text'));
            const index = this.employees.findIndex(employee => employee.toString() === employeeData.toString());
            if(index != -1){
                this.employees.splice(index, 1);
                this.tableData.data.push(employeeData);
                this.tableData.refresh();
            }
        })
    }
}
