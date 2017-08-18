angular.module('myApp').controller('userCntrl', function($scope, $http) {

    //function to refresh
    var refresh = function () {
        //GET request
        $http.get("/users")
            .then(function(response) {
                $scope.userList = response.data;
            });
    };

    refresh();

    //function to add user
    $scope.add = function () {
        console.log($scope.user);

        //POST request and posting user object to 127.0.0.1:4000/users
        $http.post('/users',$scope.user).then(function (response) {
           console.log(response);
           refresh();
            $scope.user = {};
        });
    };

    //function to remove or delete the user
    $scope.remove = function (id) {

        console.log(id);
        //sending a DELETE request and sending the id parameter from HTML
        $http.delete('/userlist/'+id, function (response) {

        });
        refresh();
    };
});