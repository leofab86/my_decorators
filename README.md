my_decorators v1.2.2

Latest Update: Added immutable stateTrackerNative logging

Description: Build custom HOCs, wire them up to the decorators.js controller and control / import them from one npm package.


Instructions:
* import setConfig into your project before you render your highest level component, such as Redux' Provider or the React-Router component.
* use setConfig to setup the my_decorators config (you can turn on / off decorators, change their config, its up to how you designed the HOCs)
* import myDecoratorsConfig anywhere you need to control your decorators with the config
* import decorators in any of your components and apply them above the component class or by passing the functional component as a parameter to the decorator function:

Example:


ToDo:
* create option for stateTracker to only be a log button instead of rendering the state
* Write a better README





Updating the package:

When you make changes, you can update the package using npm version <update_type>, where update_type is one of the semantic versioning release types, patch, minor, or major. This command will change the version number in package.json. Note that this will also add a tag with this release number to your git repository if you have one.

After updating the version number, you can npm publish again.
