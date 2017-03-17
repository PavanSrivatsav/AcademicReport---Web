revature.controller('dashboardCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $rootScope.title = " Academic | Dashboard";
    
    $scope.loggedUser = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    var collegeId = $scope.loggedUser.collegeId;
    var deptId = $scope.loggedUser.departmentId;

    //Course Graph
    $scope.courseList = [];
    $scope.loading = true;

    $http.get(' http://localhost:8080/core-app/dashboard/trendingcourse/collegeId/' + collegeId).then(successCallback, errorCallback);

    function successCallback(response) {
        //success code
        $scope.courseList = eval(response);
        console.log(JSON.stringify(response));
        $scope.pieChart_courses($scope.courseList.data);
        $scope.loading = false;
    }
    function errorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }


    $scope.pieChart_courses = function (result) {

        console.log("RESULT==>", result);
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var courseChartData = [
                ['Course', 'Percentage']
            ];

            for (i in result) {

                console.log("result", result[i]);
                var courseObj = result[i];
                var courseData = [courseObj.courseName, courseObj.courseCount];
                console.log("Chart Data", courseData);
                courseChartData.push(courseData);

            }

            var chartData = google.visualization.arrayToDataTable(courseChartData);
            var options = {
                title: 'Courses',
                pieHole: 0.4,
                titleTextStyle: {
                    fontSize: 35,
                    fontName: "Futura PT",
                    bold: false,
                }
                , width: 500
                , height: 500

            };

            var chart = new google.visualization.PieChart(document.getElementById('coursedonutchart'));
            console.log("chartData", chartData, "options", options)
            chart.draw(chartData, options);
        }
    }

    //Project Graph

    $scope.projectList = [];
    $scope.loading = true;
    $http.get(' http://localhost:8080/core-app/dashboard/trendingproject/collegeId/' + collegeId).then(projectsuccessCallback, projecterrorCallback);

    function projectsuccessCallback(response) {
        //success code
        $scope.projectList = eval(response);
        console.log(JSON.stringify(response));
        $scope.loadedProjectGraphData($scope.projectList.data);

        $scope.loading = false;
    }
    function projecterrorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }


    $scope.loadedProjectGraphData = function (projectGraphResult) {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawProjectChart);
        function drawProjectChart() {
            var projectChartData = [
                ['Project', 'Percentage']
            ];

            for (i in projectGraphResult) {
                console.log("result", projectGraphResult[i]);
                var projectObj = projectGraphResult[i];
                console.log(projectObj);
                var projectData = [projectObj.projectName, projectObj.projectCount];
                console.log("Chart Data", projectData);
                projectChartData.push(projectData);
            }
            var chartData = google.visualization.arrayToDataTable(projectChartData);
            var options = {
                title: 'Projects',
                pieHole: 0.4,
                titleTextStyle: {
                    fontSize: 35,
                    fontName: "Futura PT",
                    bold: false,
                }, width: 500
                , height: 500

            };

            var charts = new google.visualization.PieChart(document.getElementById('projectdonutchart'));
            charts.draw(chartData, options);
        }


    }

    // Active Course Students
    $scope.loading = true;
    $http.get(' http://localhost:8080/core-app/dashboard/activecourse/collegeId/' + collegeId + '/departmentId/' + deptId).then(success, error);

    function success(response) {
        //success code
        $scope.activeCourseStudents = eval(response);
        console.log(JSON.stringify(response));
        $scope.loading = false;
    }
    function error(err) {
        //error code
        console.log('Error: ' + err);
    }

    //Active Project Students

    $http.get(' http://localhost:8080/core-app/dashboard/activeproject/collegeId/' + collegeId + '/departmentId/' + deptId).then(succes, err);

    function succes(response) {
        //success code
        $scope.activeProjectStudents = eval(response);
        console.log(JSON.stringify(response));
        $scope.loading = false;
    }
    function err(er) {
        //error code
        console.log('Error: ' + er);
    }

}]);