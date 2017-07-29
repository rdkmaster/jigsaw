import {NgModule} from "@angular/core";
import {JigsawDraggable} from "./draggable";
import {JigsawH5Draggable} from "./draggable-h5";
import {JigsawH5Droppable} from "./droppable-h5";

@NgModule({
    declarations: [JigsawDraggable],
    exports: [JigsawDraggable]
})
export class JigsawDraggableModule {
}

@NgModule({
    declarations: [JigsawH5Draggable],
    exports: [JigsawH5Draggable]
})
export class JigsawH5DraggableModule {
}

@NgModule({
    declarations: [JigsawH5Droppable],
    exports: [JigsawH5Droppable]
})
export class JigsawH5DroppableModule {
}

export * from './draggable';
export * from './draggable-h5';
export * from './droppable-h5';

