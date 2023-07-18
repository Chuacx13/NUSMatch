# NUSMATCH

NUS Orbital 2023

# 1. Proposed Level of Achievement

Artemis

# 2. Motivation

Our main target audience is students who do not have residence in NUS as they face the challenge of forming both study groups and project groups.

The current NUS community is large, with more than 43,000 students making up the bulk of it (NUS, 2022). Despite attracting an increasing number of students annually, its accommodations (6 halls, 5 residential colleges, 2 houses, and 2 student residences) are only able to house 11,000 students (Teng A., 2022). This highlights that approximately only 26% of NUS students are able to secure a place to stay on campus. Without such accommodation, it is harder for students to meet others.

Entering NUS, we knew that projects and group collaborations are an integral part of our learning journey. We anticipated that forming study or project groups would be an easy and smooth process. However, it was difficult to form a group that we are comfortable working with. Classes do not provide students with sufficient opportunities to interact with one another, and coupled with the hectic student life of NUS students, it creates an unfavorable environment to forge meaningful friendships. More importantly, it makes the process of forming project and study groups inconvenient. The problem is exacerbated for international students due to cultural barriers.

On the other hand, there is still a select group of us who face difficulty in forming said groups despite having residence in NUS. Personally, even though we stay on campus, our personal experience proved that it is still not easy to find study or project mates with similar academic goals as us. Moreover, we want to provide students who already have existing friend groups with the opportunity to step out of their comfort zone to meet and work with new people, which will be beneficial to them in the workplace.

# 3. Aim

Aim 1: Allow people who face difficulty in meeting others to form study or project groups.
Aim 2: Allow people who already have existing groups to expand their social circle and experience working with different kinds of people.

# 4. User Stories

- As a student who does not stay on campus, I want to be able to connect with other students to form project and study groups.

  - Reason: To work with people with similar academic goals as me to achieve better results

- As a student who already has existing groups, I want to find new people to work with, to develop my soft skills and experience working with different kinds of people.

  - Reason: To hone my soft skills and better prepare myself for the real-world workplace environment

- As a student, I want to forge lasting relationships with people with the same goals as me, which will be beneficial in the long run.

  - Reason: To build a supportive community with people who share the same goals as me

- As a student, I want to meet and learn from others taking similar courses and modules as me.

  - Reason: To learn from others and achieve better understanding and results in my courses and modules

- As a student, I want to help other students who are struggling with their work.
  - Reason: To render support to struggling students and reaffirm my current knowledge

# 5. Features

We intend to create a web application that allows students to find project mates and form study groups.

Milestone 1 features

- Authentication without verification
- Basic website navigation

Milestone 2 features

- Updates on Authentication
- Verification of NUSNET ID to ensure that users are from NUS
- Private and Public Routes
- Prevent access to certain pages based on the user’s authentication status
- Profile
  - Users can view and edit their own profiles
  - Created a 'Profiles' database using MongoDB
- Group
  - Users can create, view, edit, and join/request to join groups
  - Created a 'Groups' database using MongoDB
- Search
  - Users can find other users and groups based on keywords
  - Profile and Group tabs for categorizing search results
  
  Milestone 3 features

- Improve benefits of web applications
- Groups
  - Request to Join function
- Chat (if time permits)
- Algorithm (if time permits)
- Schedule (if time permits)
- Enhance user experience:
  - Responsive page design for use with mobile phones and tablets
  - Authentication feature: Forgot password function
  - Profile feature: Upload profile picture function
  - Search feature: Implement filters
- Application Testing
  - Unit and Integration testing using Jest and React Testing Library
  - System testing to verify the web application's functionality using Selenium
  - Acceptance testing to simulate user interaction with the web application

# 5.1. Completed Features

## 5.1.1. Authentication

An Authentication feature that allows only users with NUS email to login and register. We made use of Firebase SDK Authentication to create users and authenticate users. 

<u>Register Form</u>

Users are prompted to fill up their NUSNET ID and password for their profile. Additionally, users would need to confirm their password again.

Upon successful verification, a verification link would be sent to their email.  

<u>Login Form</u>

Users are prompted to fill in their NUSNET ID and password for authentication. 

Test Cases: 
1. User not verified
2. Prompt: 'Email not verified. Verify before logging in'
3. User not registered
4. Prompt: ‘User does not exist. Sign up first!'
5. User and password does not match
6. Prompt: ‘NUSNET ID and Password does not match.’
7. User verified, registered, password match
	Navigate to ‘./pages/Home.js’
Purpose:
1. To ensure that users are from NUS
2. To allow every user to have an account that is only accessible to themselves
3. To prevent user’s information from being accessed by other parties
4. To ensure that website can access user’s authentication details to display the right buttons and functions 


## 5.1.2. Profile

Users would be able to update their **Profile** with information such as:
- Name (name)
- Current Year of Study (year)
- Degree (degree)
- Current Modules Taken (currentModuleS)
- Academic Goals (academicGoals)
  - Dean’s List
  - First Class
  - Second Class Upper
  - Second Class Lower
  - Third Class
  - Chill 
- Status  (status)
- Active (Looking for new groups)
- Snooze (Not looking for new groups at the moment)
   Personal Interest (personalInterest)
  
<u>View</u> 

Users can view any profile that is found in the ‘Profiles’ Database

<u>Edit</u>

Users can edit their own profiles exclusively. Ensure that any changes made by users are transmitted to the database. Checks are conducted to validate that the correct profile entry is being updated.

The ‘Profiles’ database was created using MongoDB for users to access the aforementioned functions.

Purpose:
 1. To indicate personal information which is of interest to other users who are looking for project or study mates

## 5.1.3. Groups

As the creator of Groups, the user is able to determine group settings such as:
- Group Name (groupName)
- Group Status (groupStatus)
 - Public
 - Private
- Group Description (groupDescription)
- Common Modules (modules)
- Members (members)

<u>Create</u>
Allow users to create groups and be appointed as the owner of the group.

<u>Edit</u>
Allow only the owner of the group to edit the group settings and remove members. Checks conducted on ‘leader’ property to ensure the user is allowed to make changes to the group settings. 

<u>View</u>
Allow users to view details of all groups. 

<u>Join, Request to Join and Leave</u>
Users can then decide to join or request to join groups that they are interested in. Joining or requesting to join buttons would be determined based on ‘groupStatus’. Join for public status and Request to Join for private status. Users who successfully join/leave the group are immediately added/removed from the list of ‘members’ for the particular group. 

Note: Request to Join feature has yet to be implemented. 

‘Groups’ database created using MongoDB for users to access the aforementioned functions.

Purpose:
 1. To allow users to create groups to invite others that share common academic goals/modules
 2. To allow users to join groups that fit their academic goals
    
## 5.1.4. Search

Users can use the **Search** function to find other users and groups that match to the keywords used. There will be tabs to swap between a profile or a group that categorizes the results respectively. 

The search functionality is restricted for users who have not set up their profiles. To determine if a user has set up their profile, a query is performed on the 'Profiles' database.

Profile Tab (default): 


Group Tab:

Under the ‘Profile’ tab, the system would recommend a list of students that matches with the keywords searched. The words used in the search bar would be matched to:
- email, 
- name,
- degree,
- currentModules,
- academicGoals
- and personalInterest
- property of each profile found in the ‘Profiles’ Database.

Moreover, users can swap to the ‘Group’ tab where the system would display a list of groups that matches with the keywords searched. The words used in the search bar would be matched to:
- groupName,
- groupDescription
- and modules
- property of each group found in the ‘Groups’ Database.

Purpose: 
 1. To allow users to find other users and groups that fit their criteria of interest

## 5.2 Proposed Features (Milestone 3)
### 5.2.1	 Group Chat 

A **Group Chat** function would be implemented for multiple uses within the website. Members can communicate with one another via the group chat to plan for meetings and for study sessions. 

Proposed: We will be making use of Firebase to store the chat data for each respective group. Checks would be conducted to verify that only members of the group will have access to their group chat data. 

Purpose:
 1. To allow users within groups to communicate with one another

## 5.2.2 Algorithm

Based on the user's current groups as well as the user's search history, the website makes use of an Algorithm to recommend new users and groups to connect with.

Proposed: Search history would be stored within MongoDB. Algorithm created using TensorFlow. 

Purpose:
 1. To connect users with new people outside of their usual social circle
 2. To allow users to develop soft skills such as communication skills and teamwork which will benefit them in the long run as they enter the workforce

## 5.2.3	 Scheduling Interface 

A Scheduling Interface (Calendar) that allows groups to plan their meetups and set deadlines. Reminders can also be sent out to the user’s email to remind them of upcoming deadlines and meetups. 

Proposed: Using Google Calendar API and create a ‘Schedules’ database using MongoDB. ‘Schedules’ database can be uniquely linked to each group found in the ‘Groups’ database through their ‘_id’ property.

Purpose:
 1. To allow easy scheduling of meet-ups for groups 
 2. To ensure that users in the same group are kept on task

# 6. Timeline

| MS | Deadline/Date | In-Charge   | Description of Task                                               |
|----|---------------|-------------|-------------------------------------------------------------------|
| 1  | 20th May      | Ben, Cx     | Familiarise with tech stack                                       |
|    | 29th May, 2pm | Ben, CX     | Milestone 1 (Complete user authentication with an integrated     |
|    |               |             | frontend and backend)                                            |
| 2  | 1st June      | CX          | Creating a profile for each user and their personal information   |
|    |               | Ben         | Create groups function. Users will be able to join these groups   |
|    | 15th June    | -           | First Prototype (With basic functions)                            |
|    |               |             | Authentication Feature                                            |
|    |               |             | Profile Feature                                                   |
|    |               |             | Groups Feature                                                    |
|    | 20th June    | Ben, Cx     | Create search function                                            |
|    | 24th June    | Ben, Cx     | Familiarise with Jest and React Testing Library                   |
|    | 25th June    | Ben, Cx     | Preparation of README, poster, project log and video              |
|    | 26th June, 2pm | Ben, Cx   | Evaluation Milestone 2: First Working Prototype                  |
|    |               |             | Authentication Feature                                            |
|    |               |             | Profile Feature                                                   |
|    |               |             | Groups Feature                                                    |
|    |               |             | Search Feature                                                    |
| 3  | 27th June    | Ben, Cx     | Unit and Integration Testing of Authentication, Profile, Groups, |
|    |               |             | and Search feature (related buttons, forms, and API calls)        |
|    | 30th June    | Ben         | Features that enhance user experience (mentioned under 5. Features) |
|    |               | CX          | Create Group Chat feature                                         |
|    | 3rd July     | Ben, Cx     | Create Algorithm feature                                          |
|    | 8th July     | CX          | Create Scheduling feature                                         |
|    | 11th July    | Ben, Cx     | Refinement of code and file organisation                          |
|    | 13th July    | -           | Second Prototype (With enhanced functions)                        |
|    |               |             | Group Chat Feature                                                |
|    |               |             | Algorithm Feature                                                 |
|    |               |             | Scheduling Feature                                                |
|    | 13th July    | Ben, Cx     | Unit and Integration Testing of Group Chat, Algorithm, and       |
|    |               |             | Scheduling Feature                                                |
|    | 18th July    | CX          | System Testing, Acceptance Testing, Hosting Website               |
|    |               | Ben         | Preparation of README, poster, project log, and video             |
|    | 24th July, 2pm | Ben, Cx   | Evaluation Milestone 3: Final Website                             |

# 7. Software Engineering Practices

## 7.1 Don’t Repeat Yourself (DRY) principle

We abide by the DRY principle which ensures that our code is reusable, predictable and simple. In addition, this reduces the possibility of code errors. 

## 7.2 Sprints

2-week sprints are conducted to provide us with a clear agenda and deadline to work towards. Regular meetings also provided us with the opportunity to give one another feedback and also do code reviews. This ensures that we are able to collaborate well and continuously improve on our web application.

## 7.3 Test

We plan to conduct unit and integration testing using Jest and React Testing Library before milestone 3. For system testing, we would be using Selenium. 

## 7.4 GitHub and Git Version Control 

Making use of branching, merging, pulling and pushing requests, we were able to collaborate and work independently on each feature of our web application with minimal conflicts. 

## 7.5 Model-View-Controller (MVC)

For the Model layer, we used MongoDB to store and manipulate our data. 
For the View layer, we used React to handle the data received from the Model and provide an interactive interface for our users.
For the Controller layer, we used Node.js and Express.js to handle and process user inputs from the front-end, updating the Model and sending the appropriate response back to the client. 

# 8. REST APIs 

## 8.1 Users API

/auth

| REST API  | Parameter | Response                                                                                           |
|-----------|-----------|----------------------------------------------------------------------------------------------------|
| /emails   | {}        |   [{                                                                                               |
|   [GET]   |           |   "uid": string,                                                                                   |
|   Purpose: To         |           |   "email": string,                                                                                 |
|      return list of      |           |   "emailVerified": boolean,                                                                        |
| users, along          |           |   "disabled": boolean,                                                                             |
|    with their       |           |   "metadata": {                                                                                    |
|     details,       |           |     "lastSignInTime": string,                                                                      |
|     registered       |           |     "creationTime": string,                                                                        |
|   under Firebase        |           |     "lastRefreshTime": string                                                                      |
|  authentication         |           |   },                                                                                               |
|   API        |           |   "passwordHash": string,                                                                          |
|           |           |   "passwordSalt": string,                                                                          |
|           |           |   "tokensValidAfterTime": string,                                                                  |
|           |           |   "providerData": [                                                                                |
|           |           |     {                                                                                              |
|           |           |       "uid": string,                                                                               |
|           |           |       "email": string,                                                                             |
|           |           |       "providerId": string                                                                         |
|           |           |     }                                                                                              |
|           |           |   ]                                                                                                |
| /users    | {}        | [{                                                                                                 |
|   [GET]   |           |   “email” : string                                                                                 |
|           |           | }]                                                                                                 |
| Purpose: To    |      |                                                                                                 |
|  return list of  |           |                                                                                |
|    emails of        |           |                                                                                                  |
|  users,  |           |                                                                                |
|    registered         |           |                                                                                                  |

## 8.2 Profiles API

/profile

| REST API  | Parameter | Response                                                                                           |
|-----------|-----------|----------------------------------------------------------------------------------------------------|
| /emails   |  {       | {                                                                                                  |
|   [GET]        |email: string           |   "_id": string,                                                                                   |
|  Purpose: To get         |    }       |   "email": string,                                                                                 |
| profile of user           |           |   "name": string,                                                                                  |
| based on their          |           |   "year": number,                                                                                  |
| email          |           |   "degree": array of string,                                                                       |
|           |           |   "currentModules": array of string,                                                               |
|           |           |   "academicGoals": string,                                                                         |
|           |           |   "status": string,                                                                                |
|           |           |   "personalInterest": array of string,                                                             |
|           |           |   "__v": number                                                                                    |
|           |           | }                                                                                                  |
| /users    | [GET]     | {}                                                                                                 |
|           |           | [{                                                                                                 |
|           |           |   “email” : string                                                                                 |
|           |           | }]                                                                                                 |





## 9.Tech Stack

- MERN Stack
- MongoDB
- Create ‘Profiles’ and ‘Groups Database
- Express/Node
- Server-side development 
- HTML/CSS
- Web application frontend development
- JavaScript/React 
- Web application frontend development
- Python/Pytorch/TensorFlow/Flask 
- Handle/Process database information
- Create algorithm feature

## 10. Proof-of-Concept

Refer to video demonstration:
https://drive.google.com/file/d/14jqW6twIMvZUyyj75ySeBu5zVHdaESqB/view?usp=share_link


## 11. Work Log

Refer to attached spreadsheet: https://docs.google.com/spreadsheets/d/1VitgZQlVsYXzqSeAFozFl-D-umvCcVh39mg2wGk2twc/edit?usp=sharing


## 12.	References
Teng A. (2022). Campus Life Set to Return as Covid-19 Measures Ease. Retrieved March 12, 2023, from https://nus.edu.sg/newshub/news/2022/2022-04/2022-04-18/EASE-st-18apr-pB3.pdf 

NUS. (2022). NUS Bulletin AY2022/23. Retrieved March 12, 2023, from https://www.nus.edu.sg/nusbulletin/ay202223/#:~:text=The%20NUS%20community%20is%20large,colleges%2C%20faculties%2C%20and%20schools. 


## 13.	Appendix

Dependencies: 
- React Libraries used:
  - npm install @mui/material @emotion/react @emotion/styled

- Javascript Libraries used:
  - npm install axios
  - npm react-router-dom

- Firebase:
  - npm install firebase
  - npm install react-firebase-hooks


Milestone 1: 
https://docs.google.com/document/d/1pw3FiHsVss_XzCt4NDfvKxQOZLMyPKJg97V7RlJGwTY/edit?pli=1


