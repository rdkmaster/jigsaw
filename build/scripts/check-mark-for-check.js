const fs = require('fs');
const path = require('path');
const ts = require('typescript');

let hasError = false;
let result = new Map();

processAll('pc-components');
processAll('common/components');
// checkInputProperty('D:\\workspace\\Jigsaw\\jigsaw\\src\\jigsaw\\pc-components\\input\\input.ts');
// checkInputProperty('D:\\workspace\\Jigsaw\\jigsaw\\src\\jigsaw\\pc-components\\checkbox\\checkbox.ts');

if (hasError) {
    process.exit(1);
} else {
    console.error(`Everything's fine!`);
}

function processAll(folder) {
    const cmpHome = path.resolve(`${__dirname}/../../src/jigsaw/${folder}`);
    const cmpFolders = fs.readdirSync(cmpHome);
    cmpFolders.forEach(cmpFolder => {
        const pathname = path.join(cmpHome, cmpFolder);
        const stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            processSourceFiles(pathname);
        }
    });
}

function processSourceFiles(sourceFolder) {
    const files = fs.readdirSync(sourceFolder);
    files.forEach(file => {
        const pathname = path.join(sourceFolder, file);
        const stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            processSourceFiles(pathname)
        } else {
            checkInputProperty(pathname);
        }
    });
}

function checkInputProperty(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }

    console.log(`Checking ${srcPath} ...`);
    const source = fs.readFileSync(srcPath).toString();

    ts.transpileModule(source, {
        compilerOptions: {module: ts.ModuleKind.ESNext},
        transformers: {
            before: [transformer()]
        }
    });
    for (let className in result) {
        const props = result[className].hasMarkProperties;
        if (props && props.length > 0 && !result[className].hasInjector) {
            error(`Error: Properties "${props.join(', ')}" in "${className}" has "@RequireMarkForCheck" (in decorator), but no DI of "Injector"!`,
                'Tips: add DI named "_injector" and typed "Injector" in constructor to pass this check');
        }
    }
}

function transformer() {
    return (context) => {
        const visit = (node) => {
            if (ts.isClassDeclaration(node)) {
                return transformClass(node, context);
            }
            return ts.visitEachChild(node, (child) => visit(child), context);
        };
        return (node) => ts.visitNode(node, visit);
    };
}

// 遍历 类定义 节点
function transformClass(node, context) {
    const identifier = node.getChildren().find(item => ts.isIdentifier(item));
    const className = identifier.getText().trim();
    insert(className, null);
    const visit = (node) => {
        if (ts.isConstructorDeclaration(node)) {
            return transformConstructor(node, context, className);
        }
        if (ts.isPropertyDeclaration(node) || ts.isGetAccessor(node) || ts.isSetAccessor(node)) {
            return transformProperty(node, context, className);
        }
        return ts.visitEachChild(node, (child) => visit(child), context);
    };
    return ts.visitEachChild(node, (child) => visit(child), context);
}

// 遍历 属性、getter/setter 这三种可能是 @Input 的节点
function transformProperty(propertyNode, context, className) {
    const visit = (node) => {
        if (ts.isDecorator(node) && node.getChildAt(1) && node.getChildAt(1).getChildAt(0) &&
            node.getChildAt(1).getChildAt(0).getText().trim() === 'Input') {
            const propertyCode = propertyNode.getText().trim();
            const propertyChildren = propertyNode.getChildren();
            const identifier = propertyChildren.find(item => ts.isIdentifier(item));
            const propertyName = identifier.getText().trim();

            if (!checkAnnotationPosition(propertyCode)) {
                error(`Error: move the annotation of input property "${propertyName}" to the front of the @Input decorator in "${className}".`);
                return ts.visitEachChild(node, (child) => visit(child), context);
            }

            const docNode = propertyChildren.find(item => ts.isJSDoc(item));
            const hasNoMarkRequired = docNode && docNode.getChildren().findIndex(item => item.getText().replace(/[\s|*]/g, '') === '@NoMarkForCheckRequired') > -1;
            let hasRequireMark = false;
            propertyChildren.filter(item => item.kind === ts.SyntaxKind.SyntaxList).forEach(item => {
                if (!hasRequireMark) {
                    hasRequireMark = item.getChildren().filter(item => ts.isDecorator(item)).some(item => item.getText().trim() === '@RequireMarkForCheck()');
                }
            });
            if (!hasNoMarkRequired && !hasRequireMark) {
                error(`Error: input property "${propertyName}" in "${className}" must have one of the "@NoMarkForCheckRequired" (in annotation) or ` +
                    '"@RequireMarkForCheck" (in decorator), but none of these marks found!',
                    'Tips: check this link for more detail https://github.com/rdkmaster/jigsaw/blob/master/docs/mark-for-check-rule.md');
            } else if (hasNoMarkRequired && hasRequireMark) {
                error(`Error: input property "${propertyName}" in "${className}" must have one of the "@NoMarkForCheckRequired" (in annotation) or ` +
                    '"@RequireMarkForCheck" (in decorator), but both of these marks found!',
                    'Tips: remove one of the marks to pass this check');
            }
            if (hasRequireMark) {
                insert(className, propertyName);
            }
        }
        return ts.visitEachChild(node, (child) => visit(child), context);
    };
    return ts.visitEachChild(propertyNode, (child) => visit(child), context);
}

// 遍历构造器，检查是否注入了名称为 _injector 的 Injector
function transformConstructor(constructorNode, context, className) {
    const visit = (node) => {
        if (ts.isParameter(node)) {
            if (!result[className].hasInjector) {
                result[className].hasInjector = node.getChildren()
                    // 注意，这里的_injector必须与decorator/mark-for-check.ts里的保持一致
                    .findIndex(item => ts.isIdentifier(item) && item.getText().trim() === '_injector') > -1;
            }
        }
        return ts.visitEachChild(node, (child) => visit(child), context);
    };
    return ts.visitEachChild(constructorNode, (child) => visit(child), context);
}

/**
 * 约束注释（如果有）必须放在最前面
 */
function checkAnnotationPosition(block) {
    return block.indexOf('/**') === -1 || block.match(/^\s*\/\*\*/);
}

function error(msg, tips) {
    console.error(msg);
    if (tips) {
        console.error(tips);
    }
    hasError = true;
}

function insert(className, hasMarkProperty) {
    if (!result[className]) {
        result[className] = {};
    }
    if (!result[className].hasMarkProperties) {
        result[className].hasMarkProperties = [];
    }
    if (hasMarkProperty) {
        result[className].hasMarkProperties.push(hasMarkProperty);
    }
}

