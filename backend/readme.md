<b><em>Configure backend: Ubuntu Install</em></b>

<b>Prerequisites:</b>
<ol>
<li>Update packages - <b>sudo apt update</b></li>
<li>Install git - <b>sudo apt install git</b></li>
<li>Install NodeJS - <b>sudo apt install nodejs</b></li>
<li>Install NPM - <b>sudo apt install npm</b></li>
<li>Install PostgreSQL - <b>sudo apt install postgresql</b></li>
</ol>
<br/>
<b>Set up project:</b>
<ol>
<li>Change directories - If in project: <b>cd backend</b></li>
<li>Install dependencies - <b>npm i</b></li>
<li>Create configure environment variables - <b>Create .env file in the backend directory: <br/><br/>touch .env</b></li>
<br/>
Configure:<br/>
<em><b>/backend/.env</b></em>:<br/><br/>
DB_HOST=localhost <br/>
DB_PORT=5432 <br/>
DB_USERNAME=postgres <br/>
DB_NAME=counter
<br/><br/>
<li>List of commands to set up the PostgreSQL database:</li>
<br/>
<ol><b>
<li>sudo service postgresql start</li>
<li>psql -U postgres</li>
<li>CREATE DATABASE counter;</li>
<li>\q</li>
<em>* By default, the user, 'postgres', should have no password</em>
</b></ol><br/>
<li>Start the backend - <b>npm run start</b></li>
</ol>
