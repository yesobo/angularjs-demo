angular.module('components', []).
    //directive is used to defined new html tags
    directive('tabs', function() {
        return {
            restrict: 'E', // defines tabs as an html component
            transclude: true, // angular replaces <tabs> for the ng-transclude defined below
            scope: {}, // we can declare attributes here
            controller: function($scope, $element) {
                var panes = $scope. panes = [];
                
                // publish a select method for to be used in our view
                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };
                
                this.addPane = function(pane) {
                    if (panes.length === 0) $scope.select(pane);
                    panes.push(pane);
                };
            },
            template: 
                '<div class="tabbable">' +
                    '<ul class="nav nav-tabs">' +
                        '<li ng-repeat="pane in panes" ng-class="{active: pane.selected}">' +
                            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
                        '</li>' +
                    '</ul>' +
                    '<div class="tab-content" ng-transclude></div>' +
                '</div>',
            replace: true // replaces the tabs panel rather with the template than appending to it    
        };
    }).
    directive('pane', function() {
       return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: {title: '@'},
            link: function(scope, element, attrs, tabsCtrl) { // we pass the tabs controller as a parameter to call the addPane function
                tabsCtrl.addPane(scope);
            },
            template:
                '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
                '</div>',
            replace: true
       }; 
    });