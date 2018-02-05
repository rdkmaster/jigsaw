import {JigsawEditableBox} from "./view-editor";
import {ComponentRef, EmbeddedViewRef, Type} from "@angular/core";

export type ComponentInput = {
    property: string,
    type?: string,
    default?: any,
    binding?: string
}

export type ComponentMetaData = {
    [index: string]: any,
    component: Type<any>,
    selector: string,
    inputs?: ComponentInput[],
    outputs?: any,
    import?: string
}

export type LayoutComponentInfo = {
    box: JigsawEditableBox,
    component: ComponentRef<any> | EmbeddedViewRef<any>
}

