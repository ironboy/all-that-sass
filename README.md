# all-that-sass
A npm module that watches folders with SCSS files and compiles them into CSS.

### Usage
You will probably need to specify:

* a folder to watch for changes to *scss* files
* a *scss* file that is your input (the main file where you include all your other scss-files)
* a *css* file that is your output

You can also specify whether you want to:

* report compile errors in the console
* report successful compiles in the console

And change the [output style](https://web-design-weekly.com/2014/06/15/different-sass-output-styles/) of your compiled css.

#### Default settings
These are the default settings:
```javascript
{
  watch: './sass',
  input: './sass/style.scss',
  output: './www/style.css',
  reportErrors: true,
  reportCompiles: false,
  outputStyle: 'expanded'
}
```

#### Usage with all settings at default
If you would like to use all the defaults you would simple call  **all-that-sass** like this from your **node.js** app:

```javascript
require('all-that-sass')();
```
to start watching a folder and compiling *scss* to *css*.

#### Usage with your own settings
Most probably you might want to change a few settings. For example, the path to the folder to watch might be *./scss*, the path to the main scss file might be *./scss/main.scss* and you might want to output the compiled scss to the path *./public/style.css*...

In that case you would call **all-that-sass** like this:

```javascript
require('./all-that-sass')({
  watch:  './scss',
  input:  './scss/main.scss',
  output: './public/style.css',
});
```
Happy compiling!
