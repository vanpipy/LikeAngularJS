import Provider from './provider';
import Compiler from './compiler';
import Scope from './scope';

const $provider = new Provider();
const $compiler = new Compiler();
const $rootScope = new Scope();

$provider.register('$rootScope', $rootScope);

$provider.directive('ng-bind', () => ({
    scope: false,
    link: (element, scope, attrs) => {
        const key = attrs['ng-bind'];
        element.innerHTML = scope.$eval(key);
        scope.$watch(key, (newValue) => {
            element.innerHTML = newValue;
        });
    },
}));

$provider.directive('ng-controller', () => ({
    scope: true,
    link: (_element, scope, attrs) => {
        const key = attrs['ng-controller'];
        const controller = $provider.get(key);
        $provider.invoke(controller, { $scope: scope });
    },
}));

$provider.directive('ng-click', () => ({
    scope: false,
    link: (element, scope, attrs) => {
        const expression = attrs['ng-click'];

        element.onclick = () => {
            scope.$eval(expression);
            scope.$digest();
        };
    },
}));

$compiler.setProvider($provider);

const angular = {
    bootstrap: (root) => {
        $compiler.compile(root, $rootScope);
    },
    directive: $provider.directive.bind($provider),
    controller: $provider.controller.bind($provider),
};

global.angular = angular;
