revature.controller('courseModal', ['$scope', '$http', 'id', '$uibModalInstance', '$rootScope', function ($scope, $http, id, $uibModalInstance, $rootScope) {
    console.log("course controller", id);
    $rootScope.title = " Academic | Course";
    var courseId = id;
    $scope.id = courseId;
    $scope.courseModalList = [];
    $scope.loading = true;


    $http.get('http://localhost:8080/core-app/courses/list/course/detail/course/' + courseId).then(successCallback, errorCallback);

    function successCallback(response) {
        //success code
        $scope.courseModalList = eval(response.data);
        console.log(JSON.stringify(response));
        // console.log((response));
        // $rootScope.result = response;
        console.log($scope.courseModalList);
        $scope.loading = false;
    }
    function errorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }

    $scope.close = function () {
        $uibModalInstance.close();
    }



}]);
