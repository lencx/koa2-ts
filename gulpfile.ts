import { Gulpclass, SequenceTask, Task } from 'gulpclass'
import * as gulp from 'gulp'
import * as ts from 'gulp-typescript'
import * as browserSync from 'browser-sync'

import { config } from './src/config/config'
const tsProject = ts.createProject('tsconfig.json')

@Gulpclass()
export class Gulpfile {
    @Task('ts')
    private ts() {
        return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({
                stream: true,
            }))
    }

    @Task('browserSync')
    private browserSync() {
        browserSync.init({
            proxy: `${config.host}:${config.port}`,
            files: ['/src/**/*.*'],
            browser: 'google chrome',
            port: config.port,
        })
        gulp.watch('src/**/*', browserSync.reload)
    }

    // this special annotation using "run-sequence" module to run returned tasks in sequence
    @SequenceTask('build')
    private build() {
        return ['ts', 'browserSync']
    }

    @Task('default', ['build'])
    private defaultTask() {
        // using "defaultTask", because "default" is a reserved keyword in ES2015
    }
}
