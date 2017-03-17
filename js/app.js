/**
 * Created by PavanSrivatsav on 28-12-2016.
 */

var revature = angular.module('academicReport', ['ui.router', 'ui.bootstrap']);

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

revature.filter('getById', function () {
    return function (input, id) {
        var found = [];
        console.log(input, id);
        for (var i = 0; i < input.length; i++) {
            /*
                CHA ==>CHA ==> lodash will return true
            */
            if (_.includes(input[i].name.toUpperCase(), id.toUpperCase())) {
                found.push(input[i]);
            }
        }
        return found;
    }
});

revature.controller('mainCtrl', ['$scope', '$window', function ($scope, $window) {
    console.log("mainctrl");
    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    if ($scope.loggedUser == null) {
        $window.location.href = "index.html";
    }
}]);



