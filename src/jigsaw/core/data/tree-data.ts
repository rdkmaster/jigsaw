import {GeneralCollection} from "./general-collection";
import {CommonUtils} from "../utils/common-utils";
import {ComponentMetaData} from "../../component/view-editor/view-editor";

export class TreeData extends GeneralCollection<any> {
    [index: string]: any;
    label: string;
    nodes?: TreeData[];

    public fromObject(data: any): TreeData {
        if (!data) {
            return this;
        }
        if (data instanceof Array) {
            data = {nodes: data, label: this.label};
        }

        for (let key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] && key == 'nodes') {
                this.nodes = TreeData.fromArray(data[key]);
            } else {
                this[key] = data[key];
            }
            this.propList.push(key);
        }

        this.refresh();
        return this;
    }

    public static fromArray(nodes: any[]): TreeData[] {
        const result: TreeData[] = [];
        if (!nodes) {
            return result;
        }
        nodes.forEach(node => {
            const td: TreeData = new TreeData();
            td.fromObject(node);
            result.push(td);
        });
        return result;
    }
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
    contents?: ComponentMetaData[];
    contentStr?: string;

    /**
     * 把LayoutData转化为dom字符串
     * @returns {string}
     */
    public toString(): string {
        return this._parseNodeToString(this, '');
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
            json = this._parseElementToJson(layout.children[0], metaDataList);
        }
        return json ? new LayoutData().fromObject(json) : null;
    }

    private static _parseElementToJson(element: Element, metaDataList: ComponentMetaData[]): Object {
        let node = {
            direction: null,
            grow: null,
            nodes: [],
            contents: [],
            contentStr: ''
        };
        node.direction = element.getAttribute('direction');
        node.grow = element.getAttribute('grow');
        if (element.children && element.children.length != 0) {
            if (element.children[0].tagName.toLocaleLowerCase() == 'j-box') {
                for (let i = 0; i < element.children.length; i++) {
                    node.nodes.push(this._parseElementToJson(element.children[i], metaDataList));
                }
            } else {
                node = this._parseElementToContentData(node, element, metaDataList);
            }
        }
        return node;
    }

    private static _parseElementToContentData(node: any, element: Element, metaDataList: ComponentMetaData[]): any {
        node.contentStr = element.innerHTML;
        for (let i = 0; i < element.children.length; i++) {
            const inputs = [];
            for (let j = 0; j < element.children[i].attributes.length; j++) {
                inputs.push({
                    property: element.children[i].attributes[j].name,
                    value: element.children[i].attributes[j].value
                })
            }
            node.contents.push({
                component: metaDataList.find(metaData => metaData.selector ==
                    element.children[i].tagName.toLocaleLowerCase()).component,
                selector: element.children[i].tagName.toLocaleLowerCase(),
                inputs: inputs
            })
        }
        return node;
    }

    private _parseNodesToString(nodes: LayoutData[], domStr: string): string {
        if (nodes instanceof Array) {
            nodes.forEach(node => {
                domStr = this._parseNodeToString(node, domStr);
            })
        }
        return domStr;
    }

    private _parseNodeToString(node: LayoutData, domStr: string): string {
        domStr += `<j-box${CommonUtils.isDefined(node.direction) ? ` direction="${node.direction}"` : ''}${CommonUtils.isDefined(node.grow) ? ` grow="${node.grow}"` : ''}> \n`;
        if (node.nodes instanceof Array && node.nodes.length > 0) {
            domStr = this._parseNodesToString(node.nodes, domStr) + `</j-box> \n`;
        } else {
            domStr += (node.contentStr ? node.contentStr : '') + '</j-box> \n';
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
