<h1 align="center">ShortURL: A URL Shortening service 🔗</h1>
<p align = center>
    <img alt="Project Logo" src="https://raw.githubusercontent.com/muKaustav/ShortURL/master/client/src/assets/images/shorurl.jpg" target="_blank" />
</p>
<h2 align='center'>A distributed and highly available URL Shortener.</h2><br/>

## 📚 | Introduction

- ShortURL is a distributed and highly available URL Shortening service, built on the MERN stack.
- It uses Redis as a cache, and MongoDB as a NoSQL database.
- It uses Nginx that acts as a load balancer, and a reverse proxy for the backend server.
- It uses Apache ZooKeeper to provide tokens for hash generation, and eliminates race conditions between nodes.
- The entire application is containerized by Docker, and orchestrated by k8s.

### _**Disclaimer**_

- This is a demo application of a URL Shortener following the guidelines of efficient System Design.
- This is a project demonstrating the entire development process and is meant to be run in a local environment.

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

## 🌐 | API Endpoints

```yml
GET:
    /url/:identifier : Get the shortened URL from DB
    /del : Delete the Zookeeper token
POST:
    /url [body : {"OriginalUrl" : "url"}] : Shorten the URL and store in DB


Access the API using the following URLs:
    Client: http://localhost:3000/
    Load Balanced Server: http://localhost:4000/
```

## 📺 | Demonstration

<p align = center>
    
![trim](https://user-images.githubusercontent.com/50882624/154680953-a41c84e3-6512-4fdf-8b3c-b8856f3c5842.gif)

</p>

<br/>

## 📘 | System Design Schematic

<p align = center>
    <img alt="getURL" src="https://raw.githubusercontent.com/muKaustav/ShortURL/master/client/src/assets/images/getURLs.png" target="_blank" />
    <img alt="redirect" src="https://raw.githubusercontent.com/muKaustav/ShortURL/master/client/src/assets/images/redirect.png" target="_blank" />
</p>

<br/>

## ⌛ | Architectural Discussion

- The _**availability**_ of the application can be improved by using multiple Zookeeper instances, replicas of the DB, and a distributed cache, thus increasing the fault tolerance of the architecture.
- Adding load balancers in between the following improves the performance of the application, and reduces the load on any particular instance:
  - client and server
  - server and DB
  - server and cache
- _**CAP Theorem**_:
  - We opt for an _**eventually consistent approach**_, as in case of a network partition, a URL Shortener should have low latency and high throughput at all times. <br/>
  - Redirection of the user to the original URL should always have low latency as it directly impacts the business aspect of the application.
  - We don't opt for a _**strongly consistent approach**_, as we would have to wait for the data to be replicated across the cluster, which decreases the availability and increases the latency of the application, thus impacting the user experience negatively.

<br/>

## 💻 | References

- [TinyURL System Design](https://www.codekarle.com/system-design/TinyUrl-system-design.html)
- [System Design : Scalable URL shortener service like TinyURL](https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82)
- [An Illustrated Proof of the CAP Theorem](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)
- [What is eventual consistency and why should you care about it?](https://www.keboola.com/blog/eventual-consistency)
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
