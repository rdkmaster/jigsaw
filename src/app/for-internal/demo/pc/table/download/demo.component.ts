import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { AdditionalColumnDefine, JigsawTable, LocalPageableTableData, PageableTableData, TableCellCheckboxRenderer, TableData, TableHeadCheckboxRenderer } from "jigsaw/public_api";

function generateAllAsciiCharactersString() {
    let result = "";
    for (let i = 1; i <= 255; i++) {
        result += String.fromCharCode(i);
    }
    return result;
}

@Component({
    templateUrl: './demo.component.html'
})
export class TableDownloadDemoComponent {
    public tableData: TableData;
    public localPageableData: LocalPageableTableData;
    public pageableData: PageableTableData;
    public additionalColumnDefinesData: TableData;

    @ViewChild('tableDataCmp')
    public tableDataCmp: JigsawTable;
    @ViewChild('localPageableDataCmp')
    public localPageableDataCmp: JigsawTable;
    @ViewChild('pageableDataCmp')
    public pageableDataCmp: JigsawTable;
    @ViewChild('additionalColumnDefinesCmp')
    public additionalColumnDefinesCmp: JigsawTable;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.localPageableData = new LocalPageableTableData();
        this.localPageableData.http = http;
        this.localPageableData.pagingInfo.pageSize = 10;
        this.localPageableData.fromAjax('mock-data/hr-list-full');

        this.pageableData = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageableData.pagingInfo.pageSize = 10;

        this.additionalColumnDefinesData = new TableData(
            [
                [
                    "包含所有普通和特殊asc字符的情况",
                    generateAllAsciiCharactersString(),
                    542
                ],
                [
                    "测试带\"双引号\"的文本",
                    "测试带\'单引号\'的文本",
                    542
                ],
                [
                    "测试带'单引号'的文本",
                    "测试中文逗号，的文本",
                    "测试英文逗号,的文本"
                ],
                [
                    "测试换行（Linux风格）：第一行\n第二行",
                    "测试换行（windows风格）：第一行\r\n第二行",
                    "$320,8000",
                ],
                [
                    "测试带#的文本",
                    "测试带#的文本",
                    100,
                ],
                [
                    "\"测试带双引号的文本\"",
                    '"测试带双引号的文本"',
                    "'测试带单引号的文本'",
                ],
                [
                    "\"测试带\"双引号的文本",
                    "测试带双引号\"的文本\"",
                    100,
                ],
                [
                    "'测试带'单引号的文本",
                    "测试带单引号'的文本'",
                    100,
                ]
            ],
            ["name", "position", "salary"],
            ["姓名", "职位", "薪资",]);
    }

    public download(type: string) {
        if (type == 'tableData') {
            console.log(this.tableData);
            this.tableDataCmp.download('my_data.csv');
            return;
        }
        if (type == 'localPageableData') {
            console.log(this.localPageableData);
            this.localPageableDataCmp.download('my_data.csv');
            return;
        }
        if (type == 'pageableData') {
            console.log(this.pageableData);
            this.pageableDataCmp.download('my_data.csv');
            return;
        }
        if (type == 'additionalColumnDefines') {
            console.log(this.additionalColumnDefines);
            this.additionalColumnDefinesCmp.download('my_data.csv');
            return;
        }
        if (type == 'xlsm') {
            // 创建一个包含示例数据的XLSM文件内容（这是一个简化的示例，实际文件格式更复杂）
            const xlsmContent = `
                <?xml version="1.0"?>
                <?mso-application progid="Excel.Sheet"?>
                <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                xmlns:html="http://www.w3.org/TR/REC-html40">
                <Styles>
                <Style ss:ID="s1">
                <Font ss:Bold="1"/>
                </Style>
                </Styles>
                <Worksheet ss:Name="Sheet1">
                <Table>
                <Row>
                    <Cell ss:StyleID="s1"><Data ss:Type="String">Name</Data></Cell>
                    <Cell ss:StyleID="s1"><Data ss:Type="String">Age</Data></Cell>
                    <Cell ss:StyleID="s1"><Data ss:Type="String">Country</Data></Cell>
                </Row>
                <Row>
                    <Cell><Data ss:Type="String">John Doe</Data></Cell>
                    <Cell><Data ss:Type="Number">30</Data></Cell>
                    <Cell><Data ss:Type="String">USA</Data></Cell>
                </Row>
                <Row>
                    <Cell><Data ss:Type="String">Jane Smith</Data></Cell>
                    <Cell><Data ss:Type="Number">25</Data></Cell>
                    <Cell><Data ss:Type="String">Canada</Data></Cell>
                </Row>
                <Row>
                    <Cell><Data ss:Type="String">Bob Johnson</Data></Cell>
                    <Cell><Data ss:Type="Number">35</Data></Cell>
                    <Cell><Data ss:Type="String">UK</Data></Cell>
                </Row>
                </Table>
                </Worksheet>
                </Workbook>
            `;

            // 将XLSM文件内容编码为Base64
            const base64Content = btoa(xlsmContent);
            // 创建数据URI
            const dataUri = "data:application/vnd.ms-excel.sheet.macroEnabled.12;base64," + base64Content;

            // 创建一个链接元素来触发下载
            const a = document.createElement("a");
            a.href = dataUri;
            a.download = "example.xlsm"; // 设置下载文件的文件名

            // 模拟点击链接以触发下载
            a.click();
        }
    }

    public additionalColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadCheckboxRenderer
            },
            cell: {
                renderer: TableCellCheckboxRenderer
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
