
export const CLOSE_ALL_PAD = 'CLOSE_ALL_PAD';
export const CHECK_BOARD_STATUS = 'CHECK_BOARD_STATUS';
export const PUZZLE_SOLVED = 'PUZZLE_SOLVED';
export const PUZZLE_RESET = 'PUZZLE_RESET';


export function isTargetConflicted(tableData, value, target: {column: number, row: number}):boolean {
    let conflicted = false;
    // 所在列
    tableData.data.forEach((row, index) => {
        if (row[target.column] == value && index != target.row) {
            conflicted = true;
        }
    });

    // 所在行
    tableData.data[target.row].forEach((cellData, index) => {
        if (cellData == value && index != target.column) {
            conflicted = true;
        }
    });

    // 所在组
    const curGroupedCol = Math.floor(target.column / 3);
    const curGroupedRow = Math.floor(target.row / 3);
    tableData.data.forEach((row, rowIdx) => {
        row.forEach((cellData, colIdx) => {
            const groupedCol = Math.floor(colIdx / 3);
            const groupedRow = Math.floor(rowIdx / 3);
            if (curGroupedCol != groupedCol || curGroupedRow != groupedRow) {
                return;
            }
            if (cellData == value && colIdx != target.column && rowIdx != target.row) {
                conflicted = true;
            }
        });
    });
    return conflicted;
}
