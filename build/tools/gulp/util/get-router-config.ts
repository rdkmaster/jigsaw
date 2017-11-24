import {readFileSync} from "fs";

export function getRouterConfig(path:string): any[] {
    const src = readFileSync(path).toString();
    const match = src.match(/routerConfig\s*:?.*?=\s*(\[[\s\S]*?\])\s*;/);
    if (!match) {
        console.log('ERROR: can not find routerConfig source, check the following rules:');
        console.log('1. use "routerConfig" as the router config var name.');
        console.log('2. terminate the var definition with ";".');
        return;
    }

    const childRouterSource = match[1].replace(/component\s*:\s*\w+,?/g, '');
    let childRouters: any[];
    try {
        childRouters = eval('(' + childRouterSource + ')');
    } catch (e) {
        console.log('ERROR: unable to compile the router config source: ' + e.message);
        console.log(match[1]);
        return;
    }
    return childRouters;
}
