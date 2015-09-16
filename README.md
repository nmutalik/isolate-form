# isolate-form

An Angular directive for nested forms that prevents `$invalid` from propagating, allowing a nested form to be invalid without affecting its parent's validity.
 
Code originally written by [91K00](https://github.com/91K00), as seen [here](http://stackoverflow.com/questions/19333544/skip-nested-forms-validation-with-angularjs/24936234#24936234) and [here](https://github.com/angular/angular.js/issues/5858#issuecomment-50026221).
 
 **Usage:**

~~~html
 <form name="parent">
    <input type="text" ng-model="outside"/>
    <ng-form name="subform" isolate-form>
        <input type="text" ng-model="inside"/>
    </ng-form>
</form>
 
~~~

**Example:** [http://jsfiddle.net/gikoo/qNrFX/](http://jsfiddle.net/gikoo/qNrFX/)