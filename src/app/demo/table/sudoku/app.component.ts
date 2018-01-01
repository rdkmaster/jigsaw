import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {NumberRenderer} from "./number-renderer";
import {CHECK_BOARD_STATUS, isTargetConflicted, PUZZLE_SOLVED} from "./utils";
import {JigsawInfoAlert} from "../../../../jigsaw/component/alert/alert";

@Component({
    templateUrl: './app.component.html'
})
export class SudokuGameComponent {
    tableData: TableData;

    columnDefineGenerator() {
        return {
            cell: {
                renderer: NumberRenderer
            }
        }
    }

    constructor() {
        this.tableData = new TableData(
            [
                '715392468'.split(''),
                '328647915'.split(''),
                '9468153 7'.split(''),
                '187463259'.split(''),
                '65312 784'.split(''),
                '492758136'.split(''),
                '834571692'.split(''),
                '579236841'.split(''),
                '261984573'.split(''),
            ],
            '123456789'.split('').map(n => 'col' + n)
        );
        this.tableData.subscribe((event) => this.checkBoardStatus(event));
    }

    checkBoardStatus(event) {
        if (event === CHECK_BOARD_STATUS) {
            let hasError = false;
            console.log('checking board status...');
            this.tableData.data.forEach((row, rowIdx) => {
                if (hasError) {
                    return;
                }
                row.forEach((cellData, colIdx) => {
                    if (hasError) {
                        return;
                    }
                    const target = {row: rowIdx, column: colIdx};
                    hasError = cellData.match(/^\d$/) ? isTargetConflicted(this.tableData, cellData, target) : true;
                })
            });
            if (!hasError) {
                JigsawInfoAlert.show("It's great! You've solved the puzzle!");
                this.tableData.emit(PUZZLE_SOLVED);
            }
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

