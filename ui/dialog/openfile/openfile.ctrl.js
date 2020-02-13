angular.module('kityminderEditor')
    .controller('openfile.ctrl', ['$http', '$scope', '$modalInstance', 'image', 'server', function($http, $scope, $modalInstance, image, server) {

        $scope.data = {
            list: [],
            url: image.url || '',
            title: image.title || '',
            R_URL: /^https?\:\/\/\w+/
        };

        // setTimeout(function() {
        //     var $imageUrl = $('#image-url');
        //     $imageUrl.focus();
        //     $imageUrl[0].setSelectionRange(0, $scope.data.url.length);
        // }, 300); 
 
 

        //https://www.jianshu.com/p/9b53499d9031
        // 自动上传图片，后端需要直接返回图片 URL
        $scope.uploadImage = function(ele) {
            var fileInput = $('#upload-image');
            if (!fileInput.val()) {
                return;
            }
            var files = ele.files; 

            var file = files[0]
           // var file = fileInput.val().toLocaleLowerCase()
            
            // textType = /(md|km)/,
            var fileType = file.name.substr(file.name.lastIndexOf('.')+1); 
            alert(file.name)
            switch(fileType){
                case 'md':
                    fileType = 'markdown';
                    break;
                case 'km':
                case 'json':
                    fileType = 'json';
                    break;
                default:
                    console.log("File not supported!");
                    alert('只支持.km、.md、.json文件');
                    return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var content = reader.result;
                alert(content)
                editor.minder.importData(fileType, content).then(function(data){
                    $(fileInput).val('');
                });
            }
            reader.readAsText(file);


            // if (/^.*\.(km|txt|json|jpg|jpeg|gif|png)$/.test(fileInput.val().toLocaleLowerCase())) {
            //     var file = fileInput[0].files[0];
            //     return server.uploadImage(file).then(function (json) {
            //         var resp = json.data;
            //         if (resp.errno === 0) {
            //             $scope.data.url = resp.data.url;
            //         }
            //     });
            // } else {
            //     alert("后缀只能是 jpg、gif 及 png");
            // }
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