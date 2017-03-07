revature.controller('studentsProfileCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $scope.courseJSON =
        [
            {
                "Course": "HTML",
                "Percentage": 43

            },
            {
                "Course": "CSS",
                "Percentage": 35

            },
            {
                "Course": "Angular JS",
                "Percentage": 10

            },
            {
                "Course": "SQL",
                "Percentage": 10

            }
        ];

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }



    //  $scope.loading = true; 

$rootScope.title="Students";

    // $http.get('http://localhost:8080/core-app/students/overall/student/current/courses/collegeId/3/departmentId/1').then(successCallback, errorCallback);
    // $http.get('http://localhost:8080/core-app/students/overall/student/current/courses/collegeId/3/departmentId/1').then(successCallback1, errorCallback1);
    // $http.get('http://localhost:8080/core-app/students/overall/student/completed/courses/collegeId/3/departmentId/1').then(successCallback2, errorCallback2);
    // $http.get('http://localhost:8080/core-app/students/overall/student/current/projects/collegeId/3/departmentId/1').then(successCallback3, errorCallback3);
    // $http.get('http://localhost:8080/core-app/students/overall/student/completed/projects/collegeId/3/departmentId/1').then(successCallback4, errorCallback4);


    // function successCallback1(response) {
    //     //success code
    //     $scope.studentslist1 = eval(response.data);
    //     console.log(JSON.stringify(response));
    //     console.log((response));
    //     $rootScope.result = response;

    // }
    // function errorCallback1(error) {
    //     //error code
    //     console.log('Error: ' + error);
    // }




    // function errorCallback(error) {
    //     //error code
    //     console.log('Error: ' + error);
    // }

    // function successCallback1(response) {
    //     //success code
    //     $scope.studentslist1 = eval(response.data);
    //     console.log(JSON.stringify(response));
    //     console.log((response));
    //     $rootScope.result = response;

    // }
    // function errorCallback1(error) {
    //     //error code
    //     console.log('Error: ' + error);
    // }


    // function successCallback(response) {

    //     //success code
    //     if (JSON.stringify(response.data) == '[]') {
    //         $scope.studentslist2 = eval(response.data);
    //         $scope.par = '--';
    //         console.log(JSON.stringify(response));
    //         console.log((response));
    //         $rootScope.result = response;
    //         //the response is null
    //     }
    //     else {
    //         function errorCallback2(error) {
    //             //error code
    //             console.log('Error: ' + error);
    //         }

    //     }
    // }

    // function successCallback3(response) {
    //     //success code
    //     $scope.studentslist3 = eval(response.data);
    //     console.log(JSON.stringify(response));
    //     console.log((response));
    //     $rootScope.result = response;

    // }
    // function errorCallback3(error) {
    //     //error code
    //     console.log('Error: ' + error);
    // }


    // function successCallback4(response) {
    //     //success code
    //     $scope.studentslist4 = eval(response.data);
    //     console.log(JSON.stringify(response));
    //     console.log((response));
    //     $rootScope.result = response;

    // }
    // function errorCallback4(error) {
    //     //error code
    //     console.log('Error: ' + error);
    // }



}]);