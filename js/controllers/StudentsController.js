revature.controller('studentsProfileCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $rootScope.title = " Academic | Students";
    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));

    var collegeId = $scope.loggedUser.collegeId;
    var deptId = $scope.loggedUser.departmentId;

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.loading = true;
    $http.get('http://localhost:8080/core-app/students/overall/student/college/' + collegeId + '/departmentId/' + deptId).then(successCallBack, errorCallBack);
    $scope.loading = false;

    function successCallBack(response) {
        //success code
        $scope.studentslist = [];
        var data = eval(response.data);

        var temp = {
            "id": data[0].id,
            "name": data[0].name,
            "collegeId": data[0].collegeId,
            "emailId": data[0].emailId,
            "departmentId": data[0].departmentId,
            "departmentName": data[0].departmentName,
            courses: {
                currentProject: [],
                currentCourse: [],
                completedProject: [],
                completedCourse: []
            }
        };
        $scope.studentslist.push(temp);

        for (var i = 0; i < data.length; i++) {
            if (temp.id != data[i].id) {
                temp = {
                    "id": data[i].id,
                    "name": data[i].name,
                    "collegeId": data[i].collegeId,
                    "emailId": data[i].emailId,
                    "departmentId": data[i].departmentId,
                    "departmentName": data[i].departmentName,
                    courses: {
                        currentProject: [],
                        currentCourse: [],
                        completedProject: [],
                        completedCourse: []
                    }
                }
                $scope.studentslist.push(temp);
            }
            if (data[i].currentProject) {
                temp.courses.currentProject.push(data[i].currentProject);
            } else if (data[i].currentCourse) {
                temp.courses.currentCourse.push(data[i].currentCourse);
            } else if (data[i].completedProject) {
                temp.courses.completedProject.push(data[i].completedProject);
            } else if (data[i].completedCourse) {
                temp.courses.completedCourse.push(data[i].completedCourse);
            }
        }

        console.log($scope.studentslist);
    }
    function errorCallBack(error) {
        //error code
        console.log('Error: ' + error);
    }

}]);