# CptS322-Project
Group project for CptS322 at WSU, deliverable is a webapp for restaurant management.

Contributors: Samantha Brewer, Kyle Lim, Issayas Yohannes
# CptS322 Project: Restaurant Management Webapp

## Project summary

### One-sentence description of the project

A webapp that can handle restaurant orders, track revenue and ingredient stocks with expiration alerts, and secure logins separating employees and owners/admins.

### Additional information about the project

The project is mainly a web app that can be used by employees to make orders, as well as accessing inventory and revenue information for admins. The UI will be dynamically scalable for tablet and desktop environments, with other layouts such as smaller mobile UIs potentially being supported in later development.

The order taker will be in the form of a table of menu items, with the user (the employee) being able to select multiple items for the cart and then proceed to checkout.  Actual money handling and transactions will not be implemented for this prototype.
The inventory tracker will estimate current inventory amounts and will notify the user of soon-to-expire items a defined time before expiration.
The secure login will be MFA at minimum, with every feature except for the order taker being limited to the administrator/owner role.

## Installation

### Prerequisites

- Update packages - `sudo apt update`
- Install git - `sudo apt install git`
- Install NodeJS - `sudo apt install nodejs`
- Install NPM - `sudo apt install npm`
- Install PostgreSQL - `sudo apt install postgresql`
- TODO: Description of setting up Mailgun account


### Add-ons
- Frontend
  - [React](https://react.dev/), language frontend is coded in
  - [React DOM](https://react.dev/reference/react#react-dom), shipped with React for basic DOM functionality
  - [Axios](https://axios-http.com/), to streamline API fetch calls with backend
  - [React Router](https://github.com/remix-run/react-router), for navigating between pages e.g. ".../launchpad" to ".../menu"
  - [React Icons](https://react-icons.github.io/react-icons/), for scalable icons such as the menu checkout button

- Backend
  - TODO: input backend add-ons included, such as Axios's backend uses

### Installation Steps

1. Set up PostgrSQL
   </br>`psql -U postgres`
   </br>`create database practicedb`
   </br>`\q`
2. Install dependencies. Separately for both the 'frontend' and 'backend' folders, run
   </br>`npm i`
3. Create a file `.env` in 'backend' folder, then paste in the below text and save:
   ```
   DB_HOST=localhost
   DB_PORT=[postgresDB port]
   DB_USERNAME=[your username]
   DB_NAME=[your database]
   MAILGUN_HOST=smtp.mailgun.org
   MAILGUN_LOGIN=[your mailgun login]
   MAILGUN_PASS=[your mailgun password]
   JWT_SECRET=[jwt secret]

   ```
4. Open separate terminals in the 'frontend' and 'backend' folders. Type `npm run start` in the backend terminal first, then the frontend terminal.
5. Navigate to the frontend page at [http://localhost:3001](http://localhost:3001)


## Functionality

TODO: Write usage instructions. Structuring it as a walkthrough can help structure this section,
and showcase your features.


## Known Problems

TODO: Describe any known issues, bugs, odd behaviors or code smells. 
Provide steps to reproduce the problem and/or name a file or a function where the problem lives.


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
