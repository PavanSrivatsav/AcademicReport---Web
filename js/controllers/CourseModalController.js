revature.controller('courseModal', ['$scope', '$http', 'nameView', '$uibModalInstance', '$rootScope', function ($scope, $http, nameView, $uibModalInstance, $rootScope) {
    console.log("course controller", nameView);
    $rootScope.title = " Academic | Course";
    $scope.name = nameView;
    $scope.courseModalList = [];
    $scope.loading = true;


    $http.get('http://localhost:8080/core-app/courses/list/course/detail/courseId/1').then(successCallback, errorCallback);

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
