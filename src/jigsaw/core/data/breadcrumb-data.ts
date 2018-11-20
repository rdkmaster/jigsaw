import {GeneralCollection} from "./general-collection";

export type BreadcrumbGenerator = (routeNode: string) => string;

/**
 * 用于处理树状关系的数据，目前只实现了最基础的功能，后续会增加子级数据懒加载等功能。
 *
 * 层次关系数据是Jigsaw数据体系中的一个分支，关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class BreadcrumbData extends GeneralCollection<any> {
    [index: string]: any;

    /**
     * 单节点在面包屑中的显示文本
     */
    label?: string | BreadcrumbGenerator;

    /**
     * 字体的class，支持font-awesome，icon-font
     */
    icon?: string | BreadcrumbGenerator;

    /**
     * 单个路由节点
     */
    route: string;

    /**
     * 是否显示节点，填写false的时候表示不显示，其他情况表示显示
     */
    visible?: boolean;

    /**
     * 节点链接，一般不填的会自动生成
     */
    routeLink?: string;

    /**
     * 子级节点，`BreadcrumbData`是一个递归的结构。
     */
    nodes?: BreadcrumbData[];

    public fromObject(data: any): BreadcrumbData {
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
                this.nodes = BreadcrumbData.fromArray(data[key]);
            } else {
                this[key] = data[key];
            }
            this.propList.push(key);
        }

        this.refresh();
        return this;
    }

    public static fromArray(nodes: any[]): BreadcrumbData[] {
        const result: BreadcrumbData[] = [];
        if (!nodes) {
            return result;
        }
        nodes.forEach(node => {
            const td: BreadcrumbData = new BreadcrumbData();
            td.fromObject(node);
            result.push(td);
        });
        return result;
    }
}

