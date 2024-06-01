# CptS322-Project
Group project for CptS322 at WSU, deliverable is a webapp for restaurant management.

Contributors: Samantha Brewer, Kyle Lim, Issayas Yohannes
# CptS322 Project: Restaurant Management Webapp

## Project summary

### One-sentence description of the project

A clicker counter that implements the full-power of fullstack framing.

### Additional information about the project

This project is an exercise to demonstrate the team CodeCrafters is capable of working modularly such 
that each side of the application can be treated as a black-box with functional endpoints. Though this
application may appear underwhelming in scale, it is important to note the following:

<B>The aims of this project are not to blow your socks off.</b><em> Though, you may find your feet cold and bare in due time...</em>

## Installation

### Prerequisites

To run this project on your machine, you will need the following:

<ul>
 <li>Git version >= 2.x.x</li>
 <li>Nodejs version >= 20.11.x</li>
 <li>PostgreSQL >= 16.x</li>
</ul>

### Add-ons

typeorm and pg

Key features of typeorm:

<ul>
 <li>Entity Management</li>
 <li>Database Abstraction</li>
 <li>Data Manipulation</li>
 <li>Repository Pattern</li>
 <li>Supports Multiple Databases</li>
</ul>

Key features of pg:

<ul>
 <li>Connection Management</li>
 <li>Query Execution</li>
 <li>Transaction Management</li>
 <li>Prepared Statements</li>
</ul>


### Installation Steps

### Clone the Repository

<code>git clone https://github.com/KleinMandolin/CptS322-Project</code>

### Install

<code>cd CptS322-Project</code><br/>
<code>git checkout preproject</code><br/>
<code>cd frontend</code><br/>
<code>npm i</code><br/>
<code>cd ../backend</code><br/>
<code>npm i</code><br/>
<code>chmod +x createdb.sh</code><br/>
<code>./createdb.sh</code><br/>
<code>echo 'DB_HOST=localhost</code><br/>
<code>DB_PORT=5432</code><br/>
<code>DB_USERNAME=postgres</code><br/>
<code>DB_NAME=counter' > .env</code><br/>

## Functionality

This project produces a react button with a corresponding count variable. Backend logic counts the total number of times a button has been clicked. You
Can test this by refreshing your browser. If state is contained in the frontend, then a refresh will reset that state; however, every time the component
is rendered for the first time, it calls the count/total api from the backend. To use this functionality, perform the following steps:

You will need two terminals open, one for the frontend and one for the backend. In one terminal, in the directory CptS322-Project/backend run the command:

<code>npm run start</code>

In the terminal for the frontend, in the CptS322-Project/frontend directory, run the command:

<code>npm run dev</code>

Finally, navigate to the link below in your browser:

<code>http://localhost:3001/</code>

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Additional Documentation

TODO: Provide links to additional documentation that may exist in the repo, e.g.,
  * Sprint reports
  * User links

## License

This project is under the MIT license, included as LICENSE.txt in this repo.
