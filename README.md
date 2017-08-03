# Galvanize Snacks

Your goal is to create a CRUD application to review and rate your favorite snacks at Galvanize! Draw on the topics you've learned from Q1 & Q2 to design and deploy an application that covers the desired user stories.

This repo includes some files to get you started, but it's up to you to finish these user stories:

- **User can view all snacks (already complete)**
  - When the user visits the homepage (`http://localhost:3000/`) they see a list of all snacks


- **User can view details of an individual snack**
  - When the user clicks on a snack, display full information about that snack
  - Display list of reviews for snack
  - Display average rating of snack


- **User can signup a new account (registration)**
  - Display a form for the user to enter a name, email & password.
  - Clearly indicate registration success or failure to the user
  - User cannot register the same email more than once


- **User can login with an existing account (authentication)**
  - Display a form for the user to enter an email & password.
  - Clearly indicate login success or failure to the user


- **User can post a review of a snack**
  - Display a form for the user to post a new review for a specific snack


- **User can edit their own review of a snack**
  - Display a form for the user to edit a review for a specific snack
  - pre-fill form with current review data
  - User **cannot** edit other users reviews


- **User can delete their own review of a snack**
  - Provide option to delete a users own review for a specific snack
  - User **cannot** delete other users reviews



## ERD

![snacks ERD](./snacks_erd.jpg)

**NOTE:** The migrations and seeds for the `snacks` table are included. You will need to implement the `users` and `reviews` tables yourself following this relationship diagram.

## Routes

| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Body                                                  |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------|
| `POST`         | `/users`           | `{ "first_name": "Linus", "last_name": "Torvalds", "email": "linus.torvalds@hotmail.com", "password": "ilovelinux" }` | `200`           | `{ id: 2, "first_name": "Linus", "last_name": "Torvalds", ... } |

## Setup

Start by forking and cloning this project.
Then install all dependencies
```
cd galvanize-snacks
npm install
```

Create the development database:

```
createdb snacks_dev
```

and run migrations and seeds:

```
npm run knex migrate:latest
npm run knex seed:run
```

## Bonus

- Hide review form if user not logged in
- Hide edit/delete buttons if user not logged in


- **Create an admin dashboard**
  - Add `admin` column to users table
  - Update seeds to make user with id = 1 an admin
  - Admin can add and remove snacks from the homepage
  - Admin can delete user reviews
