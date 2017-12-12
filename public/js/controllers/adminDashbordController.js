app.controller('adminDashbordController',function($scope,$http,$routeParams){
    console.log('adminDashbordController called');
    var id=$routeParams.id
    // console.log("in edit angularjs")

    let page=1;
    $scope.increment=function(){
        if(page >1){
            page =page +1;
        }

    }
    $scope.decrement=function(){
        if(page >1){
            page =page
        }
        
    }

    var refresh=function(){
        $http({
            url:'/admin_api/getBlogs-admin?page=' +page,
            method:'GET'
        }).then(function(res){
           console.log(res.data.data);
             $scope.blogs=res.data.data;
        },function(err){
           console.log(err);
        })
        }//refresh 
   
       refresh();
       
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