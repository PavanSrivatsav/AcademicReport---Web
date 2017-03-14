revature.controller('courseCtrl', ['$scope', '$http', '$uibModal', '$rootScope', function ($scope, $http, $uibModal, $rootScope) {
    console.log("==course controller==");
    $rootScope.title = " Academic | Courses";
    $scope.courseList = [];
    $scope.loading = true;

    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    var collegeId = $scope.loggedUser.collegeId;

    $http.get('http://localhost:8080/core-app/courses/list/course/overall/detail/college/' + collegeId).then(successCallback, errorCallback);

    function successCallback(response) {
        //success code
        $scope.courseList = eval(response.data);
        console.log(JSON.stringify(response));
        // console.log((response));
        // $rootScope.result = response;
        console.log($scope.courseList);
        $scope.loading = false;
    }
    function errorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }

    $scope.openViewCourse = function (id) {
        var modal = $uibModal.open({
            animation: true,
            templateUrl: "modals/courseModal.html",
            controller: "courseModal",
            size: 'lg',
            backdrop: 'static',
            resolve: {
                id: function () {
                    return id;
                }
            }
        })
    }
    
}]);