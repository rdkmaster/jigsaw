import {GeneralCollection} from "./general-collection";
import {ComponentRef, EmbeddedViewRef, Type} from "@angular/core";
import {CommonUtils} from "../utils/common-utils";
import {InternalUtils} from "../utils/internal-utils";
import {JigsawEditableBox} from "../../component/box/editable-box";

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

export class LayoutData extends GeneralCollection<any> {
    [index: string]: any;
    direction?: string;
    justify?: string;
    align?: string;
    order?: number;
    grow?: number;
    shrink?: number;
    nodes?: LayoutData[];
    componentMetaDataList?: ComponentMetaData[];
    innerHtml?: string;
    components?: (ComponentRef<any> | EmbeddedViewRef<any>)[];
    box: JigsawEditableBox;

    /**
     * 把LayoutData转化为dom字符串
     * @returns {string}
     */
    public toHtml(): string {
        return this._parseNodeToHtml(this, '');
    }

    /**
     * 解析dom字符串，生成 LayoutData
     * @param {string} domStr
     * @param {ComponentMetaData[]} metaDataList
     * @returns {LayoutData}
     */
    public static of(domStr: string, metaDataList: ComponentMetaData[]): LayoutData {
        let layout = document.createElement('div');
        layout.innerHTML = domStr;
        let json;
        if (layout.children) {
            json = this._parseElementToData(layout.children[0], metaDataList);
        }
        return json ? new LayoutData().fromObject(json) : null;
    }

    /**
     * 获取所有layout box里面的内容组件，
     * @returns {LayoutComponentInfo[]}
     */
    public getComponents(): LayoutComponentInfo[] {
        return this._getComponent(this, []);
    }

    /**
     * 根据componentMetaDataList设置LayoutData的componentMetaDataList属性及生成innerHtml
     * @param {ComponentMetaData[]} componentMetaDataList
     */
    public setComponentMetaData(componentMetaDataList: ComponentMetaData[]) {
        if (!(componentMetaDataList instanceof Array) || componentMetaDataList.length == 0) return;
        this.componentMetaDataList = componentMetaDataList;
        this.innerHtml = '';
        componentMetaDataList.forEach(componentMetaData => {
            this.innerHtml += `<${componentMetaData.selector} `;
            componentMetaData.inputs.forEach(input => {
                if (CommonUtils.isDefined(input.default) && input.default != '') {
                    this.innerHtml += `${InternalUtils.camelToKebabCase(input.property)}='${JSON.stringify(input.default)}' `;
                }
            });
            this.innerHtml += '>' + `</${componentMetaData.selector}> \n`;
        });
    }

    private _getComponent(node: LayoutData, arr: LayoutComponentInfo[]): LayoutComponentInfo[] {
        if (node.components instanceof Array) {
            node.components.forEach(component => {
                arr.push({
                    box: node.box,
                    component: component
                })
            });
        }
        if (node.nodes instanceof Array) {
            node.nodes.forEach(node => {
                arr = this._getComponent(node, arr)
            });
        }
        return arr;
    }

    private static _parseElementToData(element: Element, metaDataList: ComponentMetaData[]): Object {
        let node = {
            direction: null,
            grow: null,
            nodes: [],
            componentMetaDataList: [],
            innerHtml: ''
        };
        node.direction = element.getAttribute('direction');
        node.grow = element.getAttribute('grow');
        if (element.children && element.children.length != 0) {
            if (element.children[0].tagName.toLowerCase() == 'j-box' ||
                element.children[0].tagName.toLowerCase() == 'jigsaw-box') {
                for (let i = 0; i < element.children.length; i++) {
                    node.nodes.push(this._parseElementToData(element.children[i], metaDataList));
                }
            } else {
                node = this._parseElementToComponentMetaData(node, element, metaDataList);
            }
        }
        return node;
    }

    private static _parseElementToComponentMetaData(node: any, element: Element, metaDataList: ComponentMetaData[]): any {
        node.innerHtml = element.innerHTML;
        for (let i = 0; i < element.children.length; i++) {
            const inputs = [];
            for (let j = 0; j < element.children[i].attributes.length; j++) {
                inputs.push({
                    property: InternalUtils.kebabToCamelCase(element.children[i].attributes[j].name),
                    default: JSON.parse(element.children[i].attributes[j].value)
                })
            }
            node.componentMetaDataList.push({
                component: metaDataList.find(metaData => metaData.selector ==
                    element.children[i].tagName.toLowerCase()).component,
                selector: element.children[i].tagName.toLowerCase(),
                inputs: inputs
            })
        }
        return node;
    }

    private _parseNodesToHtml(nodes: LayoutData[], domStr: string): string {
        if (nodes instanceof Array) {
            nodes.forEach(node => {
                domStr = this._parseNodeToHtml(node, domStr);
            })
        }
        return domStr;
    }

    private _parseNodeToHtml(node: LayoutData, domStr: string): string {
        domStr += `<j-box${CommonUtils.isDefined(node.direction) ? ` direction="${node.direction}"` : ''}${CommonUtils.isDefined(node.grow) ? ` grow="${node.grow}"` : ''}> \n`;
        if (node.nodes instanceof Array && node.nodes.length > 0) {
            domStr = this._parseNodesToHtml(node.nodes, domStr) + `</j-box> \n`;
        } else {
            domStr += (node.innerHtml ? node.innerHtml : '') + '</j-box> \n';
        }
        return domStr;
    }

    public fromObject(data: any): LayoutData {
        if (!data) {
            return this;
        }
        if (data instanceof Array) {
            data = {
                nodes: data,
                direction: this.direction,
                justify: this.justify,
                align: this.align,
                order: this.order,
                grow: this.grow,
                shrink: this.shrink
            };
        }

        for (let key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] && key == 'nodes') {
                this.nodes = LayoutData.fromArray(data[key]);
            } else {
                this[key] = data[key];
            }
            this.propList.push(key);
        }

        this.refresh();
        return this;
    }

    public static fromArray(nodes: any[]): LayoutData[] {
        const result: LayoutData[] = [];
        if (!nodes) {
            return result;
        }
        nodes.forEach(node => {
            const td: LayoutData = new LayoutData();
            td.fromObject(node);
            result.push(td);
        });
        return result;
    }
}
