var app=angular.module("app",[])
app.controller("myCtrl",function($scope,$http){
    $scope.temp=""
    $scope.ans=""
    $scope.tempVal=""
    $scope.convert=function(){
        $http.post(`http://localhost:3000/convert${$scope.tempVal}`,{value:$scope.temp})
        .then(function(response){
            console.log("the converted value is "+response)
            $scope.ans=response
        },function(error){
            console.log("an error ocured "+error)
        })
    }
})