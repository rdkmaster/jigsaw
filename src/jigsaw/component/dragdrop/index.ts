import {NgModule} from "@angular/core";
import {JigsawMoveable} from "./moveable";
import {JigsawDraggable} from "./draggable";
import {JigsawDroppable} from "./droppable";

@NgModule({
    declarations: [JigsawMoveable],
    exports: [JigsawMoveable]
})
export class JigsawMoveableModule {
}

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

export * from './moveable';
export * from './draggable';
export * from './droppable';

