
interface NodeModule {
    id: string;
}

interface NodeRequireFunction {
    (id: string): any;
}
interface NodeRequire extends NodeRequireFunction {
    resolve(id: string): string;
    cache: any;
    extensions: any;
    main: NodeModule | undefined;
}

declare var module: NodeModule;
declare var require: NodeRequire;
declare let $: any;
declare let moment: any;

/** Extends the interface for jasmine matchers to allow for custom matchers. */
declare namespace jasmine {
  interface Matchers {
    toBeRole(expectedRole: string): boolean;
    toMatchTableContent(expectedContent: any[]): boolean;
  }
}
