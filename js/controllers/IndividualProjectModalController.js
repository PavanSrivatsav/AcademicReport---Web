revature.controller('IndividualProjectModalController', ['$scope', '$http', '$uibModalInstance', 'projId', '$rootScope', function ($scope, $http, $uibModalInstance, projId, $rootScope) {
    console.log("IndividualProjectModalController ", projId);
    $rootScope.title = " Academic | Project";
    $scope.projectModalList = [];
    $scope.loading = true;
    $http.get('http://localhost:8080/core-app/projects/list/project/detail/project/' + projId).then(successCallback, errorCallback);

    function successCallback(response) {
        //success code

        var data = eval(response.data);
        var sprintNames = [];
        var temp = {
            name: data[0].name,
            description: data[0].description,
            sprints: []
        }

        for (var i = 0; i < data.length; i++) {
            if (data[i].name === temp.name) {
                sprintNames.push(data[i].sprintName);
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
            var indx = index(temp.sprints, data[j].sprintName);
            //console.log(indx)

            temp.sprints[indx].sprintData.push({
                offlineActivity: data[j].offlineActivity,
                QuizName: data[j].quizName,
                onlineActivity: data[j].onlineActivity,
                videoName: data[j].videoName,
                courseName: data[j].courseName
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