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

___Register Form___
Users are prompted to fill up their NUSNET ID and password for their profile. Additionally, users would need to confirm their password again.

Upon successful verification, a verification link would be sent to their email.  

___Login Form___

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
___View___ 
Users can view any profile that is found in the ‘Profiles’ Database

___Edit___
Users can edit their own profiles exclusively. Ensure that any changes made by users are transmitted to the database. Checks are conducted to validate that the correct profile entry is being updated.

The ‘Profiles’ database was created using MongoDB for users to access the aforementioned functions.

Purpose:
To indicate personal information which is of interest to other users who are looking for project or study mates

...

## 5.1.3. Groups

As the creator of Groups, the user is able to determine group settings such as:
- Group Name (groupName)
- Group Status (groupStatus)
- Public
- Private
- ... (continue with other properties)

...

## 5.1.4. Search

Users can use the Search function to find other users and groups that match the keywords used. There will be tabs to swap between a profile or a group that categorizes the results respectively.

Profile Tab (default):
...

Group Tab:
...

Purpose: 
To allow users to find other users and groups that fit their criteria of interest


# 6. Timeline

| MS  | Deadline/Date   | In-Charge | Description of Task                                                                |
| --- | --------------- | --------- | ---------------------------------------------------------------------------------- |
| 1   | 20th May        | Ben CX    | Familiarize with tech stack                                                        |
|     | 29th May, 2pm   | Ben CX    | Milestone 1 (Complete user authentication with an integrated frontend and backend) |
| 2   | 1st June - 15th | CX        | Creating a profile for each user and their personal information                    |
|     | June            | Ben       | Create groups function. Users will be able to join these groups                    |
|     | 15th June       |           | First Prototype (With essential functions)                                         |
|     |                 |           | Authentication Interface                                                           |
|     |                 |           | Profile                                                                            |
|     |                 |           | Groups                                                                             |
|     | 20th June       | Ben CX    | Create Search Function                                                             |
|     | 23rd June       | Ben CX    | Testing and debugging                                                              |
|     | 26th June, 2pm  | Ben CX    | Evaluation Milestone 2: First Working Prototype                                    |
|     |                 |           | Authentication Interface                                                           |
|     |                 |           | Profile                                                                            |
|     |                 |           | Groups                                                                             |
|     |                 |           | Search Function                                                                    |
| 3   | 1st July        | Ben       | Create a scheduling interface                                                      |
|     |                 | CX        | Create a chat function                                                             |
|     | 10th July       | Ben CX    | Creation of an algorithm to recommend new users and groups to connect with         |
|     | 16th July       |           | Second Prototype (With enhanced functions)                                         |
|     |                 |           | Chat Function                                                                      |
|     |                 |           | Algorithm                                                                          |
|     |                 |           | Scheduling Interface                                                               |
|     | 20th July       | Ben CX    | Testing of Second Prototype                                                        |
|     | 24th July, 2pm  | Ben CX    | Evaluation Milestone 3: Final Website                                              |
|     |                 |           | Chat Function                                                                      |
|     |                 |           | Algorithm                                                                          |
|     |                 |           | Scheduling Interface                                                               |

# 7. Tech Stack

- MySQL
  - Create Database
- Python/Pytorch/TensorFlow/Flask
  - Handle/Process database information
  - Create algorithm feature
- HTML/CSS
  - Web application frontend development
- JavaScript/React
  - Web application frontend development

Potential programming language to be used

- Java

# 9. Proof-of-Concept

Refer to video demonstration:

# 10. Work Log

Refer to attached spreadsheet: https://docs.google.com/spreadsheets/d/1VitgZQlVsYXzqSeAFozFl-D-umvCcVh39mg2wGk2twc/edit?usp=sharing

# 11. References

Teng A. (2022). Campus Life Set to Return as Covid-19 Measures Ease. Retrieved March 12, 2023, from https://nus.edu.sg/newshub/news/2022/2022-04/2022-04-18/EASE-st-18apr-pB3.pdf

NUS. (2022). NUS Bulletin AY2022/23. Retrieved March 12, 2023, from https://www.nus.edu.sg/nusbulletin/ay202223/#:~:text=The%20NUS%20community%20is%20large,colleges%2C%20faculties%2C%20and%20schools.
