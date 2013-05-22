// This is a module for cloud persistance in mongolab - https://mongolab.com
// It depends on AngularJS ngResource module, provides an interface for RESTful services
angular.module('mongolab', ['ngResource']).
    // uses module.factory to define the new service of the Project class (dao/model)
    factory('Project', function($resource) {
        // injects the service anywhere in the application where is needed
        var Project = $resource('https://api.mongolab.com/api/1/databases' +
            '/angularjs/collections/projects/:id',
            { apiKey: '4f847ad3e4b08a2eed5f3b54' }, 
            { update: { method: 'PUT' } }
        );
    
        // extends the resource class with specific methods of our app
        Project.prototype.update = function(cb) {
            return Project.update( {id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };
        Project.prototype.destroy = function(cb) {
            return Project.remove({id: this._id.$oid}, cb);
        };
 
        return Project;
    });