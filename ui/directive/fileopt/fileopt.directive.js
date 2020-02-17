angular.module('kityminderEditor') 
    .directive('fileopt', ['$modal', function($modal) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/fileopt/fileopt.html',
            scope: {
                minder: '='
            },
            replace: true, 
            link: function($scope) {
                var minder = $scope.minder;

                $scope.saveModalData = {
                    filetype : "km",
                    fileName : "unamed",
                }

                //commandBinder.bind(minder, 'new', $scope)
                $scope.newFile = newFile;
                $scope.openFile = openFile;
                $scope.importFile = importFile;
                $scope.saveFile = saveFile;
                $scope.saveAsFile = saveAsFile;
                $scope.exportFile = exportFile;
 
                function newFile(){
                    alert("d")
                }

                function openFile() { 

                }

                function importFile() { 
                    // var link = minder.queryCommandValue('HyperLink');
                    var link="testlink"
 
                     var openfilemodal = $modal.open({
                         animation: true,
                         templateUrl: 'ui/dialog/openfile/openfile.tpl.html',
                         controller: 'openfile.ctrl',
                         size: 'md',
                         resolve: {
                             image: function() {
                                 return link;
                             }
                         }
                     });
 
                     openfilemodal.result.then(function(result) {
                        // minder.execCommand('HyperLink', result.url, result.title || '');
                        console.log("openfilemodal res=",result.url) 
                     });
 
                }

                function saveFile(){
                    alert("save") 
                }
                function saveAsFile() {
                }

                function exportFile() {
                    var savefilemodal = $modal.open({
                        animation: true,
                        templateUrl: 'ui/dialog/savefile/savefile.tpl.html',
                        controller: 'savefile.ctrl',
                        size: 'md',
                        resolve: {
                            data: function() {
                                return $scope.saveModalData
                            }
                        }
                    });

                    savefilemodal.result.then(function(result) { 
                            var exportType = result.filetype || "json";
                            console.log(exportType, result);
                            minder.exportData(exportType).then(function(content){ 
                                switch(exportType){
                                    case 'json':
                                        console.log("content json:");
                                        console.log(content);
                                        console.log($.parseJSON(content));
                                        break;
                                    default:
                                        console.log("content default:");
                                        console.log(content);
                                        break;
                                }

        
                                // blobOptions = {
                                //     type: 'text/csv',
                                //     endings: 'native' // or transparent
                                // };
                                var blobOptions =  {};
                        
                                var blob = new Blob([content], blobOptions);
                                var a = document.createElement('a');
                                a.innerHTML = result.fileName + "."+  result.filetype;
                        
                                // 指定生成的文件名
                                a.download = result.fileName + "."+  result.filetype;
                                a.href = URL.createObjectURL(blob);
                        
                                document.body.appendChild(a);
                        
                                var evt = document.createEvent("MouseEvents");
                                evt.initEvent("click", false, false);
                        
                                a.dispatchEvent(evt);
                        
                                document.body.removeChild(a); 
                            
                            console.log("savefilemodal res=",result.filetype) 
                        });
                    });
                }
            }
        }
    }]);



 