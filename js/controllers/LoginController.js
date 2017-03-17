revature.controller('loginController', ['$rootScope', '$scope', '$http', '$window', function ($rootScope, $scope, $http, $window) {
    console.log("login ctrl");
    $scope.login = function () {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http({
            method: 'POST',
            url: 'http://localhost:8080/core-app/users/login/',
            data: $.param({
                emailId: $scope.emailId,
                password: $scope.password
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (response) {
            var user = response != null && response.emailId != null;
            console.log(user);
            $scope.userData = response;

            $rootScope.LOGGED_USER = $scope.userData;

            if (user) {
                localStorage.setItem("LOGGED_IN_USER", JSON.stringify($scope.userData));
                $window.location.href = 'academic-report.html?/#/dashboard';
                console.log("success");

            }
            else {
                $scope.error = "Invalid EmailId or password Login";
                console.log("error");
            }

        })
            .error(function () {
                $window.location.href = 'index.html';
            })
    };
}]);