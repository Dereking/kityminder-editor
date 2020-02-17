angular.module('kityminderEditor')
    .controller('savefile.ctrl', ['$http', '$scope', '$modalInstance', 'data', 'server', function($http, $scope, $modalInstance, data, server) {
        
        var filereg = '[\\\\/:*?\"<>|]';
        $scope.R_FILENAME = new RegExp(filereg, 'i');

        $scope.filetype  =data.filetype || 'km';
        $scope.fileName  =data.fileName || 'unamed';
      // $scope.filetype  =  'km';
       //$scope.fileName  = 'unamed';
 
        // setTimeout(function() {
        //     var $imageUrl = $('#image-url');
        //     $imageUrl.focus();
        //     $imageUrl[0].setSelectionRange(0, $scope.data.url.length);
        // }, 300); 
 
   
        $scope.onSelectFileType = function(ft) { 
            $scope.filetype = ft   
            console.log(ft)
            console.log($scope)
        };

        $scope.shortCut = function(e) {
            e.stopPropagation();

            if (e.keyCode == 13) {
                $scope.ok();
            } else if (e.keyCode == 27) {
                $scope.cancel();
            }
        };

        $scope.onFilenameBlur=function(){
            $scope.filenamePassed =  ! $scope.R_FILENAME.test($scope.fileName) 
        };
        $scope.ok = function () {
            // if($scope.data.R_URL.test($scope.data.url)) {
            //     $modalInstance.close({
            //         url: $scope.data.url,
            //         title: $scope.data.title
            //     });
            // } else {
            //     $scope.urlPassed = false; 
            //     var $imageUrl = $('#image-url');
            //     if ($imageUrl) {
            //         $imageUrl.focus();
            //         $imageUrl[0].setSelectionRange(0, $scope.data.url.length);
            //     }
            // }
            //editor.receiver.selectAll();
            if(!$scope.R_FILENAME.test($scope.fileName)) {
                $scope.filenamePassed = false;
                $modalInstance.close({
                    filetype: $scope.filetype, 
                    fileName: $scope.fileName, 
                });
            } else {
                $scope.filenamePassed = false; 
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            editor.receiver.selectAll();
        };
 
}]);