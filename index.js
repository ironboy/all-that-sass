class SassCompiler {

  constructor(config = {}){

    // default values - can be overridden with config
    const defaults = {
      watch: './sass',
      input: './sass/style.scss',
      output: './www/style.css',
      reportErrors: true,
      reportCompiles: false,
      outputStyle: 'expanded',
      // not options you would usually change
      chokidarOptions: {ignored: /(^|[\/\\])\../},
      lastCompileTime: 0
    };

    // modules to require
    const modules = {
      fs: require('fs'),
      chokidar: require('chokidar'),
      sass: require('node-sass')
    }

    // transfer defaults, config and modules to "this"
    Object.assign(this, defaults, config, modules); 

    // compile on file changes
    this.chokidar.watch(
      this.watch, this.chokidarOptions,
    ).on('all', () => {
      // only compile if more than 100 ms since last
      if(Date.now() - this.lastCompileTime > 100){
        this.lastCompileTime = Date.now();
        this.compile();
      }
    });

  }

  compile(){
    // compile to sass and write to disk
    // if no error, otherwise output errors
    this.sass.render({
      file: this.input, 
      outputStyle: this.outputStyle
    }, (error, result) => {
      if(error){
        this.reportErrors && console.warn('SASS ' + error.formatted);
      }
      else {
        this.fs.writeFileSync(this.output, result.css, 'utf-8');
        this.reportCompiles && console.log('SASS: Compiled successfully to ' + this.output);
      }
    });
  }

}

module.exports = (config) => new SassCompiler(config);