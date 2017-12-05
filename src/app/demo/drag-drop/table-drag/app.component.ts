import {Component, ElementRef, Renderer2, ViewEncapsulation} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine} from "jigsaw/component/table/table-typings";
import {DragDropInfo} from "jigsaw/directive/dragdrop/types";
import {TableDragDeleteRow, TableDragReplaceRow} from "./table-renderer";


@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TableDragDemoComponent {
    tableData: TableData;

    employees: any[] = [
        ["Andy", "Coder", "$17149", "2017/4/26", "R&D Dept I", 65],
        ["Vivian", "Accountant", "$18272", "2017/4/22", "R&D Dept II", 892],
        ["Wendy", "Coder", "$17257", "2017/4/26", "HR I", 394],
        ["Joyce", "System Architect", "$12106", "2017/4/27", "R&D Dept III", 93],
        ["Tracy", "System Architect", "$10531", "2017/4/23", "HR II", 580],
        ["Nancy", "Coder", "$13585", "2017/4/26", "Marketing II", 900],
        ["Johnny", "Accountant", "$16346", "2017/4/26", "R&D Dept III", 403]
    ];

    constructor(public renderer: Renderer2, public elementRef: ElementRef) {
        this.tableData = new TableData([
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 316],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 711],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 796]],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '10%',
            header: {
                text: '拖拽换行',
                clazz: 'red-text'
            },
            cell: {
                renderer: TableDragReplaceRow
            }
        },
        {
            pos: 0,
            width: '10%',
            header: {
                text: '拖拽删除',
                clazz: 'red-text'
            },
            cell: {
                renderer: TableDragDeleteRow
            }
        }
    ];

    //拖拽用户块
    dragStartHandle(dragInfo: DragDropInfo, employee:any) {
        console.log('drag start');
        dragInfo.dragDropData = employee;
    }

    //数据拖入表格
    tableDragEnterHandle(dragInfo: DragDropInfo) {
        console.log('drag enter');
        dragInfo.event.dataTransfer.dropEffect = 'move';
        if (dragInfo.event.dataTransfer.effectAllowed == 'move') {
            this.renderer.addClass(this.elementRef.nativeElement.querySelector('jigsaw-table'), 'over');
        }
    }

    tableDragOverHandle(dragInfo: DragDropInfo) {
        console.log('drag over');
        dragInfo.event.dataTransfer.dropEffect = 'move';
        if (dragInfo.event.dataTransfer.effectAllowed == 'move') {
            this.renderer.addClass(this.elementRef.nativeElement.querySelector('jigsaw-table'), 'over');
        }
    }

    tableDragLeaveHandle(dragInfo: DragDropInfo) {
        console.log('drag leave');
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('jigsaw-table'), 'over');
    }

    tableDropHandle(dragInfo: DragDropInfo) {
        console.log('drop');
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('jigsaw-table'), 'over');
        const index = this.employees.findIndex(employee => employee.toString() === dragInfo.dragDropData.toString());
        if (index != -1) {
            this.employees.splice(index, 1);
            this.tableData.data.push(dragInfo.dragDropData);
            this.tableData.refresh();
        }
    }

    //表格行数据放入垃圾桶
    trashDragEnterHandle(dragInfo: DragDropInfo) {
        console.log('drag enter');
        dragInfo.event.dataTransfer.dropEffect = 'copy';
    }

    trashDragOverHandle(dragInfo: DragDropInfo) {
        console.log('drag over');
        dragInfo.event.dataTransfer.dropEffect = 'copy';
        if (dragInfo.event.dataTransfer.effectAllowed == 'copy') {
            this.renderer.addClass(this.elementRef.nativeElement.querySelector('.trash-box'), 'over');
        }
    }

    trashDragLeaveHandle(dragInfo: DragDropInfo) {
        console.log('drag leave');
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.trash-box'), 'over');
    }

    trashDropHandle(dragInfo: DragDropInfo) {
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.trash-box'), 'over');
        const delRowIndex = dragInfo.dragDropData;
        this.tableData.data.splice(delRowIndex, 1);
        this.tableData.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
