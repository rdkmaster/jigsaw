import {ColumnDefine, TableCellSetting, TableHeadSetting} from "./table-typings";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {CommonUtils} from "../../core/utils/common-utils";

export class TableUtils {
    public static updateHeaderSettings(columnDefine: ColumnDefine, settings: TableHeadSetting): TableHeadSetting {
        if (!settings) {
            settings = {
                cellData: null, width: null, visible: true, renderer: null, clazz: '', field: '',
                sortable: false, sortAs: SortAs.string, defaultSortOrder: SortOrder.default
            };
        }
        settings.width = columnDefine.width;
        settings.field = <string>columnDefine.target;
        let headerDef = columnDefine.header;
        if (headerDef) {
            settings.cellData = CommonUtils.isDefined(headerDef.text) ? headerDef.text : settings.cellData;
            settings.renderer = headerDef.renderer;
            settings.clazz = headerDef.clazz;
            settings.sortable = headerDef.sortable;
            settings.sortAs = CommonUtils.isDefined(headerDef.sortAs) ? headerDef.sortAs : settings.sortAs;
            settings.defaultSortOrder = CommonUtils.isDefined(headerDef.sortAs) ?
                headerDef.defaultSortOrder : settings.defaultSortOrder;
        }
        return settings;
    }

    public static updateCellSettings(columnDefine: ColumnDefine, settings: TableCellSetting): TableCellSetting {
        if (!settings) {
            settings = {
                cellData: '', width: null, visible: true, renderer: null, clazz: '', rowSpan: 1,
                editable: false, editorRenderer: null, group: null, field: null, tooltip: null
            }
        }
        settings.width = columnDefine.width;
        settings.group = columnDefine.group;
        settings.field = <string>columnDefine.target;
        let cellDef = columnDefine.cell;
        if (cellDef) {
            settings.renderer = cellDef.renderer;
            settings.clazz = cellDef.clazz;
            settings.editable = cellDef.editable;
            settings.editorRenderer = cellDef.editorRenderer;
            settings.tooltip = cellDef.tooltip;
        }
        return settings;
    }

    public static getGenerator(columnDefine: ColumnDefine, property: string): Function {
        return columnDefine.cell && columnDefine.cell[property] instanceof Function ? columnDefine.cell[property] : null;
    }
}
