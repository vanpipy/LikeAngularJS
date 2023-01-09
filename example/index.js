'use strict';

const angular = window.angular;

const root = document.getElementById('app');

console.log(angular);

angular.controller('mainController', ($scope) => {
    $scope.A = 0;

    $scope.test = () => {
        $scope.A += 1;
    }
})

angular.bootstrap(root);
