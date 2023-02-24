# LMS-devcom-Mentorship
The main objective of this project is to manage the details of the students, books and the issued books efficiently. This project helps to keep all the records of the library. So, all book category will be managed by the admin anbd author will be able to see category record

### For admin <br>
#### 1). Admin can add new books <br>
`POST`  http://localhost/port/api/book/<br>
**BODY PARAMS** : <br>
```python  
    {
         "title" : title of the book,
         "desc" : description of the book,
         "thumb_img" : Thumbnail Image File,
         "author" : AuthorId,
         "genre" : [GenreId],

        }
```      
**HEADERS** : Authorization : "Token *Token*"<br>
#### 2). View the whole list of books and delete any book <br>
`GET` or `PUT` or `DELETE` http://localhost/port/api/book/{book-slug}/ <br>
**BODY PARAMS**(required while method = `PUT`) : <br>
```python 
   {
        "title" : title for the book
         "desc" : description for the book
         "thumb_img" : Thumbnail Image File
         "author" : AuthorId
         "genre" : [ GenreIds ]
        "issued_to" : StudentId
        } 
```

**HEADERS**(required when method is `PUT` or `DELETE`) : Authorization : "Token *Token*"<br>

#### 3). View the whole list of students and delete any student <br>

**Viewing the whole lists of students** <br>
`GET`  http://localhost/port/api/student/<br>
**HEADERS** : Authorization : "Token *Token*"<br>

**Deleting Any Student**<br>
`DELETE`   http://localhost/port/api/student/{student-slug}/<br>
**HEADERS** : Authorization : "Token *Token*"<br>


#### 4). Issue a book to a student <br>
`PUT`  http://localhost/port/api/book/{book-slug}/<br>
**BODY PARAMS** : <br>
        {"issued_to" : StudentId}
        <br>
**HEADERS**: Authorization : "Token *Token*"<br>


#### 5). View all the issued books <br>
`GET`  http://localhost:port/api/issued-books/<br>
**HEADERS** : Authorization : "Token *Token*"<br>

### For students <br>
#### 1). A student can see his/her profile <br>

`GET`  http://localhost/port/api/student/<br>
**HEADERS** : Authorization : "Token *Token*"<br>

#### 2). Edit their profile <br>
`PUT` or `DELETE` http://localhost/port/api/student/{student-slug}/<br>
**HEADERS** : Authorization : "Token *Token*"<br>
**BODY PARAMS** : 
 ```python
        {
            "email": "email",
            "name": "Name",
            "image": Image
        }
```
#### 3). Can change password <br>
#### 4). View the issued book by  <br>


## Overview:-

### 1). Planning and design:-<br>
(i) Identify the requirements for the system, including user roles, functionalities, and features.<br>
(ii) Define the database schema for the system, including tables for books, members, loans, reservations, etc.<br>
(iii) Determine the relationships between the tables and create foreign key constraints.<br>
(iv) Decide on the API endpoints needed for the frontend to interact with the backend.<br>
(v) Design the user interface and create mockups of the screens for the frontend<br>

### 2). Setting up the Django Backend:<br>
(i) Create a new Django project and app for the library management system.<br>
(ii) Define the database schema by creating Django models for each table in the database.<br>
(iii) Implement the views and serializers needed for each API endpoint.<br>
(iv) Create URL patterns for the API endpoints.<br>
(v) Implement authentication and authorization for the API using Django's built-in authentication system <br>
(vi) Implement unit tests for the backend.

#### 3). Implementing the Angular Frontend:<br>
(i) Create a new Angular project and app for the library management system.<br>
(ii) Design and implement the user interface by creating components and services.<br>
(iii) Implement the Angular services needed to interact with the backend API endpoints using the HttpClient module.<br>
(iv) Implement authentication and authorization in the frontend by creating a login form and using Angular's guards to restrict access to certain pages.<br>
(v) Create unit tests for the frontend.<br>

