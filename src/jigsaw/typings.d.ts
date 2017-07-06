declare var module: NodeModule;
interface NodeModule {
    id: string;
}
declare let $: any;
declare let moment: any;

/** Extends the interface for jasmine matchers to allow for custom matchers. */
declare namespace jasmine {
  interface Matchers {
    toBeRole(expectedRole: string): boolean;
    toMatchTableContent(expectedContent: any[]): boolean;
  }
}
