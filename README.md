# Social Network API

## Description

This is a backend API for a social network application. It allows users to perform CRUD operations on users, thoughts, and reactions, as well as add or remove friends.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

    ```bash
    `git clone `

2. Install Dependincies 

    cd social-network-api
    `npm install`

3. Set up environment variables:Create a .env file in the root directory and add the following:

    PORT=3000
    MONGODB_URI=mongodb://localhost/social_network_db

Replace mongodb://localhost/social_network_db with your MongoDB connection URI.

4. Start the Server
    `npm start`

## Usage
Note all request bodies will be done with json
### Users

`GET /api/users`: Get all users.
`GET /api/users/:id`: Get a single user by ID.
`POST /api/users`: Create a new user.
request body needed
`{
  "username": "example_user",
  "email": "user@example.com"
}`
`PUT /api/users/:id`: Update a user by ID.
`DELETE /api/users/:id`: Delete a user by ID.

### Friends

`POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
`DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thoughts

`GET /api/thoughts`: Get all thoughts.
`GET /api/thoughts/:id`: Get a single thought by ID.
`POST /api/thoughts`: Create a new thought.
request body needed
`{
  "thoughtText": "Here's a new thought...",
  "username": "example_user",
  "userId": "user_id"
}`
`PUT /api/thoughts/:id`: Update a thought by ID.
`DELETE /api/thoughts/:id`: Delete a thought by ID.

### Reactions

`POST /api/thoughts/:thoughtId/reactions`: Create a reaction for a thought.
request body needed
{
  "username": "example_user",
  "reactionBody": "Nice thought!"
}
`DELETE /api/reactions/:id`: Delete a reaction by ID.

## License 

This project is licensed under the MIT License.

## Questions

For any questions or feedback, feel free to contact me at gtodd7701@gmail.com

## Sources 

https://www.mongodb.com/docs/drivers/node/current/quick-reference/#std-label-node-quick-reference
stackoverflow

## Author
Gavin Todd