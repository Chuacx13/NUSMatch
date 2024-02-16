# NUSMATCH

## Detailed README

https://docs.google.com/document/d/1nyk-zSIlUnVhecmBKrgl9FVUUZpAEjcBtdsSRQ4SUcw/edit

## Website Link

https://nusmatch.onrender.com (Deployed using render's free plan. Hence, starting up of initial page and backend may take up to 2min)

## To Clone

### Before running on Terminal

Fill in parameters in file named ".env.example" (found in both client and server folders) and rename to ".env"

### To run on Terminal

git clone git@github.com:Chuacx13/NUSMatch.git
cd client  
npm i  
npm start  
cd server  
npm i  
npm start

## 1. Motivation

The National University of Singapore (NUS) has a large student community of over 43,000, but only about 26% can be accommodated on campus due to limited housing facilities. This situation poses a significant challenge for students, especially those living off-campus, in forming study and project groups. The anticipated ease of group formation is hindered by insufficient interaction opportunities within classes and the demanding student life, making it difficult to establish meaningful connections. This issue is particularly pronounced for international students who also face cultural barriers. Even students residing on campus encounter challenges in finding compatible group members with similar academic objectives. The goal of our project is to facilitate the formation of project/study groups and also encourage students within existing friend groups to broaden their networks by collaborating with new people, preparing them for diverse workplace environments.

## 2. Aim

Aim 1: Allow people who face difficulty in meeting others to form study or project groups.  
Aim 2: Allow people who already have existing groups to expand their social circle and experience working with different kinds of people.

## 3. Features

### 3.1 Authentication

User (Only NUS Students) can sign up, login and logout.

### 3.2 Profile

User can update their own profile and view other people's profile.

### 3.3 Groups

User can create, join and send request to join groups. Only leaders can edit group details, send invites to other users and kick members.

### 3.4 Search

User can find other users and groups that match to the keywords used. There will be a filter to swap between looking for a 'profile' or looking for a 'group'.

### 3.5 GroupChat

User can chat in their respective groups to discuss about work, interests or find a meet up time etc.

### 3.6 Schedule

User can add or delete an event in the group's schedule. Every member would have the same view of the group's schedule.

## 4. Tech Stack

MongoDB  
Express/Node  
React/Javascript  
HTML
CSS  
Firebase  
Socket.io  
Jest/React Testing Library

## 5. Testing

cd client  
npm test

1. Unit Testing

Conducted on buttons using react testing library and jest.

2. API Testing

Conducted using Thunder Client.

3. End to End Testing

Conducted on access control routes to ensure that depending on the status of the user (eg. authenticated vs not authenticated), they can only access certain pages/services.

4. User Acceptance Testing (Test Account)  
   NUSNET ID: test  
   Password: testpassword

## 6. Challenges

As this was a self-learnt and our first software engineering project, we were uncertain with how to even begin on the project. Thankfully, we did our research and decided to go with the MERN Stack as it is a common tech stack used for software engineering projects. Along the way, it was tough to figure out how to get the web application to work the way we want it to (eg. fetching data, saving data in the mongodb database). However, we persevere on, relying on youtube tutorials and also stack overflow to resolve our issues faced.

Additionally, conducting 2-week sprints and doing a thorough requirement analysis from the start of our project kept us on task and smoothen our journey of creating NUSMatch.

## 7. Things to Improve on

1. Adjust the size of the components of the UI into an appropriate size. Currently, it is too large as mentioned by peers who helped test our project.
2. Add responsive CSS to ensure that web application fit on different screen sizes.

## 8. REST APIs

Can be found in detailed README under Section 10) REST APIs

## 9. Appendix

### 9.1 Dependencies

- Client-Side:  
  create-react-app  
  react-router-dom  
  react-big-calendar  
  react-datepicker  
  moment-timezone  
  firebase  
  react-firebase-hooks  
  dotenv  
  date-fns  
  date-fns-tz  
  axios  
  @emotion/react  
  @emotion/styled  
  @mui/icons-material  
  @mui/material  
  socket.io-client

- Server-Side:  
  cors  
  dotenv  
  express  
  firebase-admin  
  mongodb  
  mongoose  
  socket.io

### 9.2 DevDependencies:

- Client-Side:  
  @babel/plugin-proposal-private-property-in-object  
  babel-jest  
  history  
  setimmediate

- Server-Side:  
  nodemon
