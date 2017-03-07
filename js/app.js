/**
 * Created by PavanSrivatsav on 28-12-2016.
 */

var revature = angular.module('academicReport', ['angularUtils.directives.dirPagination', 'ui.router', 'ui.bootstrap', 'ngResource']);

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

        .state('changePassword', {
            url: "/changePassword",
            templateUrl: "modals/changePasswordModal.html",
            // controller: "mainCtrl"
        })

    //   .state('collapse0', {
    //     url: "/collapse0",
    //     //templateUrl: "modals/changePasswordModal.html",
    //     // controller: "mainCtrl"
    // })



});

// revature.run(function ($rootScope) {
//     $rootScope.LOGGED_USER;
// });

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

revature.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("mainctrl");

    // $scope.loading = true;
    // $http.get('http://localhost:8080/core-app/dashboard/trendingproject/collegeId/1')
    //     .success(function (data) {
    //         console.log('success');
    //     })
    //     .catch(function (err) {
    //         console.log('failed');
    //     })
    //     .finally(function () {
    //         // Hide loading spinner whether our call succeeded or failed.
    //         $scope.loading = false;
    //     });

    $scope.loading = false;
}]);

revature.controller('headerCtrl', ['$scope', function ($scope) {
    console.log("header ctrl called");

}])




