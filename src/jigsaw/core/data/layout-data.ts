import {GeneralCollection} from "./general-collection";
import {ComponentRef, EmbeddedViewRef, Type} from "@angular/core";
import {CommonUtils} from "../utils/common-utils";
import {InternalUtils} from "../utils/internal-utils";
import {JigsawEditableBox} from "../../component/box/editable-box";
import {JigsawTab} from "../../component/tabs/tab";

/**
 * 组件的输入属性结构化信息
 */
export class ComponentInput {
    property: string;
    type?: string;
    default?: any;
    binding?: string;
}

/**
 * 组件的元数据信息
 */
export class ComponentMetaData {
    [index: string]: any;
    component: Type<any>;
    selector: string;
    inputs?: ComponentInput[];
    outputs?: any;
    import?: string;
}

export class LayoutComponentInfo {
    box: JigsawEditableBox;
    component: ComponentRef<any> | EmbeddedViewRef<any>;
}

export type LayoutParseFunction = (element: Element, metaDataList: ComponentMetaData[], inputs: ComponentInput[]) => ComponentMetaData;

export type LayoutParseApi = {
    tagName: string;
    parseFunction: LayoutParseFunction;
}

/**
 * 用于动态布局页面的数据。
 *
 * 布局数据是Jigsaw数据体系中的一个分支，关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class LayoutData extends GeneralCollection<any> {
    [index: string]: any;
    direction?: string;
    justify?: string;
    align?: string;
    order?: number;
    grow?: number;
    shrink?: number;
    nodes?: LayoutData[];
    componentMetaDataList?: ComponentMetaData[] = [];
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

    public static parseApiList: LayoutParseApi[] = [];

    public static addParseApi(tagName: string, parseFunction: LayoutParseFunction) {
        const parseApi = this.parseApiList.find(parseApi => parseApi.tagName == tagName);
        if (parseApi) {
            parseApi.parseFunction = parseFunction;
        } else {
            this.parseApiList.push({
                tagName: tagName,
                parseFunction: parseFunction
            });
        }
    }

    public static removeParseApi(tagName: string) {
        const index = this.parseApiList.findIndex(parseApi => parseApi.tagName == tagName);
        if (index == -1) return;
        this.parseApiList.splice(index, 1);
    }

    /**
     * 获取所有layout box里面的内容组件，
     * @returns {LayoutComponentInfo[]}
     */
    public getComponents(): LayoutComponentInfo[] {
        return this._getComponent(this, []);
    }

    /**
     * 根据componentMetaDataList生成对应的html
     * @param {ComponentMetaData[]} componentMetaDataList
     */
    public setInnerHtml(componentMetaDataList: ComponentMetaData[]) {
        if (!(componentMetaDataList instanceof Array) || componentMetaDataList.length == 0) return;
        this.innerHtml = '';
        componentMetaDataList.forEach(componentMetaData => {
            componentMetaData = componentMetaData.selector == 'j-tabs-wrapper' ? componentMetaData.tabsMetaData : componentMetaData;
            this.innerHtml += this._parseMetaDataToHtml(componentMetaData);
        });
    }

    private _parseMetaDataToHtml(componentMetaData: ComponentMetaData): string {
        let innerHtml = '';
        if (componentMetaData.selector == 'j-editable-box' &&
            componentMetaData.ref instanceof ComponentRef &&
            componentMetaData.ref.instance.data) {
            innerHtml = componentMetaData.ref.instance.data.toHtml();
        } else {
            innerHtml += `<${componentMetaData.selector} `;
            if (componentMetaData.inputs instanceof Array) {
                componentMetaData.inputs.forEach(input => {
                    if (CommonUtils.isDefined(input.default) && input.default != '') {
                        innerHtml += `${InternalUtils.camelToKebabCase(input.property)}='${JSON.stringify(input.default)}' `;
                    }
                });
            }
            innerHtml += `>\n ${this._parseTabPanesToHtml(componentMetaData)}
                </${componentMetaData.selector}>\n`;
        }
        return innerHtml;
    }

    private _parseTabPanesToHtml(componentMetaData: ComponentMetaData): string {
        if (componentMetaData.component != JigsawTab || !(componentMetaData.panes instanceof Array) ||
            componentMetaData.panes.length == 0) return '';
        let innerPaneHtml = '';
        componentMetaData.panes.forEach(pane => {
            innerPaneHtml += `<j-pane title="${pane.title}">\n<ng-template>\n`;
            innerPaneHtml += pane.content.reduce((str, content) => {
                str += this._parseMetaDataToHtml(content);
                return str;
            }, '');
            innerPaneHtml += `</ng-template>\n</j-pane>\n`;
        });
        return innerPaneHtml;
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
                node.innerHtml = element.innerHTML;
                node.componentMetaDataList = this._parseChildrenToComponentMetaDataList(element, metaDataList);
            }
        }
        return node;
    }

    public static _parseChildrenToComponentMetaDataList(element: Element, metaDataList: ComponentMetaData[]): ComponentMetaData[] {
        return Array.from(element.children).reduce((arr, elementNode) => {
            arr.push(this._parseElementToComponentMetaData(elementNode, metaDataList));
            return arr;
        }, []);
    }

    private static _parseElementToComponentMetaData(element: Element, metaDataList: ComponentMetaData[]): ComponentMetaData {
        const tagName = element.tagName.toLowerCase();
        const inputs = Array.from(element.attributes).reduce((arr, attr) => {
            arr.push({
                property: InternalUtils.kebabToCamelCase(attr.name),
                default: (attr.value.match(/^[A-Za-z]+$/) && !(attr.value.match(/^(true|false)+$/))) ?
                    attr.value : JSON.parse(attr.value)
            });
            return arr;
        }, []);

        const parseApi = this.parseApiList.find(parseApi => parseApi.tagName == tagName);
        if (parseApi) {
            return parseApi.parseFunction(element, metaDataList, inputs)
        }

        return {
            component: metaDataList.find(metaData => metaData.selector == tagName).component,
            selector: tagName,
            inputs: inputs
        };
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
            node.setInnerHtml(node.componentMetaDataList);
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
