/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';

const $ = gulpLoadPlugins();


// Optimize images
gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
);

// Convert images to WebP
gulp.task('webp', () => {
  return gulp.src('app/images/**/*')
    .pipe($.webp({
      quality: 85
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'webp'}));
});

// Clean cache
gulp.task('cleanCache', () => {
  return $.cache.clearAll();
});


// Clean output directory
gulp.task('clean', cb => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    ['cleanCache'],
    // 'webp',
    cb
  )
);


// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
