/**
 * Created by PavanSrivatsav on 28-12-2016.
 */

var revature = angular.module('academicReport', ['angularUtils.directives.dirPagination', 'ui.router', 'ui.bootstrap']);

revature.config(function ($stateProvider, $urlRouterProvider) {

    //    $urlRouterProvider.otherwise("dashboard"); // commented for modal open

    $stateProvider
        .state('/', {
            url: "/",
            templateUrl: "index.html",
        })
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "partials/dashboard.html",
            controller: "dashboardCtrl"
        })

        .state('courses', {
            url: "/courses",
            templateUrl: "partials/courses.html",
            controller: "courseCtrl"
        })

        .state('individualStudent', {
            url: "/individual-student/:id/:name",
            templateUrl: "partials/individualStudent.html",
            controller: "individualStudentCtrl"
        })

        .state('project', {
            url: "/project",
            templateUrl: "partials/project.html",
            controller: "projectCtrl"
        })

        .state('students', {
            url: "/students",
            templateUrl: "partials/students.html",
            controller: "studentsProfileCtrl"
        })

        .state('academic-report', {
            url: "/academic-report",
            templateUrl: "academic-report.html",
            controller: "mainCtrl"
        })

});


revature.controller('loginController', ['$rootScope', '$scope', '$http', '$window', '$timeout', function ($rootScope, $scope, $http, $window, $timeout) {
    console.log("login ctrl");
    $scope.login = function () {
        console.log("login function");
        var emailId = $scope.emailId;
        var pass = $scope.password;

        var url = 'http://localhost:8080/core-app/users/login/' + emailId + '/' + pass;
        console.log(url);
        $http.get(url).success(function (response) {
            var user = response != null && response.emailId != null;
            console.log(user);
            $scope.userData = response;

            $rootScope.LOGGED_USER = $scope.userData;

            if (user) {
                localStorage.setItem("LOGGED_IN_USER", JSON.stringify($scope.userData));
                $window.location.href = 'academic-report.html?/#/dashboard';
                console.log("success");

            }
            else {
                $scope.error = "Invalid Login";
                console.log("error");
            }

        }).error(function () {
            $window.location.href = 'index.html';
        })

    };

}]);

revature.controller('mainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    console.log("mainctrl");
    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    if ($scope.loggedUser == null) {
        $window.location.href = "index.html";
    }
}]);

revature.controller('headerCtrl', ['$scope', '$uibModal', function ($scope, $uibModal) {
    console.log("header ctrl called");
    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    console.log("Name of logged user", $scope.loggedUser.name);
    $scope.username = $scope.loggedUser.name;
    $scope.loading = true;
    $scope.changePassword = function () {
        var modal = $uibModal.open({
            animation: true,
            templateUrl: "modals/changePasswordModal.html",
            controller: "headerModalCtrl",
            size: 'lg',
            backdrop: 'static',

        })
    }
    $scope.loading = false;

    $scope.logout = function () {
        console.log("logout successful");
        localStorage.clear();
    }

    // $scope.check = function () {
    //     console.log("check called");
    //     if ($scope.retype === $scope.pass) {
    //         console.log("true");
    //         return true;
    //     }
    //     else {
    //         console.log("false");
    //         return false;
    //     }

    // }
}]);

revature.controller('headerModalCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    console.log("headerModal ctrl called");
    $scope.loading = true;
    $scope.close = function () {
        $uibModalInstance.close();
    }
    $scope.loading = false;
}]);


revature.controller('footerCtrl', ['$scope', function ($scope) {
    console.log("footer ctrl called");
    $scope.loading = true;

    $scope.loading = false;
}]);


