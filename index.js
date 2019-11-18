class SassCompiler {

  constructor(config = {}) {

    // default values - can be overridden with config
    const defaults = {
      watch: './sass',
      input: './sass/style.scss',
      output: './www/style.css',
      reportErrors: true,
      reportCompiles: false,
      outputStyle: 'expanded',
      // not options you would usually change
      chokidarOptions: { ignored: /(^|[\/\\])\../ }
    };

    // modules to require
    const modules = [
      'fs', 'path', 'chokidar', 'node-sass|sass', 'chalk'
    ].map((x) => this[x.split('|').pop()] =
      require(x.split('|').shift()));


    // transfer defaults, config and modules to "this"
    Object.assign(this, defaults, config, modules);

    // correct absolute paths
    let basePath = this.path.dirname(process.mainModule.filename);
    'watch input output'.split(' ').forEach(x =>
      this[x] = this.path.resolve(basePath, this[x])
    );

    // compile on file changes
    this.chokidar.watch(
      this.watch, this.chokidarOptions,
    ).on('all', () => {
      // throttle with 200 ms since chokidar triggers
      // multiple times (mostly at start up)
      clearTimeout(this.compileTimeout);
      this.compileTimeout = setTimeout(() => this.compile(), 200);
    });

  }

  compile() {
    // compile to sass and write to disk
    // if no error, otherwise output errors
    let startTime = Date.now();
    this.sass.render({
      file: this.input,
      outputStyle: this.outputStyle
    }, (error, result) => {
      if (error) {
        this.reportErrors && console.warn(this.chalk.red(
          `\x1b[31mSASS\n${error.formatted}`
        ));
      }
      else {
        this.fs.writeFileSync(this.output, result.css, 'utf-8');
        this.reportCompiles && console.log(this.chalk.blue(
          `SASS: Compiled successfully to ${this.output}` +
          `\nTime taken: ${Date.now() - startTime} ms\n`
        ));
      }
    });
  }

}

// Export as factory
module.exports = (config) => new SassCompiler(config);