<h1 align="center">ShortURL: A URL Shortening service 🔗</h1>
<p align = center>
    <img alt="Project Logo" src="https://raw.githubusercontent.com/muKaustav/Taskwrite-Appwrite-Hacktoberfest-2021/main/assets/thumbnail_taskwritepsd.jpg" target="_blank" />
</p>
<h2 align='center'>A distributed and highly available URL Shortener built on MERN stack, using Apache Zookeeper, cached using Redis, and containerized by Docker.</h2><br/>

## 📚 | Introduction

- This is a demo application of a URL Shortener following the guidelines of efficient System Design.
- This is a project demonstrating the entire development process and is meant to be run in a local enviroment. 
- There are namely 5 container images, all of which are hosted on Docker Hub: 
```yaml
- Server : 
- Client :
- Redis :
- Apache Zookeeper :
- Nginx :
```

<br/>

## 🚀 | Usage

- Install Docker Desktop.
- Clone this repository:<br>

```sh
git clone https://github.com/muKaustav/ShortURL.git
```
- Create a .env file with the following variables:

```js
REACT_APP_MONGODB_URI="<enter your MongoDB URI>"
REACT_APP_REDIS_PORT=1111 (defaults to 6379)
REACT_APP_REDIS_HOST='redis-server' (name it as you like, but change the same in the docker-compose.yml file)
```
- Open the project folder and start the container:<br>

```yml
docker compose up --build

# We can also scale instances of an image for higher scalability or distribution.
Example: docker compose up --build --scale node-server=3
```
- Enjoy the project! 😉

<br/>

## 📘 | System Design Schematic

<p align = center>
    <img alt="Project Logo" src="https://raw.githubusercontent.com/muKaustav/Taskwrite-Appwrite-Hacktoberfest-2021/main/assets/googlelogin.png" target="_blank" />
</p>

<br/>

## 📷 | Screenshots

<p align = center>
    <img alt="Project Logo" src="https://raw.githubusercontent.com/muKaustav/Taskwrite-Appwrite-Hacktoberfest-2021/main/assets/googlelogin.png" target="_blank" />
    <img alt="Project Logo" src="https://raw.githubusercontent.com/muKaustav/Taskwrite-Appwrite-Hacktoberfest-2021/main/assets/home.png" target="_blank" />
    <img alt="Project Logo" src="https://raw.githubusercontent.com/muKaustav/Taskwrite-Appwrite-Hacktoberfest-2021/main/assets/editDeleteTask.png" target="_blank" />
</p>

<br/>

## 🍻 | Contributing

Contributions, issues and feature requests are welcome.<br>
Feel free to check [issues page](https://github.com/muKaustav/Taskwrite-Appwrite-Hacktoberfest-2021/issues) if you want to contribute.

<br/>

## 🧑🏽 | Author

**Kaustav Mukhopadhyay**

- Linkedin: [@kaustavmukhopadhyay](https://www.linkedin.com/in/kaustavmukhopadhyay/)
- Github: [@muKaustav](https://github.com/muKaustav)

<br/>

## 🙌 | Show your support

Drop a ⭐️ if this project helped you!

<br/>

## 📝 | License

Copyright © 2021 [Kaustav Mukhopadhyay](https://github.com/muKaustav).<br />
This project is [MIT](./LICENSE) licensed.

---
