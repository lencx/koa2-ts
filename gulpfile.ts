import { Gulpclass, SequenceTask, Task } from 'gulpclass'
import * as gulp from 'gulp'
import * as ts from 'gulp-typescript'
import * as browserSync from 'browser-sync'

import * as config from 'config'
const tsProject = ts.createProject('tsconfig.json')
const createBrowserSync = browserSync.create()
const reload = createBrowserSync.reload

@Gulpclass()
export class Gulpfile {
    @Task()
    private ts() {
        return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest('dist'))
            .pipe(reload({
                stream: true,
            }))
    }

    @Task()
    private browserSync() {
        createBrowserSync.init({
            proxy: `${config.get('host')}:${config.get('port')}`,
            files: ['/src/**/*.*'],
            browser: 'google chrome',
            port: config.get('port'),
        })
        gulp.watch('src/**/*').on('change', reload)
    }

    // this special annotation using "run-sequence" module to run returned tasks in sequence
    @SequenceTask()
    private build() {
        return ['ts', 'browserSync']
    }

    @Task('default', ['build'])
    private defaultTask() {
        // using "defaultTask", because "default" is a reserved keyword in ES2015
    }
}
