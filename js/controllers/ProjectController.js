revature.controller('projectCtrl', ['$scope', '$http', '$uibModal', '$rootScope', function ($scope, $http, $uibModal, $rootScope) {
    console.log("project controller");
    $rootScope.title = "Projects";
    $scope.loading = true;

    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    var collegeId = $scope.loggedUser.collegeId;
    var deptId = $scope.loggedUser.departmentId;

    $http.get('http://localhost:8080/core-app/projects/list/project/overall/detail/collegeId/' + collegeId).then(successCallback, errorCallback);

    function successCallback(response) {
        //success code
        $scope.projectList = eval(response.data);
        console.log(JSON.stringify(response));
        $scope.loading = false;
    }
    function errorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }

    $scope.openView = function (id) {
        var modal = $uibModal.open({
            animation: true,
            templateUrl: "modals/projectModal.html",
            controller: "projectModalCtrl",
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

