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

                //commandBinder.bind(minder, 'new', $scope)
                $scope.newFile = newFile;
                $scope.importFile = importFile;
                $scope.exportFile = exportFile;
 
                function newFile(){
                    alert("d")
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
                function exportFile() {
                    var exportType = "json";
                    minder.exportData(exportType).then(function(content){
                        switch(exportType){
                            case 'json':
                                console.log("content json:");
                                console.log(content);
                                console.log($.parseJSON(content));
                                break;
                            default:
                                console.log(content);
                                break;
                        }
                        var aLink = document.createElement('a'),
                                evt = document.createEvent("HTMLEvents"),
                                blob = new Blob([content]);
                
                        evt.initEvent("click", false, false);
                        aLink.download = $('#node_text1').text()+'.'+type;
                        aLink.href = URL.createObjectURL(blob);
                        aLink.dispatchEvent(evt);

 
    
                        var savefilemodal = $modal.open({
                            animation: true,
                            templateUrl: 'ui/dialog/savefile/savefile.tpl.html',
                            controller: 'savefile.ctrl',
                            size: 'md',
                            resolve: {
                                data: function() {
                                    return content;
                                }
                            }
                        });

                        savefilemodal.result.then(function(result) {
                            // minder.execCommand('HyperLink', result.url, result.title || '');
                            console.log("openfilemodal res=",result.url) 
                        });
                    });
                }
            }
        }
    }]);



 