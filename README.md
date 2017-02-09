# Angular Checkpoint

## Logistics

- This test was designed to be difficult to finish. Get through as much as you can, and if you get stuck on any spec, try moving on – they're not all cumulative.
- You may refer to online resources or notes, but *not* any previous code you've written, nor the study guide, nor may you copy/paste from outside resources.
- There are three extra credit possibilities:
    * The `ng-enter` directive (last spec); `x`'d out to start.
    * The "cached" `Todo` factory; `x`'d out to start.
    * Ensuring that your app is actually entirely functional (see below).

## Getting started

- **Fork** this repo then clone your fork locally.
- `npm install`
- `npm test` (which starts up testem)
- Open up [localhost:7357](http://localhost:7357) to view the full HTML report.
- Start going through the specs.
- The specs are mostly isolated, meaning that one file does not depend on another; if you get stuck, try other specs. The exception is that `todo.list.state.js` must work before any other `state.js` will pass, and any spec about transitioning to a state will only pass if the corresponding `state` passes.
- You should only need to edit the following files. They are listed here in the order we recommend you tackle them, which is the same order they appear in the test report:
	- browser/app/todos/todo.factory.js
	- browser/app/todos/list/todo.list.controller.js
	- browser/app/todos/list/todo.list.state.js
	- browser/app/todos/item/todo.item.directive.js
	- browser/app/todos/item/todo.item.controller.js
	- browser/app/todos/detail/todo.detail.controller.js
	- browser/app/todos/detail/todo.detail.state.js
	- browser/app/todos/edit/todo.edit.controller.js
	- browser/app/todos/edit/todo.edit.state.js
	- browser/utils/ng-enter.directive.js

## Submitting

- `git add -A`
- `git commit -m "Submission for deadline"`
- `git push origin master`

## Things you should be aware of

- For your code, there will be a frontend global `app` which represents the angular module.
- For the directives, there are two global variables being assigned inline. This is not normal directive syntax, but is used here to make testing simpler.
- All of the html is already there, and if you want context for the various contoller methods etc you are building, it could be a good idea to go check out how it is being used in the html.
- You can run `npm start` to fire up a server. Use this if you want to get a sense of what your app actually looks and feels like as you're passing the specs. If so, you can also seed the database with `npm run seed`.
- We think you're swell, so try to just relax and do the best you can.

< g o o d  l u c k 3
