revature.controller('projectModalCtrl', ['$scope', '$http', '$uibModalInstance', 'id', '$rootScope', function ($scope, $http, $uibModalInstance, id, $rootScope) {
    console.log("project controller", id);
    $rootScope.title = " Academic | Project";
    $scope.projectModalList = [];
    $scope.loading = true;
    $http.get('http://localhost:8080/core-app/projects/list/project/detail/projectId/' + id).then(successCallback, errorCallback);

    function successCallback(response) {
        //success code

        var data = eval(response.data);
        var sprintNames = [];
        var temp = {
            name: data[0]["NAME"],
            description: data[0]["DESCRIPTION"],
            sprints: []
        }

        for (var i = 0; i < data.length; i++) {
            if (data[i]["NAME"] === temp.name) {
                sprintNames.push(data[i]["SPRINT_NAME"]);
            }
        }
        console.log("==data==", data);
        var names = _.uniq(sprintNames);
        //console.log(names);

        angular.forEach(names, function (key, value) {
            console.log(key, "==>", value);
            temp.sprints.push({
                sprintName: key,
                sprintData: []
            })
        });

        for (var j = 0; j < data.length; j++) {
            var indx = index(temp.sprints, data[j]["SPRINT_NAME"]);
            //console.log(indx)

            temp.sprints[indx].sprintData.push({
                offlineActivity: data[j]["OFFLINE_ACTIVITY"],
                QuizName: data[j]["Quiz name"],
                onlineActivity: data[j]["ONLINE_ACTIVITY"],
                videoName: data[j]["Video name"],
                courseName: data[j]["Course name"]
            })
        }

        console.log("======JSON=====", JSON.stringify(temp));

        $scope.projectModalList = temp;

        function index(sprints, name) {
            for (var i = 0; i < sprints.length; i++) {
                if (sprints[i].sprintName === name) {
                    return i;
                }
            }
            return -1;
        }
        $scope.loading = false;
    }
    function errorCallback(error) {
        //error code
        console.log('Error: ' + error);
    }
    $scope.close = function () {
        $uibModalInstance.close();
    }

}]);