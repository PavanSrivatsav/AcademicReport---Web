revature.controller('IndividualCourseModalController', ['$scope', '$http', 'id', '$uibModalInstance', '$rootScope', 'studId', '$timeout', function ($scope, $http, id, $uibModalInstance, $rootScope, studId, $timeout) {
    console.log("IndividualCourseModalController ", id);
    $rootScope.title = " Academic | Course";
    var courseId = id;
    $scope.id = courseId;
    $scope.courseModalList = [];
    console.log("Student Id :", studId);
    $scope.loading = true;


    $http.get('http://localhost:8080/core-app/courses/list/course/detail/course/' + courseId).then(successCallback, errorCallback);

    // Total course count

    $http.get('http://localhost:8080/core-app/courses/total/course/count/course/' + courseId).then(succCallBack, errCallback);


    //Single course count

    $http.get('http://localhost:8080/core-app/students/courses/completed/student/course/count/student/' + studId + '/course/' + courseId).then(successCall, errorCall);

    $scope.loading = true;
    $scope.courseCount = 0;
    $scope.courseTotalCount = 0;
    function successCall(response) {
        $scope.loading = true;
        //success code
        $scope.courseCount = eval(response.data[0].count);
        console.log(JSON.stringify(response));
        // console.log((response));
        // $rootScope.result = response;
        console.log("Single course completed count ", $scope.courseCount);
       // $scope.loading = false;
    }
    function errorCall(error) {
        //error code
        console.log('Error: ' + error);
    }

    function succCallBack(response) {
        $scope.loading = true;
        //success code
        $scope.courseTotalCount = eval(response.data[0].count);
        console.log(JSON.stringify(response));
        // console.log((response));
        // $rootScope.result = response;
        console.log("Total course count ", $scope.courseTotalCount);
       // $scope.loading = false;
        return $scope.courseTotalCount;
    }
    function errCallback(error) {
        //error code
        console.log('Error: ' + error);
    }

    function successCallback(response) {
        $scope.loading = true;
        //success code
        $scope.courseModalList = eval(response.data);
        console.log(JSON.stringify(response));
        // console.log((response));
        // $rootScope.result = response;
        console.log($scope.courseModalList);
        //$scope.loading = false;
    }
    function errorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }

    $scope.close = function () {
        $uibModalInstance.close();
    }
     
    $timeout(function(){
        console.log("hello", Number(($scope.courseCount / $scope.courseTotalCount) * 100));
        $scope.percentage = Number(($scope.courseCount / $scope.courseTotalCount) * 100);
         $scope.percentageStyle = { width: $scope.percentage + '%' }
           $scope.loading = false;
    }, 2000)
    console.log($scope.percentage);
    // $scope.loading = false;

   
}]);
