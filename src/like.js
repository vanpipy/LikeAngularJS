
(function(w) {
    'use strict';

    LikeAngularjs = function () {

    }

    Like.isString = defineTypeChecker('String');
    Like.isFunction = defineTypeChecker('Function');

    Like.isNull = defineTypeChecker('Null');
    Like.isUndefined = defineTypeChecker('Undefined');

    Like.isDefined = function (input) {
        return !Like.isNull(input) && !Like.isUndefined(input);
    };

    Like.isLiteNode = function (node) {
        return node && node.nodeName || node instanceof LiteNode;
    };

    function defineTypeChecker (typeString) {
        return function (input) {
            return Object.prototype.toString.call(input) == '[object '+ typeString +']';
        }
    }

    w.LA = LikeAngularjs;
})(window);
