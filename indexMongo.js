var app=angular.module("employee",['ngAnimate'])
app.controller("myCtrl",function($scope,$http){
$scope.employees=[]
$scope.employee={}
$scope.search=""
$scope.option=null;
$scope.value=null;
$scope.display=false;
$scope.temp=null;
$scope.convert=function(){
    $http.post("http://localhost:3001/convert",{ value: $scope.value })
    .then((response)=>
        $scope.temp=response.data)
    .catch(error=>console.log(error))
}
$scope.add=function(){
    $http.post("http://localhost:3001/add",$scope.employee)
    .then(function(){
        console.log("employee added successfully")
        $scope.employee={};
        $scope.get()

    },function(error){
        console.log("error in adding the employee "+error)
    }
    )
}
$scope.get=function(){
$http.get("http://localhost:3001/get")
.then(function(response){
console.log("fetched employees successfully");
$scope.employees=response.data
console.log($scope.employees);
$scope.display=true;
},
function(error){
console.log("an error occured while fetching the data "+error)
})
}
$scope.remove=function(employeeName){
    $http.delete("http://localhost:3001/remove/"+employeeName)
    .then(function(response){
        console.log("removed successfully")
        $scope.get()
    },
function(error){
    console.log("an error occured while removing "+error)
})
}
$scope.updateAge=function(employee){
    employee.id=Math.round(Math.random()*10000);
    $http.put("http://localhost:3001/update/"+employee.name,employee)
    .then(
        function(response){
            $scope.get()
            console.log("updated succesfully")
        },
        function(error){
            console.log("an error occured while updating"+error);
        }
    )
}


})
