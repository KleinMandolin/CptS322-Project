# CptS322-Project
Group project for CptS322 at WSU, deliverable is a webapp for restaurant management.

Contributors: Samantha Brewer, Kyle Lim
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
  - [NestJS](https://nestjs.com/), backend framework.
  - [@nestjs/typeorm](https://www.npmjs.com/package/@nestjs/typeorm), models relations to classes.
  - [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt), jwt handling.
  - [@nestjs/passport](https://www.npmjs.com/package/@nestjs/passport), create strategies for authentication.
  - [@nestjs/platform-express](https://www.npmjs.com/package/@nestjs/platform-express), handling for req and res objects.
  - [axios](https://www.npmjs.com/package/axios), used for the email service to simplify api fetches.
  - [bcrypt](https://www.npmjs.com/package/bcrypt), hashes passwords to the backend credentials relation.
  - [class-transformer](https://www.npmjs.com/package/class-transformer/v/0.1.0-beta.10), parses api calls to acceptable types.
  - [class-validator](https://www.npmjs.com/package/class-validator), validate api call data.
  - [cookie-parser](https://www.npmjs.com/package/cookie-parser), populate req.cookie by parsing cookies in headers.
  - [cors](https://www.npmjs.com/package/cors), cross origin resource sharing allows the frontend to communicate with the backend.
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), allows the creation of JWTs.
  - [nodemailer]https://www.npmjs.com/package/nodemailer), sends emails.
  - [pg](https://www.npmjs.com/package/pg), enables interaction with postgresql database.
  - [reflect-metadata](https://www.npmjs.com/package/reflect-metadata), access metadata at runtime.

### Installation Steps

1. Set up PostgrSQL
   </br>`psql -U postgres`
   </br>`create database [database name]`
   </br>`\q`
2. Install dependencies. Separately for both the 'frontend' and 'backend' folders, run
   </br>`npm i`
3. Create a file `.env` in 'backend' folder, then paste in the below text and save:
   
DB_HOST=your database host
DB_PORT=your database port
DB_USERNAME=your username
DB_NAME=your database name
MAILGUN_DOMAIN=your mailgun domain
MAILGUN_API_KEY=your mailgun api key
JWT_SECRET=your jwt secret

   
4. Open separate terminals in the 'frontend' and 'backend' directories. Type `npm run start` in the backend terminal first, then type `npm run dev` in the frontend directory.
5. Navigate to the frontend page at [http://localhost:3001](http://localhost:3001)


## Functionality

TODO:

- After completing the above steps, you must first create a user via the postgresql database in the user_info and the user_credentials relations.
- Add recipes to the recipe relation via postman; mealtype can be 4 values, appetizer, beverage, dessert, and entree. Here is an example POST request:

{
  "recipeName": "Bruschetta",
  "price": "5.99",
  "mealType": "appetizer",
  "ingredients": [
    {
      "ingredientName": "Tomatoes",
      "qty": "2",
      "unit": "cups"
    },
    {
      "ingredientName": "Basil",
      "qty": "1",
      "unit": "cup"
    },
    {
      "ingredientName": "Olive Oil",
      "qty": "0.5",
      "unit": "cup"
    },
    {
      "ingredientName": "Baguette",
      "qty": "1",
      "unit": "loaf"
    }
  ],
  "description": "A delicious Italian appetizer made with tomatoes, basil, olive oil, and toasted baguette slices."
}

- Login.
- Click on the inventory section. Add inventory.
- Navigate to the menu section of the launchpad and order your item.
- Navigate to the revenue section of the launchpad and view orders.


## Known Problems

TODO: 

- Admins are unable to add users.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Additional Documentation
- [Sprint 1](https://github.com/KleinMandolin/CptS322-Project/blob/427c1af5b76c932843b54ca7478cde643ac8de74/Sprint%201%20Report.pdf)

- [Samantha Brewer Frontend Dev Journal](https://docs.google.com/document/d/1IedBmgP0wjOv2Pa_4kh6zjgmeQ1HBDAq2gby1Dp4A3E)

## License

This project is under the MIT license, included as LICENSE.txt in this repo.
