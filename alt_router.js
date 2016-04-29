'use strict';/**
 * @module
 * @description
 * Alternative implementation of the router. Experimental.
 */
"use strict";
var router_1 = require('./src/alt_router/router');
exports.Router = router_1.Router;
exports.RouterOutletMap = router_1.RouterOutletMap;
var segments_1 = require('./src/alt_router/segments');
exports.RouteSegment = segments_1.RouteSegment;
exports.UrlSegment = segments_1.UrlSegment;
exports.Tree = segments_1.Tree;
var decorators_1 = require('./src/alt_router/metadata/decorators');
exports.Routes = decorators_1.Routes;
var metadata_1 = require('./src/alt_router/metadata/metadata');
exports.Route = metadata_1.Route;
var router_url_serializer_1 = require('./src/alt_router/router_url_serializer');
exports.RouterUrlSerializer = router_url_serializer_1.RouterUrlSerializer;
exports.DefaultRouterUrlSerializer = router_url_serializer_1.DefaultRouterUrlSerializer;
var router_providers_1 = require('./src/alt_router/router_providers');
exports.ROUTER_PROVIDERS = router_providers_1.ROUTER_PROVIDERS;
var router_outlet_1 = require('./src/alt_router/directives/router_outlet');
var router_link_1 = require('./src/alt_router/directives/router_link');
var lang_1 = require('./src/facade/lang');
exports.ROUTER_DIRECTIVES = lang_1.CONST_EXPR([router_outlet_1.RouterOutlet, router_link_1.RouterLink]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0X3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVzVWZ0tuQkYudG1wL2FuZ3VsYXIyL2FsdF9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCx1QkFBc0MseUJBQXlCLENBQUM7QUFBeEQsaUNBQU07QUFBRSxtREFBZ0Q7QUFDaEUseUJBQTZDLDJCQUEyQixDQUFDO0FBQWpFLCtDQUFZO0FBQUUsMkNBQVU7QUFBRSwrQkFBdUM7QUFDekUsMkJBQXFCLHNDQUFzQyxDQUFDO0FBQXBELHFDQUFvRDtBQUM1RCx5QkFBb0Isb0NBQW9DLENBQUM7QUFBakQsaUNBQWlEO0FBQ3pELHNDQUdPLHdDQUF3QyxDQUFDO0FBRjlDLDBFQUFtQjtBQUNuQix3RkFDOEM7QUFFaEQsaUNBQStCLG1DQUFtQyxDQUFDO0FBQTNELCtEQUEyRDtBQUVuRSw4QkFBMkIsMkNBQTJDLENBQUMsQ0FBQTtBQUN2RSw0QkFBeUIseUNBQXlDLENBQUMsQ0FBQTtBQUNuRSxxQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQUVoQyx5QkFBaUIsR0FBVSxpQkFBVSxDQUFDLENBQUMsNEJBQVksRUFBRSx3QkFBVSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBBbHRlcm5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgcm91dGVyLiBFeHBlcmltZW50YWwuXG4gKi9cblxuZXhwb3J0IHtSb3V0ZXIsIFJvdXRlck91dGxldE1hcH0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9yb3V0ZXInO1xuZXhwb3J0IHtSb3V0ZVNlZ21lbnQsIFVybFNlZ21lbnQsIFRyZWV9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvc2VnbWVudHMnO1xuZXhwb3J0IHtSb3V0ZXN9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvbWV0YWRhdGEvZGVjb3JhdG9ycyc7XG5leHBvcnQge1JvdXRlfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL21ldGFkYXRhL21ldGFkYXRhJztcbmV4cG9ydCB7XG4gIFJvdXRlclVybFNlcmlhbGl6ZXIsXG4gIERlZmF1bHRSb3V0ZXJVcmxTZXJpYWxpemVyXG59IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvcm91dGVyX3VybF9zZXJpYWxpemVyJztcbmV4cG9ydCB7T25BY3RpdmF0ZX0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9pbnRlcmZhY2VzJztcbmV4cG9ydCB7Uk9VVEVSX1BST1ZJREVSU30gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzJztcblxuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7Um91dGVyTGlua30gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9saW5rJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnLi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5leHBvcnQgY29uc3QgUk9VVEVSX0RJUkVDVElWRVM6IGFueVtdID0gQ09OU1RfRVhQUihbUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rXSk7XG4iXX0=