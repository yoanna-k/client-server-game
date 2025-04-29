# SEP project group O

## Wie man das Spiel zum Laufen bringt

1. Clone and save the repository
2. Install the dependencies with "npm i"
3. Enter "npm start" to start the server on port 3000
4. Open "http://localhost:3000/" in your browser
5. Read the rules before you enter your name and start the game

Be sure to have [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed.

## Useful commands

- `npm start` to start a dev server on port 3000 (open [http://localhost:3000/](http://localhost:3000/) in your browser)
- `npm run lint` to check for coding style and `npm run lint-fix` to apply automated fixes
- `npm install` to install dependencies
- `npm update` to apply compatible dependency updates (relies on semantic versioning)
- `npm audit` to scan for known vulnerabilities and `npm audit fix` to apply automated fixes

## Repo overview

You're reading this, so you already found the `README.md` file. It is written in [Markdown](https://markdown.de/), a simple but powerful markup language. Its sole purpose is to give you (or anyone who happens to stumble upon your project, really) information about the repository.

The repo uses NPM, the node package manager, for managing dependencies and libraries. The `package.json` file contains some information about the project and specifies dependencies. The `package-lock.json` is an automatically generated file specifying the exact version of deep dependencies (i.e. dependencies of dependencies) installed. Don't edit it by hand, but always commit changes made to it, if your dependencies changed. Dependencies are stored in the `node_modules` directory in the root of the repository. It is quite large and downloaded automatically, which is why it should not be checked in to git. Hence, it is listed in the `.gitignore` file.

The `LICENSE` file contains the popular free- and open-source software license [AGPL version 3](https://choosealicense.com/licenses/agpl-3.0/). You may want to choose a different license if you so desire. Be sure to also change the license string in the `package.json`.

For your convenience, a [linter](https://www.npmjs.com/package/eslint) (that is, a program that enforces a certain code style in your javascript files) is set up in the repository. It is configured in the `.eslintrc.yml` file and can be called upon by running `npm run lint` or `npm run lint-fix`. See the corresponding scripts in the `package.json` to find out what happens under the hood.

The `client` and `server` directories are where it actually starts to get interesting: As you might have guessed it is where your client and server code lives!

The `server/server.js` file is executed in the NodeJS JavaScript runtime by the `npm start` script (see `package.json`). It starts up an [express](https://www.npmjs.com/package/express) server to deliver your html and javascript files (i.e. your client) to a connecting webbrowser. It also listens for websocket calls from those clients through the [socket.io](https://www.npmjs.com/package/socket.io) library. Check out the files content and check out how external dependencies and local files can be included using the `require()` function.

The `client/index.html` file is the file sent to a webbrowser connecting to your server. It includes some html to create a canvas and some welcome text, and then calls a the `client/main.js` script using a `<script>` tag with the source type `module`. Examine that file and pay attention to the use of the `import` statement, which is different from the files you've seen on the server. The html file also requests the socket.io client from the server using another script tag. This allows the `client/main.js` script to use the `io()` function.

That's it! That's all the basics you need (and more) to achieve greatness. Note that this repo is only a suggestion. You can do whatever you want. Heck, you can delete everything in here and start from scratch for all I care :) JavaScript is a rich and diverse ecosystem, which is great if you want to be flexible! But can be intimidating for beginners, so this should help you get things off the ground.

## Next steps

You should definitely check out the [socket.io getting started tutorial](https://socket.io/get-started/chat/) to get acquainted with the library and get a feeling for what it is and is not. Try things out, and use Git for all your experiments to deepen your understanding. Nobody is born a programmer. You need to write (and more importantly: read!) a ton of code, and you'll probably continue learning throughout your entire career (or even, your entire life).

## Useful documentation

- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web): Excellent and detailed documentation on web technology (JavaScript, HTML and CSS)
- [NodeJS](https://nodejs.org/docs/latest/api/): Technical documentation on the JavaScript runtime and its API
- [socket.io server](https://socket.io/docs/server-api/) and [socket.io client](https://socket.io/docs/client-api/) for the websocket library
- [Git](https://git-scm.com/doc): Everything (and a lot more) you ever wanted to know about your favorite source control tool

## Git workflow

This is a suggested (i.e. non-mandatory) workflow for efficient git collaboration in your team.

You'll want to keep your local `master` branch completely in sync with origin, so when you navigate to your local working copy, the first thing you'll do is `git checkout master` and `git pull --rebase` to fetch all the latest commits and apply them to your local tree. Now if you want to implement a new feature, you will create a branch based off the current status of master by going `git checkout -b nameofbranch` (**the branch name should be lowercase and in english**). Then you make your changes. If you want to create a commit, you `git add path/to/files` for all your files you want to stage (or `git add .` to stage everything) and then go `git commit -m "My Commit Message"`. As soon as you have all your commits created, go ahead and `git push origin nameofbranch` to push your branch to gitlab. Then go to the web interface to create the merge request.

Some other useful commands

- `git log` show all the recent commits
- `git checkout .` undo all changes to tracked files
- `git clean -xci` delete all untracked and ignored files
- `git diff` display all changes to tracked files
- `git status` show status information like staged and unstaged changes, deleted files, current branch, etc.
- `git cherry-pick [commit sha]` apply a single commit from another branch to your current branch
