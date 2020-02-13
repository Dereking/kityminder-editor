angular.module('kityminderEditor')
    .controller('openfile.ctrl', ['$http', '$scope', '$modalInstance', 'data', 'server', function($http, $scope, $modalInstance, data, server) {

        $scope.data = { 
            filetype: data.filetype || '',
            title: filetype.title || '', 
        };

        // setTimeout(function() {
        //     var $imageUrl = $('#image-url');
        //     $imageUrl.focus();
        //     $imageUrl[0].setSelectionRange(0, $scope.data.url.length);
        // }, 300); 
   
        $scope.onSelectFileType = function(filetype) { 
            switch(filetype){
                case 'md':
                    fileType = 'markdown';
                    break;
                case 'km':
                case 'json':
                    fileType = 'json';
                    break;
                default:
                    console.log("File not supported!"); 
                    return;
            } 
            
            $('#filetype').val(filetype);
        };

        $scope.shortCut = function(e) {
            e.stopPropagation();

            if (e.keyCode == 13) {
                $scope.ok();
            } else if (e.keyCode == 27) {
                $scope.cancel();
            }
        };

        $scope.ok = function () {
            if($scope.data.R_URL.test($scope.data.url)) {
                $modalInstance.close({
                    url: $scope.data.url,
                    title: $scope.data.title
                });
            } else {
                $scope.urlPassed = false;

                var $imageUrl = $('#image-url');
                if ($imageUrl) {
                    $imageUrl.focus();
                    $imageUrl[0].setSelectionRange(0, $scope.data.url.length);
                }

            }

            editor.receiver.selectAll();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            editor.receiver.selectAll();
        };
 
}]);