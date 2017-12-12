app.controller("adminFormController",function( $scope,$http,$location){
    console.log("in form Controller");
    $scope.blogForm = function(data){
        console.log(data);
        $http({
            url :"/admin_api/addBlog-admin",
            method: "POST",
            data : data
        }).then(function(res){
            console.log("success ");
            console.log(res);
        alert(" Blog Added Successfully !")
          $location.path('/dashbord');
        },function(err){
            console.log("error");
            console.log(err);
        })
    }
   })