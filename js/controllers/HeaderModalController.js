revature.controller('headerModalCtrl', ['$scope', '$uibModalInstance', '$http', '$window', function ($scope, $uibModalInstance, $http, $window) {
    console.log("headerModal ctrl called");
    $scope.loading = true;

    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    $scope.emailId = JSON.stringify($scope.loggedUser.emailId);
    console.log($scope.emailId);

    $scope.updatePassword = function () {

        console.log($scope.emailId, $scope.password, $scope.retype, $scope.newpass);

        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http({
            method: 'POST',
            url: 'http://localhost:8080/core-app/users/update',
            data: $.param({
                emailId: $scope.emailId,
                password: $scope.password,
                newPassword: $scope.retype
            }),

            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (response) {
            console.log(response.password);
            var user = response != null && response.password != null;
            console.log(user);
            $scope.userData = response;

            if ($scope.retype != $scope.newpass) {
                alert('Please check your new password');
            }

            else {



                if (user) {
                    // console.log(user);
                    console.log("password successfully changed");
                    $window.location.href = 'index.html';


                }

                else {
                    alert('please check your password');
                    console.log("password not updated");
                }
            }
        })
            .error(function (error) {
                // $window.location.href = 'index.html';
                alert('Sorry Unexpected Error , Please try later');
                console.log("error msg : ", error)
            })
    };


    $scope.close = function () {
        $uibModalInstance.close();
    }

    $scope.loading = false;
}]);
