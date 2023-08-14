# movie-crud
This is a mini project about Movies CRUD  <br />
this project has unit testing using jest and supertest  <br />
run testing by using command  `npm run test`

## MOVIES

List of available endpoints:
​
-   `POST /Movies`
-   `GET /Movies`
-   `GET /Movies/:ID`
-   `PATCH /Movies/:ID`
-   `DELETE /Movies/:ID`

 ## Add Movie
----
* **URL**

    ``/Movies`

* **Method:**
  
    ``POST` 
  
*  **URL Params** : none

* **Data Params**
  * **Body:** <br />
  ```json
    {
        "title": "Pengabdi Setan 2 Comunion", //string
        "image": "", //string
        "description": "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", //string
        "rating": 7.0 //float
    }
  ```
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
    {
        "message": "Movie added succesfully",
        "movie": {
            "id": 1,//number
            "title": "Pengabdi Setan 2 Comunion", //string
            "image": "", //string
            "description": "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", //string
            "rating": 7.0 //float
            "updatedAt": "2023-08-14T06:15:46.261Z", //date
            "createdAt": "2023-08-14T06:15:46.261Z" //date
        }   
    }
  ```
 
* **Error Response:**
   * **Code:** 404 <br />
      **Content:** 
      ```json
        {
            "error": [
                "Incomplete Data, please check and complete inputted data"
            ]
        }
      ```
    * **Code:** 404 <br />
      **Content:** 
      ```json
        {
            "error": [
                "rating value must be number"
            ]
        }
      ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "title value must be string"
                ]
            }
        ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "image value must be string"
                ]
            }
        ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "description value must be string"
                ]
            }
        ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "rating value must below 10 and larger than 0"
                ]
            }
        ```
    * **Code:** 500 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "internal server error"
                ]
            }
        ```

## Get Movie by ID
----
* **URL**

    ``/Movies/:ID"`

* **Method:**
  
    ``GET` 

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
    {
        "message": "heres the detail of the movie:",
        "movie": {
                 "id": 1,//number
                "title": "Pengabdi Setan 2 Comunion", //string
                "image": "", //string
                "description": "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", //string
                "rating": 7.0 //float
                "updatedAt": "2023-08-14T06:15:46.261Z", //date
                "createdAt": "2023-08-14T06:15:46.261Z" //date
        },
    }
  ```
* **Error Response:**
    * **Code:** 404 <br />
    **Content:** 
    ```json
    {
        "error": [
            "Data not found, please recheck id parameter"
        ]
    }
    ```
    * **Code:** 400 <br />
    **Content:** 
    ```json
    {
        "error": [
            "invalid input syntax"
        ]
    }
    ```
    * **Code:** 500 <br />
    **Content:** 
    ```json
    {
        "error": [
            "internal server error"
        ]
    }
    ```

## Get All Movie
----
* **URL**

    ``/Movies"`

* **Method:**
  
    ``GET` 

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
    {
        "message": "heres your movie list:",
        "movie": [
            {
                 "id": 1,//number
                "title": "Pengabdi Setan 2 Comunion", //string
                "image": "", //string
                "description": "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", //string
                "rating": 7.0 //float
                "updatedAt": "2023-08-14T06:15:46.261Z", //date
                "createdAt": "2023-08-14T06:15:46.261Z" //date
            },
        ]
    }
  ```
 
* **Error Response:**
   * **Code:** 500 <br />
    **Content:** 
    ```json
    {
        "error": [
            "internal server error"
        ]
    }
    ```

## Update Movie
----
* **URL**

    ``/Movies/:ID`

* **Method:**
  
    ``PATCH` 
  
*  **URL Params** : none

* **Data Params**
  * **Body:** <br />
  ```json
    {
        "title": "Pengabdi Setan 2 Comunion", //string
        "image": "", //string
        "description": "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", //string
        "rating": 7.0 //float
    }
  ```
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
    {
        "message": "Movie updated succesfully",
        "movie": [
            {
                "id": 1,//number
                "title": "Pengabdi Setan 2 Comunion", //string
                "image": "", //string
                "description": "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", //string
                "rating": 7.0 //float
                "updatedAt": "2023-08-14T06:15:46.261Z", //date
                "createdAt": "2023-08-14T06:15:46.261Z" //date
            }   
        ]
    }
  ```
 
* **Error Response:**
   * **Code:** 404 <br />
      **Content:** 
      ```json
        {
            "error": [
                "Incomplete Data, please check and complete inputted data"
            ]
        }
      ```
    * **Code:** 404 <br />
      **Content:** 
      ```json
        {
            "error": [
                "rating value must be number"
            ]
        }
      ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "title value must be string"
                ]
            }
        ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "image value must be string"
                ]
            }
        ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "description value must be string"
                ]
            }
        ```
    * **Code:** 404 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "rating value must below 10 and larger than 0"
                ]
            }
        ```
    * **Code:** 500 <br />
        **Content:** 
        ```json
            {
                "error": [
                    "internal server error"
                ]
            }
        ```

## Delete Movie by ID
----
* **URL**

    ``/Movies/:ID"`

* **Method:**
  
    ``DELETE` 

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
    {
        "message": "movie has been deleted",
    }
  ```
* **Error Response:**
    * **Code:** 404 <br />
    **Content:** 
    ```json
    {
        "error": [
            "Data not found, please recheck id parameter"
        ]
    }
    ```
    * **Code:** 400 <br />
    **Content:** 
    ```json
    {
        "error": [
            "invalid input syntax"
        ]
    }
    ```
    * **Code:** 500 <br />
    **Content:** 
    ```json
    {
        "error": [
            "internal server error"
        ]
    }
    ```
