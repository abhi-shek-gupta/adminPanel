app.controller("adminLoginController",function( $scope,$http,$cookies,$location, $rootScope){
    console.log("in adminLoginController");
    $scope.submitForm = function(data){
        console.log(data);
        $http({
            url :"/admin_api/login-admin",
            method: "POST",
            data : data
        }).then(function(res){
            console.log("success ");
            console.log(res.data.token);
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            console.log(expireDate);
            // Put cookie
            $rootScope.token = res.data.token;
            $cookies.put('token',res.data.token, {path:'/', 'expires': expireDate});
            alert("Sign up Succesful !")
            $location.path('/dashbord');
        },function(err){
            console.log("error");
            console.log(err);
        })
    }
   })


  