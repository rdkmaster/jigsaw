import {EventEmitter} from "@angular/core";
import {JigsawEditableBox} from "./editable-box";

export interface JigsawEditableBoxShell {
    element: HTMLElement;
    fill: EventEmitter<JigsawEditableBox>;
}
