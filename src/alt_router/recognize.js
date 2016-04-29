'use strict';"use strict";
var segments_1 = require('./segments');
var metadata_1 = require('./metadata/metadata');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var promise_1 = require('angular2/src/facade/promise');
var exceptions_1 = require('angular2/src/facade/exceptions');
var constants_1 = require('./constants');
var reflection_1 = require('angular2/src/core/reflection/reflection');
function recognize(componentResolver, type, url) {
    var matched = new _MatchResult(type, [url.root], null, segments_1.rootNode(url).children, []);
    return _constructSegment(componentResolver, matched)
        .then(function (roots) { return new segments_1.Tree(roots[0]); });
}
exports.recognize = recognize;
function _recognize(componentResolver, parentType, url) {
    var metadata = _readMetadata(parentType); // should read from the factory instead
    if (lang_1.isBlank(metadata)) {
        throw new exceptions_1.BaseException("Component '" + lang_1.stringify(parentType) + "' does not have route configuration");
    }
    var match;
    try {
        match = _match(metadata, url);
    }
    catch (e) {
        return promise_1.PromiseWrapper.reject(e, null);
    }
    var main = _constructSegment(componentResolver, match);
    var aux = _recognizeMany(componentResolver, parentType, match.aux).then(_checkOutletNameUniqueness);
    return promise_1.PromiseWrapper.all([main, aux]).then(collection_1.ListWrapper.flatten);
}
function _recognizeMany(componentResolver, parentType, urls) {
    var recognized = urls.map(function (u) { return _recognize(componentResolver, parentType, u); });
    return promise_1.PromiseWrapper.all(recognized).then(collection_1.ListWrapper.flatten);
}
function _constructSegment(componentResolver, matched) {
    return componentResolver.resolveComponent(matched.component)
        .then(function (factory) {
        var urlOutlet = matched.consumedUrlSegments[0].outlet;
        var segment = new segments_1.RouteSegment(matched.consumedUrlSegments, matched.parameters, lang_1.isBlank(urlOutlet) ? constants_1.DEFAULT_OUTLET_NAME : urlOutlet, matched.component, factory);
        if (matched.leftOverUrl.length > 0) {
            return _recognizeMany(componentResolver, matched.component, matched.leftOverUrl)
                .then(function (children) { return [new segments_1.TreeNode(segment, children)]; });
        }
        else {
            return _recognizeLeftOvers(componentResolver, matched.component)
                .then(function (children) { return [new segments_1.TreeNode(segment, children)]; });
        }
    });
}
function _recognizeLeftOvers(componentResolver, parentType) {
    return componentResolver.resolveComponent(parentType)
        .then(function (factory) {
        var metadata = _readMetadata(parentType);
        if (lang_1.isBlank(metadata)) {
            return [];
        }
        var r = metadata.routes.filter(function (r) { return r.path == "" || r.path == "/"; });
        if (r.length === 0) {
            return promise_1.PromiseWrapper.resolve([]);
        }
        else {
            return _recognizeLeftOvers(componentResolver, r[0].component)
                .then(function (children) {
                return componentResolver.resolveComponent(r[0].component)
                    .then(function (factory) {
                    var segment = new segments_1.RouteSegment([], null, constants_1.DEFAULT_OUTLET_NAME, r[0].component, factory);
                    return [new segments_1.TreeNode(segment, children)];
                });
            });
        }
    });
}
function _match(metadata, url) {
    for (var _i = 0, _a = metadata.routes; _i < _a.length; _i++) {
        var r = _a[_i];
        var matchingResult = _matchWithParts(r, url);
        if (lang_1.isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    var availableRoutes = metadata.routes.map(function (r) { return ("'" + r.path + "'"); }).join(", ");
    throw new exceptions_1.BaseException("Cannot match any routes. Current segment: '" + url.value + "'. Available routes: [" + availableRoutes + "].");
}
function _matchWithParts(route, url) {
    var path = route.path.startsWith("/") ? route.path.substring(1) : route.path;
    var parts = path.split("/");
    var positionalParams = {};
    var consumedUrlSegments = [];
    var lastParent = null;
    var lastSegment = null;
    var current = url;
    for (var i = 0; i < parts.length; ++i) {
        if (lang_1.isBlank(current))
            return null;
        var p_1 = parts[i];
        var isLastSegment = i === parts.length - 1;
        var isLastParent = i === parts.length - 2;
        var isPosParam = p_1.startsWith(":");
        if (!isPosParam && p_1 != current.value.segment)
            return null;
        if (isLastSegment) {
            lastSegment = current;
        }
        if (isLastParent) {
            lastParent = current;
        }
        if (isPosParam) {
            positionalParams[p_1.substring(1)] = current.value.segment;
        }
        consumedUrlSegments.push(current.value);
        current = collection_1.ListWrapper.first(current.children);
    }
    if (lang_1.isPresent(current) && lang_1.isBlank(current.value.segment)) {
        lastParent = lastSegment;
        lastSegment = current;
    }
    var p = lastSegment.value.parameters;
    var parameters = collection_1.StringMapWrapper.merge(lang_1.isBlank(p) ? {} : p, positionalParams);
    var axuUrlSubtrees = lang_1.isPresent(lastParent) ? lastParent.children.slice(1) : [];
    return new _MatchResult(route.component, consumedUrlSegments, parameters, lastSegment.children, axuUrlSubtrees);
}
function _checkOutletNameUniqueness(nodes) {
    var names = {};
    nodes.forEach(function (n) {
        var segmentWithSameOutletName = names[n.value.outlet];
        if (lang_1.isPresent(segmentWithSameOutletName)) {
            var p = segmentWithSameOutletName.stringifiedUrlSegments;
            var c = n.value.stringifiedUrlSegments;
            throw new exceptions_1.BaseException("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
        }
        names[n.value.outlet] = n.value;
    });
    return nodes;
}
var _MatchResult = (function () {
    function _MatchResult(component, consumedUrlSegments, parameters, leftOverUrl, aux) {
        this.component = component;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOverUrl = leftOverUrl;
        this.aux = aux;
    }
    return _MatchResult;
}());
function _readMetadata(componentType) {
    var metadata = reflection_1.reflector.annotations(componentType).filter(function (f) { return f instanceof metadata_1.RoutesMetadata; });
    return collection_1.ListWrapper.first(metadata);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1XNVZnS25CRi50bXAvYW5ndWxhcjIvc3JjL2FsdF9yb3V0ZXIvcmVjb2duaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5QkFBaUUsWUFBWSxDQUFDLENBQUE7QUFDOUUseUJBQTRDLHFCQUFxQixDQUFDLENBQUE7QUFDbEUscUJBQWtELDBCQUEwQixDQUFDLENBQUE7QUFDN0UsMkJBQTRDLGdDQUFnQyxDQUFDLENBQUE7QUFDN0Usd0JBQTZCLDZCQUE2QixDQUFDLENBQUE7QUFDM0QsMkJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFFN0QsMEJBQWtDLGFBQWEsQ0FBQyxDQUFBO0FBQ2hELDJCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBRWxFLG1CQUEwQixpQkFBb0MsRUFBRSxJQUFVLEVBQ2hELEdBQXFCO0lBQzdDLElBQUksT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztTQUMvQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxJQUFJLGVBQUksQ0FBZSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFMZSxpQkFBUyxZQUt4QixDQUFBO0FBRUQsb0JBQW9CLGlCQUFvQyxFQUFFLFVBQWdCLEVBQ3RELEdBQXlCO0lBQzNDLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFFLHVDQUF1QztJQUNsRixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMs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QyxPQUFJLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7SUFDRSxzQkFBbUIsU0FBZSxFQUFTLG1CQUFpQyxFQUN6RCxVQUFtQyxFQUNuQyxXQUFtQyxFQUFTLEdBQTJCO1FBRnZFLGNBQVMsR0FBVCxTQUFTLENBQU07UUFBUyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWM7UUFDekQsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQXdCO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBd0I7SUFBRyxDQUFDO0lBQ2hHLG1CQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFFRCx1QkFBdUIsYUFBbUI7SUFDeEMsSUFBSSxRQUFRLEdBQUcsc0JBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxZQUFZLHlCQUFjLEVBQTNCLENBQTJCLENBQUMsQ0FBQztJQUM3RixNQUFNLENBQUMsd0JBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Um91dGVTZWdtZW50LCBVcmxTZWdtZW50LCBUcmVlLCBUcmVlTm9kZSwgcm9vdE5vZGV9IGZyb20gJy4vc2VnbWVudHMnO1xuaW1wb3J0IHtSb3V0ZXNNZXRhZGF0YSwgUm91dGVNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YS9tZXRhZGF0YSc7XG5pbXBvcnQge1R5cGUsIGlzQmxhbmssIGlzUHJlc2VudCwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0NvbXBvbmVudFJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7REVGQVVMVF9PVVRMRVRfTkFNRX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvZ25pemUoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCB0eXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFRyZWU8VXJsU2VnbWVudD4pOiBQcm9taXNlPFRyZWU8Um91dGVTZWdtZW50Pj4ge1xuICBsZXQgbWF0Y2hlZCA9IG5ldyBfTWF0Y2hSZXN1bHQodHlwZSwgW3VybC5yb290XSwgbnVsbCwgcm9vdE5vZGUodXJsKS5jaGlsZHJlbiwgW10pO1xuICByZXR1cm4gX2NvbnN0cnVjdFNlZ21lbnQoY29tcG9uZW50UmVzb2x2ZXIsIG1hdGNoZWQpXG4gICAgICAudGhlbihyb290cyA9PiBuZXcgVHJlZTxSb3V0ZVNlZ21lbnQ+KHJvb3RzWzBdKSk7XG59XG5cbmZ1bmN0aW9uIF9yZWNvZ25pemUoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCBwYXJlbnRUeXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IFRyZWVOb2RlPFVybFNlZ21lbnQ+KTogUHJvbWlzZTxUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+W10+IHtcbiAgbGV0IG1ldGFkYXRhID0gX3JlYWRNZXRhZGF0YShwYXJlbnRUeXBlKTsgIC8vIHNob3VsZCByZWFkIGZyb20gdGhlIGZhY3RvcnkgaW5zdGVhZFxuICBpZiAoaXNCbGFuayhtZXRhZGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgYENvbXBvbmVudCAnJHtzdHJpbmdpZnkocGFyZW50VHlwZSl9JyBkb2VzIG5vdCBoYXZlIHJvdXRlIGNvbmZpZ3VyYXRpb25gKTtcbiAgfVxuXG4gIGxldCBtYXRjaDtcbiAgdHJ5IHtcbiAgICBtYXRjaCA9IF9tYXRjaChtZXRhZGF0YSwgdXJsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZWplY3QoZSwgbnVsbCk7XG4gIH1cblxuICBsZXQgbWFpbiA9IF9jb25zdHJ1Y3RTZWdtZW50KGNvbXBvbmVudFJlc29sdmVyLCBtYXRjaCk7XG4gIGxldCBhdXggPVxuICAgICAgX3JlY29nbml6ZU1hbnkoY29tcG9uZW50UmVzb2x2ZXIsIHBhcmVudFR5cGUsIG1hdGNoLmF1eCkudGhlbihfY2hlY2tPdXRsZXROYW1lVW5pcXVlbmVzcyk7XG4gIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwoW21haW4sIGF1eF0pLnRoZW4oTGlzdFdyYXBwZXIuZmxhdHRlbik7XG59XG5cbmZ1bmN0aW9uIF9yZWNvZ25pemVNYW55KGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlciwgcGFyZW50VHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IFRyZWVOb2RlPFVybFNlZ21lbnQ+W10pOiBQcm9taXNlPFRyZWVOb2RlPFJvdXRlU2VnbWVudD5bXT4ge1xuICBsZXQgcmVjb2duaXplZCA9IHVybHMubWFwKHUgPT4gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlciwgcGFyZW50VHlwZSwgdSkpO1xuICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuYWxsKHJlY29nbml6ZWQpLnRoZW4oTGlzdFdyYXBwZXIuZmxhdHRlbik7XG59XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3RTZWdtZW50KGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWQ6IF9NYXRjaFJlc3VsdCk6IFByb21pc2U8VHJlZU5vZGU8Um91dGVTZWdtZW50PltdPiB7XG4gIHJldHVybiBjb21wb25lbnRSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50KG1hdGNoZWQuY29tcG9uZW50KVxuICAgICAgLnRoZW4oZmFjdG9yeSA9PiB7XG4gICAgICAgIGxldCB1cmxPdXRsZXQgPSBtYXRjaGVkLmNvbnN1bWVkVXJsU2VnbWVudHNbMF0ub3V0bGV0O1xuICAgICAgICBsZXQgc2VnbWVudCA9IG5ldyBSb3V0ZVNlZ21lbnQobWF0Y2hlZC5jb25zdW1lZFVybFNlZ21lbnRzLCBtYXRjaGVkLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JsYW5rKHVybE91dGxldCkgPyBERUZBVUxUX09VVExFVF9OQU1FIDogdXJsT3V0bGV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5jb21wb25lbnQsIGZhY3RvcnkpO1xuXG4gICAgICAgIGlmIChtYXRjaGVkLmxlZnRPdmVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gX3JlY29nbml6ZU1hbnkoY29tcG9uZW50UmVzb2x2ZXIsIG1hdGNoZWQuY29tcG9uZW50LCBtYXRjaGVkLmxlZnRPdmVyVXJsKVxuICAgICAgICAgICAgICAudGhlbihjaGlsZHJlbiA9PiBbbmV3IFRyZWVOb2RlPFJvdXRlU2VnbWVudD4oc2VnbWVudCwgY2hpbGRyZW4pXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWNvZ25pemVMZWZ0T3ZlcnMoY29tcG9uZW50UmVzb2x2ZXIsIG1hdGNoZWQuY29tcG9uZW50KVxuICAgICAgICAgICAgICAudGhlbihjaGlsZHJlbiA9PiBbbmV3IFRyZWVOb2RlPFJvdXRlU2VnbWVudD4oc2VnbWVudCwgY2hpbGRyZW4pXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfcmVjb2duaXplTGVmdE92ZXJzKGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VHlwZTogVHlwZSk6IFByb21pc2U8VHJlZU5vZGU8Um91dGVTZWdtZW50PltdPiB7XG4gIHJldHVybiBjb21wb25lbnRSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50KHBhcmVudFR5cGUpXG4gICAgICAudGhlbihmYWN0b3J5ID0+IHtcbiAgICAgICAgbGV0IG1ldGFkYXRhID0gX3JlYWRNZXRhZGF0YShwYXJlbnRUeXBlKTtcbiAgICAgICAgaWYgKGlzQmxhbmsobWV0YWRhdGEpKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHIgPSAoPGFueVtdPm1ldGFkYXRhLnJvdXRlcykuZmlsdGVyKHIgPT4gci5wYXRoID09IFwiXCIgfHwgci5wYXRoID09IFwiL1wiKTtcbiAgICAgICAgaWYgKHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUoW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcmVjb2duaXplTGVmdE92ZXJzKGNvbXBvbmVudFJlc29sdmVyLCByWzBdLmNvbXBvbmVudClcbiAgICAgICAgICAgICAgLnRoZW4oY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50KHJbMF0uY29tcG9uZW50KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmYWN0b3J5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VnbWVudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSb3V0ZVNlZ21lbnQoW10sIG51bGwsIERFRkFVTFRfT1VUTEVUX05BTUUsIHJbMF0uY29tcG9uZW50LCBmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW25ldyBUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+KHNlZ21lbnQsIGNoaWxkcmVuKV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9tYXRjaChtZXRhZGF0YTogUm91dGVzTWV0YWRhdGEsIHVybDogVHJlZU5vZGU8VXJsU2VnbWVudD4pOiBfTWF0Y2hSZXN1bHQge1xuICBmb3IgKGxldCByIG9mIG1ldGFkYXRhLnJvdXRlcykge1xuICAgIGxldCBtYXRjaGluZ1Jlc3VsdCA9IF9tYXRjaFdpdGhQYXJ0cyhyLCB1cmwpO1xuICAgIGlmIChpc1ByZXNlbnQobWF0Y2hpbmdSZXN1bHQpKSB7XG4gICAgICByZXR1cm4gbWF0Y2hpbmdSZXN1bHQ7XG4gICAgfVxuICB9XG4gIGxldCBhdmFpbGFibGVSb3V0ZXMgPSBtZXRhZGF0YS5yb3V0ZXMubWFwKHIgPT4gYCcke3IucGF0aH0nYCkuam9pbihcIiwgXCIpO1xuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgIGBDYW5ub3QgbWF0Y2ggYW55IHJvdXRlcy4gQ3VycmVudCBzZWdtZW50OiAnJHt1cmwudmFsdWV9Jy4gQXZhaWxhYmxlIHJvdXRlczogWyR7YXZhaWxhYmxlUm91dGVzfV0uYCk7XG59XG5cbmZ1bmN0aW9uIF9tYXRjaFdpdGhQYXJ0cyhyb3V0ZTogUm91dGVNZXRhZGF0YSwgdXJsOiBUcmVlTm9kZTxVcmxTZWdtZW50Pik6IF9NYXRjaFJlc3VsdCB7XG4gIGxldCBwYXRoID0gcm91dGUucGF0aC5zdGFydHNXaXRoKFwiL1wiKSA/IHJvdXRlLnBhdGguc3Vic3RyaW5nKDEpIDogcm91dGUucGF0aDtcbiAgbGV0IHBhcnRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIGxldCBwb3NpdGlvbmFsUGFyYW1zID0ge307XG4gIGxldCBjb25zdW1lZFVybFNlZ21lbnRzID0gW107XG5cbiAgbGV0IGxhc3RQYXJlbnQ6IFRyZWVOb2RlPFVybFNlZ21lbnQ+ID0gbnVsbDtcbiAgbGV0IGxhc3RTZWdtZW50OiBUcmVlTm9kZTxVcmxTZWdtZW50PiA9IG51bGw7XG5cbiAgbGV0IGN1cnJlbnQgPSB1cmw7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoaXNCbGFuayhjdXJyZW50KSkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgcCA9IHBhcnRzW2ldO1xuICAgIGxldCBpc0xhc3RTZWdtZW50ID0gaSA9PT0gcGFydHMubGVuZ3RoIC0gMTtcbiAgICBsZXQgaXNMYXN0UGFyZW50ID0gaSA9PT0gcGFydHMubGVuZ3RoIC0gMjtcbiAgICBsZXQgaXNQb3NQYXJhbSA9IHAuc3RhcnRzV2l0aChcIjpcIik7XG5cbiAgICBpZiAoIWlzUG9zUGFyYW0gJiYgcCAhPSBjdXJyZW50LnZhbHVlLnNlZ21lbnQpIHJldHVybiBudWxsO1xuICAgIGlmIChpc0xhc3RTZWdtZW50KSB7XG4gICAgICBsYXN0U2VnbWVudCA9IGN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChpc0xhc3RQYXJlbnQpIHtcbiAgICAgIGxhc3RQYXJlbnQgPSBjdXJyZW50O1xuICAgIH1cblxuICAgIGlmIChpc1Bvc1BhcmFtKSB7XG4gICAgICBwb3NpdGlvbmFsUGFyYW1zW3Auc3Vic3RyaW5nKDEpXSA9IGN1cnJlbnQudmFsdWUuc2VnbWVudDtcbiAgICB9XG5cbiAgICBjb25zdW1lZFVybFNlZ21lbnRzLnB1c2goY3VycmVudC52YWx1ZSk7XG5cbiAgICBjdXJyZW50ID0gTGlzdFdyYXBwZXIuZmlyc3QoY3VycmVudC5jaGlsZHJlbik7XG4gIH1cblxuICBpZiAoaXNQcmVzZW50KGN1cnJlbnQpICYmIGlzQmxhbmsoY3VycmVudC52YWx1ZS5zZWdtZW50KSkge1xuICAgIGxhc3RQYXJlbnQgPSBsYXN0U2VnbWVudDtcbiAgICBsYXN0U2VnbWVudCA9IGN1cnJlbnQ7XG4gIH1cblxuICBsZXQgcCA9IGxhc3RTZWdtZW50LnZhbHVlLnBhcmFtZXRlcnM7XG4gIGxldCBwYXJhbWV0ZXJzID1cbiAgICAgIDx7W2tleTogc3RyaW5nXTogc3RyaW5nfT5TdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGlzQmxhbmsocCkgPyB7fSA6IHAsIHBvc2l0aW9uYWxQYXJhbXMpO1xuICBsZXQgYXh1VXJsU3VidHJlZXMgPSBpc1ByZXNlbnQobGFzdFBhcmVudCkgPyBsYXN0UGFyZW50LmNoaWxkcmVuLnNsaWNlKDEpIDogW107XG5cbiAgcmV0dXJuIG5ldyBfTWF0Y2hSZXN1bHQocm91dGUuY29tcG9uZW50LCBjb25zdW1lZFVybFNlZ21lbnRzLCBwYXJhbWV0ZXJzLCBsYXN0U2VnbWVudC5jaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXh1VXJsU3VidHJlZXMpO1xufVxuXG5mdW5jdGlvbiBfY2hlY2tPdXRsZXROYW1lVW5pcXVlbmVzcyhub2RlczogVHJlZU5vZGU8Um91dGVTZWdtZW50PltdKTogVHJlZU5vZGU8Um91dGVTZWdtZW50PltdIHtcbiAgbGV0IG5hbWVzID0ge307XG4gIG5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgbGV0IHNlZ21lbnRXaXRoU2FtZU91dGxldE5hbWUgPSBuYW1lc1tuLnZhbHVlLm91dGxldF07XG4gICAgaWYgKGlzUHJlc2VudChzZWdtZW50V2l0aFNhbWVPdXRsZXROYW1lKSkge1xuICAgICAgbGV0IHAgPSBzZWdtZW50V2l0aFNhbWVPdXRsZXROYW1lLnN0cmluZ2lmaWVkVXJsU2VnbWVudHM7XG4gICAgICBsZXQgYyA9IG4udmFsdWUuc3RyaW5naWZpZWRVcmxTZWdtZW50cztcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBUd28gc2VnbWVudHMgY2Fubm90IGhhdmUgdGhlIHNhbWUgb3V0bGV0IG5hbWU6ICcke3B9JyBhbmQgJyR7Y30nLmApO1xuICAgIH1cbiAgICBuYW1lc1tuLnZhbHVlLm91dGxldF0gPSBuLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIG5vZGVzO1xufVxuXG5jbGFzcyBfTWF0Y2hSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBUeXBlLCBwdWJsaWMgY29uc3VtZWRVcmxTZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgICAgICAgICAgIHB1YmxpYyBsZWZ0T3ZlclVybDogVHJlZU5vZGU8VXJsU2VnbWVudD5bXSwgcHVibGljIGF1eDogVHJlZU5vZGU8VXJsU2VnbWVudD5bXSkge31cbn1cblxuZnVuY3Rpb24gX3JlYWRNZXRhZGF0YShjb21wb25lbnRUeXBlOiBUeXBlKSB7XG4gIGxldCBtZXRhZGF0YSA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnRUeXBlKS5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgUm91dGVzTWV0YWRhdGEpO1xuICByZXR1cm4gTGlzdFdyYXBwZXIuZmlyc3QobWV0YWRhdGEpO1xufSJdfQ==