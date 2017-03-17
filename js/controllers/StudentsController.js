revature.controller('studentsProfileCtrl', ['$scope', '$http', '$rootScope', '$timeout', 'filterFilter', '$filter', function ($scope, $http, $rootScope, $timeout, filterFilter, $filter) {

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

    $scope.studentslist = [];

    function successCallBack(response) {

        //success code
        $scope.loading = true;
        // $scope.studentslist = [];
        var data = eval(response.data);
        console.log(response);
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

        //   console.log($scope.studentslist);
    }
    function errorCallBack(error) {
        //error code
        console.log('Error: ' + error);
    }

    /*Pagination*/

    $timeout(function () {
        $scope.loading = true;
        console.log($scope.studentslist);

        $scope.totalItems = $scope.studentslist.length;
        console.log($scope.totalItems)
        $scope.maxSize = 5;

        $scope.bigTotalItems = $scope.totalItems;
        $scope.currentPage = 1;

        $scope.itemsPerPage = 1;
        $scope.loading = false;
    }, 1000)

    $scope.showPages = true;

    $scope.searchProjects = function (search) {
        $scope.showCancel = true;
        var found = $filter('getById')($scope.studentslist, search);// input , id(search text frm fnt end)
        $scope.studentslist = [];
        $scope.studentslist = found;
        if ($scope.studentslist.length > 1) {
            $scope.showPages = true;

        } else {
            $scope.showPages = false;
        }
        console.log("cought you==>", found, $scope.studentslist);
    }
    


    $scope.clearSearch = function () {
        $scope.showCancel = false;
        $scope.showPages = true;
        $scope.loading = true;
        $http.get('http://localhost:8080/core-app/students/overall/student/college/' + collegeId + '/departmentId/' + deptId).then(successCallBack, errorCallBack);

        $scope.studentslist = [];

        function successCallBack(response) {

            //success code
            // $scope.loading = true;
            // $scope.studentslist = [];
            var data = eval(response.data);
            console.log(response);
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

            console.log("test", $scope.studentslist);
            $scope.loading = false

        }
        function errorCallBack(error) {
            //error code
            console.log('Error: ' + error);
        }
        $scope.search = "";
    }



    // var test = _.filter(items, function (item) {
    //     return _.some(item.tags, function (tag) {
    //         return _.startsWith(tag, input.val());
    //     });
    // });

}]);