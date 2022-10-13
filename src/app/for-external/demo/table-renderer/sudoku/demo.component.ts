import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, JigsawInfoAlert } from "jigsaw/public_api";
import { NumberRenderer } from "./number-renderer";
import { CHECK_PUZZLE_STATUS, isTargetConflicted, PUZZLE_RESET, PUZZLE_SOLVED } from "./utils";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-sudoku',
    templateUrl: './demo.component.html'
})
export class SudokuGameComponent extends AsyncDescription {
    public demoPath = "demo/table-renderer/sudoku";

    public puzzles: string[][];
    public tableData: TableData;

    public columnDefineGenerator() {
        return {
            cell: {
                noPadding: true,
                renderer: NumberRenderer
            }
        }
    }

    public newPuzzle() {
        const rawData = this.puzzles[(Math.random() * this.puzzles.length).toFixed(0)];
        this.tableData.data = rawData.concat();
        this.tableData.refresh();
        this.tableData.emit(PUZZLE_RESET);
    }

    public checkBoardStatus(event) {
        if (event !== CHECK_PUZZLE_STATUS) {
            return;
        }
        let hasError = false;
        console.log('checking board status...');
        this.tableData.data.forEach((row, rowIdx) => {
            if (hasError) {
                return;
            }
            row.forEach((cellData: string, colIdx: number) => {
                if (hasError) {
                    return;
                }
                const target = { row: rowIdx, column: colIdx };
                hasError = cellData.match(/^\d$/) ? isTargetConflicted(this.tableData, cellData, target) : true;
            })
        });
        if (!hasError) {
            JigsawInfoAlert.show("It's great! You've solved the puzzle!");
            this.tableData.emit(PUZZLE_SOLVED);
        }
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData([], '123456789'.split('').map(n => 'c' + n));
        this.tableData.subscribe((event) => this.checkBoardStatus(event));
        http.get('mock-data/soduku-puzzles').subscribe((data: string[][]) => {
            this.puzzles = data;
            this.newPuzzle();
        });
    }
}
