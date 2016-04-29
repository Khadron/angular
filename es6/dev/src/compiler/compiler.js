export { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from 'angular2/src/core/platform_directives_and_pipes';
export * from 'angular2/src/compiler/template_ast';
export { TEMPLATE_TRANSFORMS } from 'angular2/src/compiler/template_parser';
export { CompilerConfig, RenderTypes } from './config';
export * from './compile_metadata';
export * from './offline_compiler';
export { RuntimeCompiler } from './runtime_compiler';
export * from 'angular2/src/compiler/url_resolver';
export * from 'angular2/src/compiler/xhr';
export { ViewResolver } from './view_resolver';
export { DirectiveResolver } from './directive_resolver';
export { PipeResolver } from './pipe_resolver';
import { assertionsEnabled, CONST_EXPR } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
import { TemplateParser } from 'angular2/src/compiler/template_parser';
import { HtmlParser } from 'angular2/src/compiler/html_parser';
import { DirectiveNormalizer } from 'angular2/src/compiler/directive_normalizer';
import { CompileMetadataResolver } from 'angular2/src/compiler/metadata_resolver';
import { StyleCompiler } from 'angular2/src/compiler/style_compiler';
import { ViewCompiler } from 'angular2/src/compiler/view_compiler/view_compiler';
import { CompilerConfig } from './config';
import { ComponentResolver } from 'angular2/src/core/linker/component_resolver';
import { RuntimeCompiler } from 'angular2/src/compiler/runtime_compiler';
import { ElementSchemaRegistry } from 'angular2/src/compiler/schema/element_schema_registry';
import { DomElementSchemaRegistry } from 'angular2/src/compiler/schema/dom_element_schema_registry';
import { UrlResolver, DEFAULT_PACKAGE_URL_PROVIDER } from 'angular2/src/compiler/url_resolver';
import { Parser } from './expression_parser/parser';
import { Lexer } from './expression_parser/lexer';
import { ViewResolver } from './view_resolver';
import { DirectiveResolver } from './directive_resolver';
import { PipeResolver } from './pipe_resolver';
function _createCompilerConfig() {
    return new CompilerConfig(assertionsEnabled(), false, true);
}
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
export const COMPILER_PROVIDERS = CONST_EXPR([
    Lexer,
    Parser,
    HtmlParser,
    TemplateParser,
    DirectiveNormalizer,
    CompileMetadataResolver,
    DEFAULT_PACKAGE_URL_PROVIDER,
    StyleCompiler,
    ViewCompiler,
    new Provider(CompilerConfig, { useFactory: _createCompilerConfig, deps: [] }),
    RuntimeCompiler,
    new Provider(ComponentResolver, { useExisting: RuntimeCompiler }),
    DomElementSchemaRegistry,
    new Provider(ElementSchemaRegistry, { useExisting: DomElementSchemaRegistry }),
    UrlResolver,
    ViewResolver,
    DirectiveResolver,
    PipeResolver
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUsycDZUQ0hDLnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUSxtQkFBbUIsRUFBRSxjQUFjLFFBQU8saURBQWlELENBQUM7QUFDcEcsY0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCxTQUFRLG1CQUFtQixRQUFPLHVDQUF1QyxDQUFDO0FBQzFFLFNBQVEsY0FBYyxFQUFFLFdBQVcsUUFBTyxVQUFVLENBQUM7QUFDckQsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLFNBQVEsZUFBZSxRQUFPLG9CQUFvQixDQUFDO0FBQ25ELGNBQWMsb0NBQW9DLENBQUM7QUFDbkQsY0FBYywyQkFBMkIsQ0FBQztBQUUxQyxTQUFRLFlBQVksUUFBTyxpQkFBaUIsQ0FBQztBQUM3QyxTQUFRLGlCQUFpQixRQUFPLHNCQUFzQixDQUFDO0FBQ3ZELFNBQVEsWUFBWSxRQUFPLGlCQUFpQixDQUFDO09BRXRDLEVBQUMsaUJBQWlCLEVBQVEsVUFBVSxFQUFDLE1BQU0sMEJBQTBCO09BQ3JFLEVBQVUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCO09BQy9DLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUNBQXVDO09BQzdELEVBQUMsVUFBVSxFQUFDLE1BQU0sbUNBQW1DO09BQ3JELEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0Q0FBNEM7T0FDdkUsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHlDQUF5QztPQUN4RSxFQUFDLGFBQWEsRUFBQyxNQUFNLHNDQUFzQztPQUMzRCxFQUFDLFlBQVksRUFBQyxNQUFNLG1EQUFtRDtPQUN2RSxFQUFDLGNBQWMsRUFBQyxNQUFNLFVBQVU7T0FDaEMsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZDQUE2QztPQUN0RSxFQUFDLGVBQWUsRUFBQyxNQUFNLHdDQUF3QztPQUMvRCxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0RBQXNEO09BQ25GLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwwREFBMEQ7T0FDMUYsRUFBQyxXQUFXLEVBQUUsNEJBQTRCLEVBQUMsTUFBTSxvQ0FBb0M7T0FDckYsRUFBQyxNQUFNLEVBQUMsTUFBTSw0QkFBNEI7T0FDMUMsRUFBQyxLQUFLLEVBQUMsTUFBTSwyQkFBMkI7T0FDeEMsRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUI7T0FDckMsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQjtPQUMvQyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQjtBQUU1QztJQUNFLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsT0FBTyxNQUFNLGtCQUFrQixHQUFtQyxVQUFVLENBQUM7SUFDM0UsS0FBSztJQUNMLE1BQU07SUFDTixVQUFVO0lBQ1YsY0FBYztJQUNkLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGFBQWE7SUFDYixZQUFZO0lBQ1osSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUMsVUFBVSxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUMzRSxlQUFlO0lBQ2YsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7SUFDL0Qsd0JBQXdCO0lBQ3hCLElBQUksUUFBUSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsV0FBVyxFQUFFLHdCQUF3QixFQUFDLENBQUM7SUFDNUUsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsWUFBWTtDQUNiLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7UExBVEZPUk1fRElSRUNUSVZFUywgUExBVEZPUk1fUElQRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2RpcmVjdGl2ZXNfYW5kX3BpcGVzJztcbmV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9hc3QnO1xuZXhwb3J0IHtURU1QTEFURV9UUkFOU0ZPUk1TfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfcGFyc2VyJztcbmV4cG9ydCB7Q29tcGlsZXJDb25maWcsIFJlbmRlclR5cGVzfSBmcm9tICcuL2NvbmZpZyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuZXhwb3J0ICogZnJvbSAnLi9vZmZsaW5lX2NvbXBpbGVyJztcbmV4cG9ydCB7UnVudGltZUNvbXBpbGVyfSBmcm9tICcuL3J1bnRpbWVfY29tcGlsZXInO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3VybF9yZXNvbHZlcic7XG5leHBvcnQgKiBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcblxuZXhwb3J0IHtWaWV3UmVzb2x2ZXJ9IGZyb20gJy4vdmlld19yZXNvbHZlcic7XG5leHBvcnQge0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICcuL2RpcmVjdGl2ZV9yZXNvbHZlcic7XG5leHBvcnQge1BpcGVSZXNvbHZlcn0gZnJvbSAnLi9waXBlX3Jlc29sdmVyJztcblxuaW1wb3J0IHthc3NlcnRpb25zRW5hYmxlZCwgVHlwZSwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VGVtcGxhdGVQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9wYXJzZXInO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtEaXJlY3RpdmVOb3JtYWxpemVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvZGlyZWN0aXZlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtDb21waWxlTWV0YWRhdGFSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL21ldGFkYXRhX3Jlc29sdmVyJztcbmltcG9ydCB7U3R5bGVDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3N0eWxlX2NvbXBpbGVyJztcbmltcG9ydCB7Vmlld0NvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci92aWV3X2NvbXBpbGVyJztcbmltcG9ydCB7Q29tcGlsZXJDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Q29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfcmVzb2x2ZXInO1xuaW1wb3J0IHtSdW50aW1lQ29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9ydW50aW1lX2NvbXBpbGVyJztcbmltcG9ydCB7RWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2NoZW1hL2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmltcG9ydCB7RG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2NoZW1hL2RvbV9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeSc7XG5pbXBvcnQge1VybFJlc29sdmVyLCBERUZBVUxUX1BBQ0tBR0VfVVJMX1BST1ZJREVSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdXJsX3Jlc29sdmVyJztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL3BhcnNlcic7XG5pbXBvcnQge0xleGVyfSBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL2xleGVyJztcbmltcG9ydCB7Vmlld1Jlc29sdmVyfSBmcm9tICcuL3ZpZXdfcmVzb2x2ZXInO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnLi9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuaW1wb3J0IHtQaXBlUmVzb2x2ZXJ9IGZyb20gJy4vcGlwZV9yZXNvbHZlcic7XG5cbmZ1bmN0aW9uIF9jcmVhdGVDb21waWxlckNvbmZpZygpIHtcbiAgcmV0dXJuIG5ldyBDb21waWxlckNvbmZpZyhhc3NlcnRpb25zRW5hYmxlZCgpLCBmYWxzZSwgdHJ1ZSk7XG59XG5cbi8qKlxuICogQSBzZXQgb2YgcHJvdmlkZXJzIHRoYXQgcHJvdmlkZSBgUnVudGltZUNvbXBpbGVyYCBhbmQgaXRzIGRlcGVuZGVuY2llcyB0byB1c2UgZm9yXG4gKiB0ZW1wbGF0ZSBjb21waWxhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX1BST1ZJREVSUzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gQ09OU1RfRVhQUihbXG4gIExleGVyLFxuICBQYXJzZXIsXG4gIEh0bWxQYXJzZXIsXG4gIFRlbXBsYXRlUGFyc2VyLFxuICBEaXJlY3RpdmVOb3JtYWxpemVyLFxuICBDb21waWxlTWV0YWRhdGFSZXNvbHZlcixcbiAgREVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUixcbiAgU3R5bGVDb21waWxlcixcbiAgVmlld0NvbXBpbGVyLFxuICBuZXcgUHJvdmlkZXIoQ29tcGlsZXJDb25maWcsIHt1c2VGYWN0b3J5OiBfY3JlYXRlQ29tcGlsZXJDb25maWcsIGRlcHM6IFtdfSksXG4gIFJ1bnRpbWVDb21waWxlcixcbiAgbmV3IFByb3ZpZGVyKENvbXBvbmVudFJlc29sdmVyLCB7dXNlRXhpc3Rpbmc6IFJ1bnRpbWVDb21waWxlcn0pLFxuICBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnksXG4gIG5ldyBQcm92aWRlcihFbGVtZW50U2NoZW1hUmVnaXN0cnksIHt1c2VFeGlzdGluZzogRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSksXG4gIFVybFJlc29sdmVyLFxuICBWaWV3UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZVJlc29sdmVyLFxuICBQaXBlUmVzb2x2ZXJcbl0pO1xuIl19