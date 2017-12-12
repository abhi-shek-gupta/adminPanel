app.controller("adminEditPostController",function($scope, $location,$http, $routeParams){
    console.log("in adminEditPostController ");
    console.log($routeParams.id);

    let id =$routeParams.id;
    $http({
        url:'admin_api/getABlog-admin?_id='+id,
        method :"GET"
    }).then(function(res){
        console.log('succes');
        console.log(res.data.data);
        $scope.blog=res.data.data;
    },function(err){
        console.log("err");
        console.log(err);
    });
    

    $scope.blogForm = function(data){
        console.log(data);
        $http({
            url :"/admin_api/editBlog-admin?_id="+id,
            method: "PUT",
            data : data
        }).then(function(res){
            console.log("success ");
            console.log(res);
        alert(" Blog Updated  Successfully !")
          $location.path('/dashbord');
        },function(err){
            console.log("error");
            console.log(err);
        })
    }
})