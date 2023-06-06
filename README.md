<p  align="center">
<a  href="http://brewww.com/"  target="_blank"><img  src="https://github.com/BrewInteractive/authentication-service-nestjs/blob/main/Brew-Logo-Small.png?raw=true"  width="300"  alt="Brew Logo"  /></a>
</p>

<h1  align="center">Authentication Service - Hasura Plugin</h1>

<p align="center">Hasura Plugin, <a href="https://github.com/BrewInteractive/authentication-service-nestjs">Authentication Service</a> has been specially developed. </p>
<p align="center">
<a href="https://www.npmjs.com/package/@brewww/authentication-service-hasura-claims-plugin" target="_blank"><img src="https://img.shields.io/npm/v/@brewww/authentication-service.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/@brewww/authentication-service-hasura-claims-plugin" target="_blank"><img src="https://img.shields.io/npm/l/@brewww/authentication-service.svg" alt="Package License" /></a> <a href="https://www.npmjs.com/@brewww/authentication-service-hasura-claims-plugin" target="_blank"><img src="https://img.shields.io/npm/dm/@brewww/authentication-service.svg" alt="NPM Downloads" /></a>
</p>
<p align="center">
<a href="https://www.instagram.com/brew_interactive/" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
<a href="https://www.linkedin.com/company/brew-interactive/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin" /></a>
<a href="https://twitter.com/BrewInteractive" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>
  
## Purpose
The plugin allows you to create the token structure that hasura needs. The fields required by the hasura in the token and added by the plugin are as follows in the table below;

  | Name                    | Example Value         |
  | ----------------------- | --------------------- |
  | x-hasura-user-id        | 1                     |
  | x-hasura-username       | example-name          |
  | x-hasura-email          | info@brewww.com       |
  | x-hasura-default-role   | user                  |
  | x-hasura-allowed-roles  | ["user", "admin"]     |
 

</p>
