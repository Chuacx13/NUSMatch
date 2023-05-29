# NUSMATCH
NUS Orbital 2023


# 1.	Proposed Level of Achievement

Artemis


# 2.	Motivation

Our main target audience is students who do not have residence in NUS as they face the challenge of forming both study groups and project groups.

The current NUS community is large, with more than 43,000 students making up the bulk of it (NUS, 2022). Despite attracting an increasing number of students annually, its accommodations (6 halls, 5 residential colleges, 2 houses and 2 student residences) are only able to house 11,000 students (Teng A., 2022). This highlights that approximately only 26% of NUS students are able to secure a place to stay on campus. Without such accommodation, it is harder for students to meet others.  

Entering NUS, we knew that projects and group collaborations are an integral part of our learning journey. We anticipated that forming study or project groups would be an easy and smooth process. However, it was difficult to form a group that we are comfortable working with. Classes do not provide students with sufficient opportunities to interact with one another, and coupled with the hectic student life of NUS students, it creates an unfavorable environment to forge meaningful friendships. More importantly, it makes the process of forming project and study groups inconvenient. The problem is exacerbated for international students due to cultural barriers.

On the other hand, there is still a select group of us who face difficulty in forming said groups despite having residence in NUS. Personally, even though we stay on campus, our personal experience proved that it is still not easy to find study or project mates with similar academic goals as us. Moreover, we want to provide students who already have existing friend groups with the opportunity to step out of their comfort zone to meet and work with new people, which will be beneficial to them in the workplace.


# 3.	Aim 

Aim 1: Allow people who face difficulty in meeting others to form study or project groups.
Aim 2: Allow people who already have existing groups to expand their social circle and experience working with different kinds of people.


# 4.	User Stories

* As a student who does not stay on campus, I want to be able to connect with other students to form project and study groups.
  * Reason: To work with people with similar academic goals as me to achieve better results

* As a student who already has existing groups, I want to find new people to work with, to develop my soft skills and experience working with different kinds of people. 
  * Reason: To hone my soft skills and better prepare myself for the real-world workplace environment 

* As a student, I want to forge lasting relationships with people with the same goals as me, which will be beneficial in the long run.
  * Reason: To build a supportive community with people who share the same goals as me 

* As a student, I want to meet and learn from others taking similar courses and modules as me. 
  * Reason: To learn from others and achieve better understanding and results in my courses and modules

* As a student, I want to help other students who are struggling with their work. 
  * Reason: To render support to struggling students and reaffirm my current knowledge 


# 5.	Features

We intend to create a web application that allows students to find project mates and form study groups. 

## 5.1.	Authentication Interface (Completed)

An Authentication Interface that allows only users with NUS email to login and sign-up. 

During sign-ups, users would be prompted to fill up their personal details for their profile. 

Purpose:
* To ensure that users are from NUS
* To allow every user to have an account that is only accessible to themselves
* To prevent user’s information from being accessed by other parties

## 5.2.	Profile (Not Done)

Users would be able to update their Profile with information such as:
* Name
* Current year of study
* Degree 
* Current Modules
* Academic goals 
* Status 
  * Active (Looking for new groups)
  * Snooze (Not looking for new groups at the moment)
* Current Project and/or Study Groups
* Past Project and/or Study Groups(Optional to show)
* GPA (Optional to show)
* Personal Interest
* Ratings (Peer Review)

Purpose:
* To indicate personal information which are of interest to other users who are looking for project or study mates

## 5.3.	Groups (Not Done)

Users can create Groups and will be appointed as the admin. As the admin, they are able to determine group settings such as:
* Group Status	
  * Open	
  * Private
* Group Name 
* Module Description
  * Indicates some modules that the group focuses on (eg. BT4508)
* Group Description
  * Indicate group’s dynamic (eg. Chill Study Group)

Additionally, admins are able to send invitations to other students. Students can also request to join an existing project/study group that is open.

Purpose:
* To allow users to create groups to invite others that share common academic goals/modules
* To allow users to join groups that fit their academic goals 

## 5.4.	Search Function (Not Done)

Users can use the Search Function to find other users and groups that match to the keywords used. There will be tabs to swap between a person or a group that categorizes the results respectively. Users can search for either a name or a module.

Under the ‘Users’ tab, the system would recommend a list of students that matches with the keywords searched. The words used in the search bar would be matched to:
* Other users’ Names 
* Other users’ Current Modules 

Moreover, users can swap to the ‘Group’ tab where the system would recommend a list of groups that matches with the keywords searched. The words used in the search bar would be matched to:
* Other groups’ Names
* Other groups’ Module Description
* Other groups’ Group Description

Purpose: 
* To allow users to find other users and groups that fit their criteria of interest

## 5.5.	Chat Function (Not Done)

A Chat Function would be implemented for multiple uses within the website. 

Purpose:
* To allow users to reach out and connect with other users 
* To allow users within groups to communicate with one another

## 5.6.	Algorithm (Not Done)

Moreover, based on the user's current groups as well as the user's search history, the website makes use of an Algorithm to recommend new users and groups to connect with.

Purpose:
* To connect users with new people outside of their usual social circle 
* To allow users to develop soft skills such as communication skills and teamwork which will benefit them in the long run as they enter the workforce

## 5.7.	Scheduling Interface (Not Done)

A Scheduling Interface (Calendar) that allows groups to plan their meetups and set deadlines. Reminders can also be sent out to the user’s email to remind them of upcoming deadlines and meetups. 

Purpose:
* To allow easy scheduling of meet-ups for groups 
* To ensure that users in the same group are kept on task

## 5.8. Database (Not Done)

A Database will be created using mySQL to store:
* Users’ login details 
* User’s profile information
* Groups’ information

Purpose: 
* To allow the search function to look up our database and find users/groups of their interest
* To support our authentication function by checking that input username/email and input password matches the ones in our database
 
 
# 6.	Timeline

| MS | Deadline/Date   | In-Charge | Description of Task                                                                |
|----|-----------------|-----------|------------------------------------------------------------------------------------|
| 1  | 20th May        | Ben CX    | Familiarize with tech stack                                                        |
|    | 29th May, 2pm   | Ben CX    | Milestone 1 (Complete user authentication with an integrated frontend and backend) |
| 2  | 1st June - 15th | CX        | Creating a profile for each user and their personal information                     |
|    | June            | Ben       | Create groups function. Users will be able to join these groups                     |
|    | 15th June       |           | First Prototype (With essential functions)                                         |
|    |                 |           | Authentication Interface                                                           |
|    |                 |           | Profile                                                                            |
|    |                 |           | Groups                                                                             | 
|    | 20th June       | Ben CX    | Create Search Function                                                             |
|    | 23rd June       | Ben CX    | Testing and debugging                                                              |
|    | 26th June, 2pm  | Ben CX    | Evaluation Milestone 2: First Working Prototype                                    |
|    |                 |           | Authentication Interface                                                           |
|    |                 |           | Profile                                                                          |
|    |                 |           | Groups                                                                            | 
|    |                 |           | Search Function                                                                     |
| 3  | 1st July        | Ben       | Create a scheduling interface                                                      |
|    |                 | CX        | Create a chat function                                                            |
|    | 10th July       | Ben       | Creation of an algorithm to recommend new users and groups to connect with          |
|    | 16th July       |           | Second Prototype (With enhanced functions)                                          |
|    |                 |           | Chat Function                                                                      |
|    |                 |           | Algorithm                                                                          |
|    |                 |           | Scheduling Interface                                                               |
|    | 20th July       | Ben CX    | Testing of Second Prototype                                                        |
|    | 24th July, 2pm  | Ben CX    | Evaluation Milestone 3: Final Website                                              |
|    |                 |           | Chat Function                                                                      |
|    |                 |           | Algorithm                                                                          |
|    |                 |           | Scheduling Interface                                                               |



# 7.	Tech Stack

* MySQL 
  * Create Database
* Python/Pytorch/TensorFlow/Flask 
  * Handle/Process database information
  * Create algorithm feature
* HTML/CSS
  * Web application frontend development
* JavaScript/React 
  * Web application frontend development

Potential programming language to be used
* Java


# 9. Proof-of-Concept

Refer to video demonstration:



# 10. Work Log

Refer to attached spreadsheet: https://docs.google.com/spreadsheets/d/1VitgZQlVsYXzqSeAFozFl-D-umvCcVh39mg2wGk2twc/edit?usp=sharing



# 11.	References
Teng A. (2022). Campus Life Set to Return as Covid-19 Measures Ease. Retrieved March 12, 2023, from https://nus.edu.sg/newshub/news/2022/2022-04/2022-04-18/EASE-st-18apr-pB3.pdf 

NUS. (2022). NUS Bulletin AY2022/23. Retrieved March 12, 2023, from https://www.nus.edu.sg/nusbulletin/ay202223/#:~:text=The%20NUS%20community%20is%20large,colleges%2C%20faculties%2C%20and%20schools. 
