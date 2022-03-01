<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![mongodb-shield]][mongodb-url]
[![express-shield]][express-url]
[![nodejs-shield]][nodejs-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="https://media.giphy.com/media/3o6Zt9QE8E7ysYxCpy/giphy.gif" width="450" height="350"/>
  </a>

  <h1 align="center">Voluntera</h3>

  <p align="center">
    Volunteering made simple
    <br />

  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#demo">Demo Links</a></li>
        <li><a href="#Screenshots">Screenshots</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#team">Team</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Voluntera is a platform where social organizations can publish their volunteering projects or events. Users with verified profiles can request to participate in these events to help the organizations and actualize the events successfully. In this way, there is less cost for non-profit organizations thanks to volunteer support received. 
Since not every (non governmental organization has the resources to do & scale their projects, this platform could be the bridge connecting people who have free time and want to do something impactful with organizations who need support. 

## Features

- List projects
- List posts
- CRUD operations for projects 
- CRUD operations for posts
- CRUD operations for users
- Comments on posts
- Comments on comments (threads)
- Filter projects by owner and/or location
- Filter posts by owner and/or title
- Register/Login (Google,Classic)

### Built With

* [![mongodb-shield]][mongodb-url]
* [![express-shield]][express-url]
* [![nodejs-shield]][nodejs-url]

### Demo

* Server (backend) link: (https://example.com)

# Screenshots

### Database Diagram

![Database](https://i.ibb.co/L8952nZ/2022-02-24-11-43-43-PM.jpg)

### System Design Flowchart
![System](https://i.ibb.co/SXgFFqk/2022-02-26-1-07-16-AM.jpg)

### OpenAPI Docs
![Docs](https://i.ibb.co/qs0FYQZ/2022-02-26-1-14-08-AM.jpg)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* git
  ```sh
  if (you have brew installed ) {
    use this command => 'brew install git'
  } else {
    download the installer from the official website => https://git-scm.com/downloads
  }
  ```

* node
  ```sh
  if (you have brew installed) {
    use this command => 'brew install node'
  } else {
    download the installer from the official website => https://nodejs.org/en/
  }
  ```
What is brew ?? (See: <a href="https://en.wikipedia.org/wiki/Homebrew_(package_manager)" target="_blank">Homebrew Package Manager</a>)

### Installation

```
main branch for server side (node)
```
1. Clone the repo
   ```sh
   git clone git@github.com:RCDD-202110-TUR-BEW/backend-capstone-turkey-voluntera.git
   ```
2. Install npm packages on both branches 
   ```sh
   cd backend-capstone-turkey-voluntera
   ```
   ```sh
   on main branch
   'yarn / npm install'
   ```
3. Create environment variables
  ```sh
  if (you will serve on localhost) {
    on main directory create a copy of .env.example and rename to .env file 
    then change the constants to your own env strings
    ```
    SECRET_KEY: 'some very secret key'
    ```
  } else if (you will use some SaaS hosting services like heroku, netlify etc){
    use process.ENV configuration depends on your server
  }
  ```
4. You are good to go
  ```sh
  on main directory => 
  if (you need to watch changes) {
    'yarn dev / npm run dev'
  } else {
    'yarn start / npm run start'
  }
  ```



## Team

Meet our team members

<img alt="amr" src="https://i.ibb.co/x8zhnyK/2022-02-25-1-00-17-AM.jpg" width="815"><br>



<!-- ROADMAP -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/newFeature`)
3. Commit your Changes (`git commit -m 'Add some newFeature'`)
4. Push to the Branch (`git push origin feature/newFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Voluntera Team
* Email: voluntera@voluntera.com



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [![google-shield]][google-url]
* [![stackoverflow-shield]][stackoverflow-url]





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[freecodecamp-shield]: https://img.shields.io/badge/-freecodecamp-black?style=flat-square&logo=freecodecamp
[freecodecamp-url]: https://www.freecodecamp.org/
[google-shield]: https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white
[google-url]: https://www.google.com/
[stackoverflow-shield]: https://img.shields.io/badge/-stackoverflow-E34F26?style=for-the-badge&logo=stackoverflow&logoColor=white
[stackoverflow-url]: https://www.stackoverflow.com/
[html-shield]: https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white
[html-url]: https://en.wikipedia.org/wiki/HTML
[css-shield]: https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3
[css-url]: https://en.wikipedia.org/wiki/CSS
[nodejs-shield]: https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js
[nodejs-url]: https://nodejs.org/en/
[mongodb-shield]: https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb
[mongodb-url]: https://www.mongodb.com/
[express-shield]: https://img.shields.io/badge/-express-black.svg?style=flat-square&logo=express
[express-url]: https://expressjs.com/
[git-shield]: https://img.shields.io/badge/-Git-black?style=flat-square&logo=git
[git-url]: https://git-scm.com/
[github-shield]: https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github
[github-url]: https://github.com/
