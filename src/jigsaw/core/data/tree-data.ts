import {GeneralCollection} from "./general-collection";
import {CommonUtils} from "../utils/common-utils";
import {LayoutContent} from "../../component/layout/layout";

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
    contents?: LayoutContent[];
    contentStr?: string;

    public static toData(domStr: string): LayoutData {
        let layout = document.createElement('div');
        layout.innerHTML = domStr;
        let json;
        if (layout.children) {
            json = this._parseElementToJson(layout.children[0]);
        }
        return json ? new LayoutData().fromObject(json) : null;
    }

    private static _parseElementToJson(element: Element): Object {
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
                    node.nodes.push(this._parseElementToJson(element.children[i]));
                }
            } else {
                node.contentStr = element.innerHTML;
                for (let i = 0; i < element.children.length; i++) {
                    const inputs = [];
                    console.log(element.children[i].attributes);
                    for (let j = 0; j < element.children[i].attributes.length; j++) {
                        inputs.push({
                            property: element.children[i].attributes[j].name,
                            value: element.children[i].attributes[j].value
                        })
                    }
                    node.contents.push({
                        component: null,
                        selector: element.children[i].tagName.toLocaleLowerCase(),
                        inputs: inputs
                    })
                }
            }

        }
        return node;
    }

    public toString(): string {
        return this._parseNodeToString(this, '');
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
