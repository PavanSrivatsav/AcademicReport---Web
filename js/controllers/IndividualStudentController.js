revature.controller('individualStudentCtrl', ['$scope', '$http', '$stateParams', '$rootScope', function ($scope, $http, $stateParams, $rootScope) {
    console.log("stateParams id ", $stateParams.id);
    console.log("stateParams name ", $stateParams.name);

    var id = $stateParams.id;
    var name = $stateParams.name;

    $rootScope.title = " Academic | " + name;


    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));

    var deptId = $scope.loggedUser.departmentId;

    var collegeId = $scope.loggedUser.collegeId;

    $scope.loading = true;

    console.log($rootScope.LOGGED_USER);

    $http.get('http://localhost:8080/core-app/students/individual/student/courses/collegeId/' + collegeId + '/departmentId/' + deptId + '/studentId/' + id).then(successCallback, errorCallback);
    // console.log(StudentView);
    function successCallback(response) {
        //success code
        $scope.indStud = eval(response.data[0]);
        console.log(JSON.stringify(response));
        console.log((response));
        $scope.loading = false;
        //console.log("indStud"+JSON.stringify($scope.indStud));
        $rootScope.title = "";

    }
    function errorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }
    $scope.loading = true;
    $http.get('http://localhost:8080/core-app/students/individual/student/projects/collegeId/' + collegeId + '/departmentId/' + deptId + '/studentId/' + id).then(success, error);

    function success(response) {
        //success code
        $scope.studProjects = eval(response.data);
        console.log(JSON.stringify(response));
        console.log((response));
        $scope.loading = false;
    }
    function error(err) {
        //error code
        console.log('Error: ' + err);
    }
    $scope.loading = true;
    $http.get('http://localhost:8080/core-app/students/individual/student/courses/collegeId/' + collegeId + '/departmentId/' + deptId + '/studentId/' + id).then(succ, err);

    function succ(response) {
        //success code
        $scope.studCourses = eval(response.data);
        console.log(JSON.stringify(response));
        console.log((response));
        $scope.loading = false;
    }
    function err(er) {
        //error code
        console.log('Error: ' + er);
    }
}]);