## Moviebase
Team members: Brigite Kerge, Häli Hinno
### Project description
Movie recommendation site. The visitor can get suggestions based on their answers to some questions. They can also sort movies based on categories etc and find information about the movies. It's possible to create a user where they can add ratings to movies and then get recommendations based on this data. Additionally users can create a watchlist.
### Technologies used     
Docker Desktop  
NPM
## Project setup
Clone frontend repository:  
```
git clone https://gitlab.cs.ttu.ee/hahinn/iti0302-2022-webproject-frontend.git
```
```
npm install -g @vue/cli -> npm install
```
```
npm install pinia
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Compile docker image
```
docker build -t ${tag_name} .
```
## Server
In the directory where the docker-compose.yml is run the command
```
docker-compose up
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
