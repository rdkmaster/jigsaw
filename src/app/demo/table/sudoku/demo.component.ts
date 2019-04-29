import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {NumberRenderer} from "./number-renderer";
import {CHECK_PUZZLE_STATUS, isTargetConflicted, PUZZLE_RESET, PUZZLE_SOLVED} from "./utils";
import {JigsawInfoAlert} from "../../../../jigsaw/pc-components/alert/alert";


@Component({
    templateUrl: './demo.component.html'
})
export class SudokuGameComponent {
    puzzles: string[][];
    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData([], '123456789'.split('').map(n => 'c' + n));
        this.tableData.subscribe((event) => this.checkBoardStatus(event));
        http.get('mock-data/soduku-puzzles').subscribe((data: string[][]) => {
            this.puzzles = data;
            this.newPuzzle();
        });
    }

    columnDefineGenerator() {
        return {
            cell: {
                renderer: NumberRenderer
            }
        }
    }

    newPuzzle() {
        const rawData = this.puzzles[(Math.random() * this.puzzles.length).toFixed(0)];
        this.tableData.data = rawData.concat();
        this.tableData.refresh();
        this.tableData.emit(PUZZLE_RESET);
    }

    checkBoardStatus(event) {
        if (event !== CHECK_PUZZLE_STATUS) {
            return;
        }
        let hasError = false;
        console.log('checking board status...');
        this.tableData.data.forEach((row, rowIdx) => {
            if (hasError) {
                return;
            }
            row.forEach((cellData:string, colIdx:number) => {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '通过数独游戏的实现过程来学习如何在表格的渲染器之间进行复杂的交互逻辑';
    description: string = '';
    tags: string[] = [
        'JigsawTable'
    ];
}
