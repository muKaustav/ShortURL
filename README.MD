<h1 align="center">ShortURL: A URL Shortening service 🔗</h1>
<p align = center>
    <img alt="Project Logo" src="https://raw.githubusercontent.com/muKaustav/Taskwrite-Appwrite-Hacktoberfest-2021/main/assets/thumbnail_taskwritepsd.jpg" target="_blank" />
</p>
<h2 align='center'>A distributed and highly available URL Shortener.</h2><br/>

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

- Install Docker Desktop and enable Kubernetes for a quick setup.
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
- Open the project folder and start the container with docker compose:<br>

```yml
docker compose up --build

# We can also scale instances of an image for higher scalability or distribution.
Example: docker compose up --build --scale node-server=3
```
- Or use Kubernetes as a container orchestrator:<br>

```yml
kubectl apply -f k8s/
```
- Enjoy the project! 😉

<br/>

## 📺 | Demonstration

<p align = center>
    
![trim](https://user-images.githubusercontent.com/50882624/154680953-a41c84e3-6512-4fdf-8b3c-b8856f3c5842.gif)

</p>

<br/>

## 📘 | System Design Schematic

<p align = center>
    <img alt="getURL" src="https://raw.githubusercontent.com/muKaustav/ShortURL/master/client/src/assets/images/getURL.png" target="_blank" />
    <img alt="redirect" src="https://raw.githubusercontent.com/muKaustav/ShortURL/master/client/src/assets/images/redirect.png" target="_blank" />
</p>

<br/>

## ⌛ | Areas to Improve

- A seperate database for storing user info can be implemented for analytics that adds to the business value of the application. (I didn't implement this as I am not sure if it is necessary for the context of this project)
- The application can be made more robust by adding more checks to the validation of the URLs.

<br/>

## 💻 | References

- [TinyURL System Design](https://www.codekarle.com/system-design/TinyUrl-system-design.html)
- [System Design : Scalable URL shortener service like TinyURL](https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82)
- [Redis Documentation](https://redis.io/documentation)
- [Apache Zookeeper Documentation](https://zookeeper.apache.org/doc/r3.7.0/index.html)
- [Nginx HTTP Load Balancing Documentation](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- [Docker Documentation](https://docs.docker.com/language/nodejs/)
- [Kompose Documentation](https://kompose.io/user-guide/)

<br/>

## 🍻 | Contributing

Contributions, issues and feature requests are welcome.<br>
Feel free to check [issues page](https://github.com/muKaustav/ShortURL/issues) if you want to contribute.

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
