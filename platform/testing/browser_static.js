'use strict';"use strict";
var core_1 = require('angular2/core');
var compiler_1 = require('angular2/compiler');
var browser_common_1 = require('angular2/src/platform/browser_common');
var browser_adapter_1 = require('angular2/src/platform/browser/browser_adapter');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var animation_builder_mock_1 = require('angular2/src/mock/animation_builder_mock');
var directive_resolver_mock_1 = require('angular2/src/mock/directive_resolver_mock');
var view_resolver_mock_1 = require('angular2/src/mock/view_resolver_mock');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var common_1 = require('angular2/platform/common');
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
var xhr_impl_1 = require("angular2/src/platform/browser/xhr_impl");
var compiler_2 = require('angular2/compiler');
var test_component_builder_1 = require('angular2/src/testing/test_component_builder');
var utils_1 = require('angular2/src/testing/utils');
var common_dom_1 = require('angular2/platform/common_dom');
var lang_1 = require('angular2/src/facade/lang');
var utils_2 = require('angular2/src/testing/utils');
function initBrowserTests() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    utils_1.BrowserDetection.setup();
}
function createNgZone() {
    return lang_1.IS_DART ? new ng_zone_mock_1.MockNgZone() : new core_1.NgZone({ enableLongStackTrace: true });
}
/**
 * Default platform providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
    core_1.PLATFORM_COMMON_PROVIDERS,
    new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initBrowserTests, multi: true })
]);
exports.ADDITIONAL_TEST_BROWSER_PROVIDERS = lang_1.CONST_EXPR([
    new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
    common_dom_1.ELEMENT_PROBE_PROVIDERS,
    new core_1.Provider(compiler_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
    new core_1.Provider(compiler_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
    utils_2.Log,
    test_component_builder_1.TestComponentBuilder,
    new core_1.Provider(core_1.NgZone, { useFactory: createNgZone }),
    new core_1.Provider(common_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
    new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
]);
/**
 * Default application providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
    browser_common_1.BROWSER_APP_COMMON_PROVIDERS,
    new core_1.Provider(compiler_2.XHR, { useClass: xhr_impl_1.XHRImpl }),
    exports.ADDITIONAL_TEST_BROWSER_PROVIDERS
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9zdGF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVdDdDlvZG1tLnRtcC9hbmd1bGFyMi9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXJfc3RhdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFNTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix5QkFBOEMsbUJBQW1CLENBQUMsQ0FBQTtBQUNsRSwrQkFBMkMsc0NBQXNDLENBQUMsQ0FBQTtBQUNsRixnQ0FBZ0MsK0NBQStDLENBQUMsQ0FBQTtBQUVoRixrQ0FBK0Isd0NBQXdDLENBQUMsQ0FBQTtBQUN4RSx1Q0FBbUMsMENBQTBDLENBQUMsQ0FBQTtBQUM5RSx3Q0FBb0MsMkNBQTJDLENBQUMsQ0FBQTtBQUNoRixtQ0FBK0Isc0NBQXNDLENBQUMsQ0FBQTtBQUN0RSx1Q0FBbUMsMENBQTBDLENBQUMsQ0FBQTtBQUM5RSx1QkFBK0IsMEJBQTBCLENBQUMsQ0FBQTtBQUMxRCw2QkFBeUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUUxRCx5QkFBc0Isd0NBQXdDLENBQUMsQ0FBQTtBQUMvRCx5QkFBa0IsbUJBQW1CLENBQUMsQ0FBQTtBQUV0Qyx1Q0FJTyw2Q0FBNkMsQ0FBQyxDQUFBO0FBRXJELHNCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBRTVELDJCQUFzQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRXJFLHFCQUFrQywwQkFBMEIsQ0FBQyxDQUFBO0FBRTdELHNCQUFrQiw0QkFBNEIsQ0FBQyxDQUFBO0FBRS9DO0lBQ0UsbUNBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMsd0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQUVEO0lBQ0UsTUFBTSxDQUFDLGNBQU8sR0FBRyxJQUFJLHlCQUFVLEVBQUUsR0FBRyxJQUFJLGFBQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVEOztHQUVHO0FBQ1UsOENBQXNDLEdBQy9DLGlCQUFVLENBQUM7SUFDVCxnQ0FBeUI7SUFDekIsSUFBSSxlQUFRLENBQUMsMkJBQW9CLEVBQUUsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO0NBQzlFLENBQUMsQ0FBQztBQUVNLHlDQUFpQyxHQUMxQyxpQkFBVSxDQUFDO0lBQ1QsSUFBSSxlQUFRLENBQUMsYUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQ3JDLG9DQUF1QjtJQUN2QixJQUFJLGVBQVEsQ0FBQyw0QkFBaUIsRUFBRSxFQUFDLFFBQVEsRUFBRSwrQ0FBcUIsRUFBQyxDQUFDO0lBQ2xFLElBQUksZUFBUSxDQUFDLHVCQUFZLEVBQUUsRUFBQyxRQUFRLEVBQUUscUNBQWdCLEVBQUMsQ0FBQztJQUN4RCxXQUFHO0lBQ0gsNkNBQW9CO0lBQ3BCLElBQUksZUFBUSxDQUFDLGFBQU0sRUFBRSxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsQ0FBQztJQUNoRCxJQUFJLGVBQVEsQ0FBQyx5QkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBb0IsRUFBQyxDQUFDO0lBQ2hFLElBQUksZUFBUSxDQUFDLG9DQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZDQUFvQixFQUFDLENBQUM7Q0FDakUsQ0FBQyxDQUFDO0FBRVA7O0dBRUc7QUFDVSxpREFBeUMsR0FDbEQsaUJBQVUsQ0FBQztJQUNULDZDQUE0QjtJQUM1QixJQUFJLGVBQVEsQ0FBQyxjQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsa0JBQU8sRUFBQyxDQUFDO0lBQ3RDLHlDQUFpQztDQUNsQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBUFBfSUQsXG4gIE5nWm9uZSxcbiAgUHJvdmlkZXIsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0lOSVRJQUxJWkVSXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlciwgVmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5pbXBvcnQge0JST1dTRVJfQVBQX0NPTU1PTl9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbic7XG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuXG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7TW9ja0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2FuaW1hdGlvbl9idWlsZGVyX21vY2snO1xuaW1wb3J0IHtNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2RpcmVjdGl2ZV9yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja1ZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svdmlld19yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL21vY2tfbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb24nO1xuaW1wb3J0IHtNb2NrTmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9uZ196b25lX21vY2snO1xuXG5pbXBvcnQge1hIUkltcGx9IGZyb20gXCJhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci94aHJfaW1wbFwiO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcblxuaW1wb3J0IHtcbiAgVGVzdENvbXBvbmVudEJ1aWxkZXIsXG4gIENvbXBvbmVudEZpeHR1cmVBdXRvRGV0ZWN0LFxuICBDb21wb25lbnRGaXh0dXJlTm9OZ1pvbmVcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdGVzdF9jb21wb25lbnRfYnVpbGRlcic7XG5cbmltcG9ydCB7QnJvd3NlckRldGVjdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdXRpbHMnO1xuXG5pbXBvcnQge0VMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb25fZG9tJztcblxuaW1wb3J0IHtDT05TVF9FWFBSLCBJU19EQVJUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge0xvZ30gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdXRpbHMnO1xuXG5mdW5jdGlvbiBpbml0QnJvd3NlclRlc3RzKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICBCcm93c2VyRGV0ZWN0aW9uLnNldHVwKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5nWm9uZSgpOiBOZ1pvbmUge1xuICByZXR1cm4gSVNfREFSVCA/IG5ldyBNb2NrTmdab25lKCkgOiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogdHJ1ZX0pO1xufVxuXG4vKipcbiAqIERlZmF1bHQgcGxhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nIHdpdGhvdXQgYSBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfQlJPV1NFUl9TVEFUSUNfUExBVEZPUk1fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbXG4gICAgICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IGluaXRCcm93c2VyVGVzdHMsIG11bHRpOiB0cnVlfSlcbiAgICBdKTtcblxuZXhwb3J0IGNvbnN0IEFERElUSU9OQUxfVEVTVF9CUk9XU0VSX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgbmV3IFByb3ZpZGVyKEFQUF9JRCwge3VzZVZhbHVlOiAnYSd9KSxcbiAgICAgIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKERpcmVjdGl2ZVJlc29sdmVyLCB7dXNlQ2xhc3M6IE1vY2tEaXJlY3RpdmVSZXNvbHZlcn0pLFxuICAgICAgbmV3IFByb3ZpZGVyKFZpZXdSZXNvbHZlciwge3VzZUNsYXNzOiBNb2NrVmlld1Jlc29sdmVyfSksXG4gICAgICBMb2csXG4gICAgICBUZXN0Q29tcG9uZW50QnVpbGRlcixcbiAgICAgIG5ldyBQcm92aWRlcihOZ1pvbmUsIHt1c2VGYWN0b3J5OiBjcmVhdGVOZ1pvbmV9KSxcbiAgICAgIG5ldyBQcm92aWRlcihMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IE1vY2tMb2NhdGlvblN0cmF0ZWd5fSksXG4gICAgICBuZXcgUHJvdmlkZXIoQW5pbWF0aW9uQnVpbGRlciwge3VzZUNsYXNzOiBNb2NrQW5pbWF0aW9uQnVpbGRlcn0pLFxuICAgIF0pO1xuXG4vKipcbiAqIERlZmF1bHQgYXBwbGljYXRpb24gcHJvdmlkZXJzIGZvciB0ZXN0aW5nIHdpdGhvdXQgYSBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfQlJPV1NFUl9TVEFUSUNfQVBQTElDQVRJT05fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbXG4gICAgICBCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKFhIUiwge3VzZUNsYXNzOiBYSFJJbXBsfSksXG4gICAgICBBRERJVElPTkFMX1RFU1RfQlJPV1NFUl9QUk9WSURFUlNcbiAgICBdKTtcbiJdfQ==