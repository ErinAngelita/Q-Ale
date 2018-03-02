
# Trivia Night

#### 2/28/18
- Converted files into create-react-app-buildpack structure.
- Pushed to Heroku https://enigmatic-coast-39458.herokuapp.com/
- linked mLabs account to Heroku
- scrapped everything up until this point.... # ILoveLearning

#### 3/1/18
- added Okta Authentication
- Created file structure for components
- having issues with redirects from login and login on heroku
- bear bones css

### 3/2/18
- created our schemas
- wrote routes for our schemas
- tested our route functionality with postman (not working :( specifically POST function for TriviaSchema)






----

# create-react-app with a Node server on Heroku

A minimal example of using a Node backend (server for API, proxy, & routing) with a [React frontend](https://github.com/facebookincubator/create-react-app).

To deploy a frontend-only React app, use the static-site optimized  
▶️ [create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack)

⤵️ [Switching from create-react-app-buildpack](#switching-from-create-react-app-buildpack)?


## Design Points

A combo of two npm projects, the backend server and the frontend UI. So there are two `package.json` configs and thereforce two places to run `npm` commands:

  1. [`package.json`](package.json) for [Node server](server/) & [Heroku deploy](https://devcenter.heroku.com/categories/deployment)
      * `heroku-postbuild` script compiles the webpack bundle during deploy
      * `cacheDirectories` includes `react-ui/node_modules/` to optimize build time
  2. [`react-ui/package.json`](react-ui/package.json) for [React web UI](react-ui/)
      * generated by [create-react-app](https://github.com/facebookincubator/create-react-app)

Includes a minimal [Node Cluster](https://nodejs.org/docs/latest-v8.x/api/cluster.html) [implementation](server/index.js) to parallelize the single-threaded Node process across the available CPU cores.

## Demo

[Demo deployment](https://cra-node.herokuapp.com/): example API call from the React UI is [fetched with a relative URL](react-ui/src/App.js#L16) that is served by an Express handler in the Node server.


## Deploy to Heroku

```bash
git clone https://github.com/mars/heroku-cra-node.git
cd heroku-cra-node/
heroku create
git push heroku master
```

This deployment will automatically:

  * detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
  * build the app with
    * `npm install` for the Node server
    * `heroku-postbuild` for create-react-app
  * launch the web process with `npm start`
    * serves `../react-ui/build/` as static files
    * customize by adding API, proxy, or route handlers/redirectors

⚠️ Using npm 5’s new `package-lock.json`? We resolved a compatibility issue. See [PR](https://github.com/mars/heroku-cra-node/pull/10) for more details.

👓 More about [deploying to Heroku](https://devcenter.heroku.com/categories/deployment).


## Switching from create-react-app-buildpack

If an app was previously deployed with [create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack), then a few steps are required to migrate the app to this architecture:

1. Remove **create-react-app-buildpack** from the app; [heroku/nodejs buildpack](https://devcenter.heroku.com/articles/nodejs-support#activation) will be automatically activated

    ```bash
    heroku buildpacks:clear
    ```
1. Move the root React app files (including dotfiles) into a `react-ui/` subdirectory

    ```bash
    mkdir react-ui
    git mv [!react-ui]* react-ui/
    # You'll see "fatal: Not a git repository"; let's fix that error
    mv react-ui/.git ./
    ```
1. Create a root [`package.json`](package.json), [`server/`](server/), & [`.gitignore`](.gitignore) modeled after the code in this repo
1. Commit and deploy ♻️

    ```bash
    git add -A
    git commit -m 'Migrate from create-react-app-buildpack to Node server'
    git push heroku master
    ```


## Local Development

### Run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```
