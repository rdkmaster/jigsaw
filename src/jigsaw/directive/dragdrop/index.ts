import {NgModule} from "@angular/core";
import {JigsawDraggable} from "./draggable";
import {JigsawDroppable} from "./droppable";

@NgModule({
    declarations: [JigsawDraggable],
    exports: [JigsawDraggable]
})
export class JigsawDraggableModule {
}

@NgModule({
    declarations: [JigsawDroppable],
    exports: [JigsawDroppable]
})
export class JigsawDroppableModule {
}

export * from './draggable';
export * from './droppable';

