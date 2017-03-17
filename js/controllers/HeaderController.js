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

}]);