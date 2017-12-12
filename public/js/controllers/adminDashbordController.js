app.controller('adminDashbordController',function($scope,$log,$http,$routeParams,$location){
    console.log('adminDashbordController called');
    var id=$routeParams.id
    let page=$scope.currentPage?$scope.currentPage.page:1;
   
    //te get list
    var refresh=function(page){
        console.log("page in refresh",page)
        $http({
            url:'/admin_api/getBlogs-admin?page=' +page,
            method:'GET'
        }).then(function(res){
        //    console.log(res.data.data);
             $scope.blogs=res.data.data[0];
             $scope.totalItems=res.data.data[1];
            
             console.log("currentpage",$scope.currentPage)
        },function(err){
           console.log(err);
        })
    }//refresh 
   
       refresh(1);//intial call

        $scope.pageChanged = function() {
            refresh($scope.currentPage);    
         };
       
       $scope.deleteBlog = function(id){
           console.log(id);
            if( confirm("Are you  sure ?")){
                $http({
                    url:'/admin_api/deleteBlog-admin?_id='+id,
                    method:'PUT'
                }).then(function(res){
                console.log(res);
                    //  $scope.blogs=res.data.data;
                    refresh();
        
                },function(err){
                console.log(err);
                })
            }//delteBlog()
    }       
       
   
    
});//adminDashbordController