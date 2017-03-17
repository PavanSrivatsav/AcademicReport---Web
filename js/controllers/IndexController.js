revature.controller('indexController', ['$scope', '$window', function ($scope, $window) {
    console.log("indexController");
    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    if ($scope.loggedUser != null) {
        $window.location.href = "academic-report.html?/#/dashboard";
    }

    var pwShown = 0;

    document.getElementById("eye").addEventListener("click", function () {
        if (pwShown == 0) {
            pwShown = 1;
            show();
        } else {
            pwShown = 0;
            hide();
        }
    }, false);

    function show() {
        var p = document.getElementById('eye');
        var pwd = document.getElementById('inputPassword');
        p.setAttribute('class', 'fa fa-eye');
        pwd.setAttribute('type', 'text');

    }

    function hide() {
        var p = document.getElementById('eye');
        var pwd = document.getElementById('inputPassword');
        p.setAttribute('class', 'fa fa-eye-slash');
        pwd.setAttribute('type', 'password');
    }

}]);
