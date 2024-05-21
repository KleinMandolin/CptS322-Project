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

TODO: List what a user needs to have installed before running the installation instructions below (e.g., git, which versions of Ruby/Rails)

### Add-ons

TODO: List which add-ons are included in the project, and the purpose each add-on serves in your app.

### Installation Steps

TODO: Describe the installation process (making sure you mention `bundle install`).
Instructions need to be such that a user can just copy/paste the commands to get things set up and running. 


## Functionality

TODO: Write usage instructions. Structuring it as a walkthrough can help structure this section,
and showcase your features.


## Known Problems

TODO: Describe any known issues, bugs, odd behaviors or code smells. 
Provide steps to reproduce the problem and/or name a file or a function where the problem lives.


## Contributing

TODO: Leave the steps below if you want others to contribute to your project.

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
