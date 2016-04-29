import { CompileIdentifierMetadata, CompileTokenMetadata } from './compile_metadata';
export declare class Identifiers {
    static ViewUtils: CompileIdentifierMetadata;
    static AppView: CompileIdentifierMetadata;
    static DebugAppView: CompileIdentifierMetadata;
    static AppElement: CompileIdentifierMetadata;
    static ElementRef: CompileIdentifierMetadata;
    static ViewContainerRef: CompileIdentifierMetadata;
    static ChangeDetectorRef: CompileIdentifierMetadata;
    static RenderComponentType: CompileIdentifierMetadata;
    static QueryList: CompileIdentifierMetadata;
    static TemplateRef: CompileIdentifierMetadata;
    static TemplateRef_: CompileIdentifierMetadata;
    static ValueUnwrapper: CompileIdentifierMetadata;
    static Injector: CompileIdentifierMetadata;
    static ViewEncapsulation: CompileIdentifierMetadata;
    static ViewType: CompileIdentifierMetadata;
    static ChangeDetectionStrategy: CompileIdentifierMetadata;
    static StaticNodeDebugInfo: CompileIdentifierMetadata;
    static DebugContext: CompileIdentifierMetadata;
    static Renderer: CompileIdentifierMetadata;
    static SimpleChange: CompileIdentifierMetadata;
    static uninitialized: CompileIdentifierMetadata;
    static ChangeDetectorState: CompileIdentifierMetadata;
    static checkBinding: CompileIdentifierMetadata;
    static flattenNestedViewRenderNodes: CompileIdentifierMetadata;
    static devModeEqual: CompileIdentifierMetadata;
    static interpolate: CompileIdentifierMetadata;
    static castByValue: CompileIdentifierMetadata;
    static pureProxies: CompileIdentifierMetadata[];
}
export declare function identifierToken(identifier: CompileIdentifierMetadata): CompileTokenMetadata;
