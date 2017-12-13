// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('angular'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.angular);
    }
}(typeof self !== 'undefined' ? self : this, function(angular) {
    return angular.module('isolateForm', []).directive('isolateForm', [function() {
        return {
            restrict: 'A',
            require: '?form',
            link: function(scope, elm, attrs, ctrl) {
                if (!ctrl) {
                    return;
                }

                // Do a copy of the controller
                var ctrlCopy = {};
                angular.copy(ctrl, ctrlCopy);

                // Get the parent of the form
                var parent = elm.parent().controller('form');
                // Remove parent link to the controller
                parent.$removeControl(ctrl);

                // Replace form controller with a "isolated form"
                var isolatedFormCtrl = {
                    $setValidity: function(validationToken, isValid, control) {
                        ctrlCopy.$setValidity(validationToken, isValid, control);
                        parent.$setValidity(validationToken, true, ctrl);
                    },
                    $setDirty: function() {
                        elm.removeClass('ng-pristine').addClass('ng-dirty');
                        ctrl.$dirty = true;
                        ctrl.$pristine = false;
                    }
                };
            angular.extend(ctrl, isolatedFormCtrl);
            }
        };
    }]).name;
}));
