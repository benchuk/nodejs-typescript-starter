# Epsilon Server

# Development

## Install 📀

* 👉 Clone repo

* 👉 Create a new file env config file at:

```
/env/local.env
```

* 👉 Place the following values:

```
ENV_NAME="ENV NAME - LOCAL DEBUG"
DB_URI="mongodb+srv://..........."
```

* 👉 Create a new file env config file at:

```
/env/docker.env
```

* 👉 Place the following values:

```
ENV_NAME="ENV NAME - LOCAL DOCKER DEBUG"
DB_URI="mongodb+srv://..........."
```

* 👉 Install all dependencies and run server

```
npm install
```

-------------------------------------------------

## Build 👷‍♂️ & Run 🏃‍♀️

### --- NPM ---

* 👉 Run Server in watch changes mode

```
npm run monitor
```

* 👉 Build TypeScript files (artifact files under dist folder)

```
npm build
```

* 👉 Run Server without monitor with TypeScript

```
npm run tsrun
```

* 👉 **Production**: Build and Run server (No typescript)

```
npm startProd
```

-------------------------------------------------

### --- Docker ⚓️---

*📒 Compile the code and create a clean javascript local docker image named 👉 **your_custom_name***

```
npm run build_docker
```

*📒 Run Docker locally*

```
npm run start_docker_local_dev
```

### --- Docker compose ---

*👊 Build Ts files & Build docker image & Run docker compose with env file*

```
 npm run start_docker_local_com
```

--------------------------------------------------------------

## 🤓 More docker commands

*📒 Explore the docker content files*

```
 docker run -it epsilon_server sh 
```

* docker run epsilon_server tail -f /dev/null
* docker images
* docker ps
* docker kill <container id>
* docker logs <container id>
* docker image ls
* docker image -a
* docker rmi -f <container id> //delete docker image
* docker system df -v //see image size
* du -sh node_modules //get folder size inside container using sh

--------------------------------------------------------------

[Learn how to create a new server](Howto.txt)
