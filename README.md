

![010-20  Converted  2](https://user-images.githubusercontent.com/62821891/120042702-e5a60200-c00a-11eb-8c20-f00801db6c0a.png)

# Greenhouse Web App

The goal of this project is to create an API and Database Structure for Greenhouse Web application.

Assignment Description can be read from this link:

https://gist.github.com/GunesSayin1/983b3254ad2b03c3a59dc354cc4134df



## Database Structure

![Database ER diagram (crow's foot)](C:\Users\Gunes\Downloads\Database ER diagram (crow's foot).png)

### Explanation of Tables and Columns

#### User Table

| User_id                          | user_type                                                    | name         | email                               | password               | phone_number         | address | gender | sub_newsletter                                          | experience                            |
| -------------------------------- | ------------------------------------------------------------ | ------------ | ----------------------------------- | ---------------------- | -------------------- | ------- | ------ | ------------------------------------------------------- | ------------------------------------- |
| UUID type<br />Unique User ID PK | "User","Admin" or "Company Initials + Maintenance i.e. PHL-Maintenance" | Name of User | Login Credential<br />Email of user | SHA256 Hashed Password | Phone Number of user | Address | Gender | Boolean. If user would like to subscribe to newsletter. | Experience with greenhouses in years. |

#### Greenhouse Table

| Greenhouse_id       | User_id                | GH_Type            | Number_of_Spots            | Active                                       | Planting_date                        |
| ------------------- | ---------------------- | ------------------ | -------------------------- | -------------------------------------------- | ------------------------------------ |
| ID of greenhouse PK | FK, User Table.User_id | Type of Greenhouse | Number of spots for plants | Boolean. If the greenhouse is active or not. | Date of planting for current plants. |

#### Plant Table

| Plant_id | Greenhouse_id    | Plant_Type                  | Plant_sensor_amount | Planting_date | Active | Reoccurring |
| -------- | ---------------- | --------------------------- | ------------------- | ------------- | ------ | ----------- |
| Plant Id | FK Greenhouse ID | Type of Plant in Greenhouse | Amount of sensors   | Planting Date |        |             |



#### Produce Table

| Produce_id | Greenhouse_id | User_id | Produce_type | Produce_amount | Planting_Date | Harvesting_date |
| ---------- | ------------- | ------- | ------------ | -------------- | ------------- | --------------- |
| Product Id | FK            | FK      |              |                |               |                 |



#### Sensor Readings Table

| Entry_id | Greenhouse_id | sensor_id | plant_id | sensor_status               | measurement_name    | measurement | measurement_date | maintenance_date | remaining_days_to_maintenance                           | life_expectancy      | remaining_life                                  | sensor_type                       |
| -------- | ------------- | --------- | -------- | --------------------------- | ------------------- | ----------- | ---------------- | ---------------- | ------------------------------------------------------- | -------------------- | ----------------------------------------------- | --------------------------------- |
| PK       | FK            | FK        | FK       | Correctly Working or Faulty | Name of measurement | Measurement | Timestamp        | Maintenance Date | Remaining Days to maintenance from the measurement date | Life Expectancy Date | Remaining Sensor Life from the measurement date | Plant Sensor or Greenhouse Sensor |



#### Sensor Table

| sensor_id | greenhouse_id | User_Id | sensor_type    | model           |
| --------- | ------------- | ------- | -------------- | --------------- |
| PK        | FK            | FK      | Type of Sensor | Model of Sensor |



#### General Plant Info Table

| info_id | plant_name    | GH_CO2          | GH_Temperature                      | Plant_Temperature       | Reoccurring                | Thieving |
| ------- | ------------- | --------------- | ----------------------------------- | ----------------------- | -------------------------- | -------- |
| PK      | Name of Plant | Recommended Co2 | Recommended  Greenhouse Temperature | Recommended Temperature | Is this plant Reoccuring ? | Thieving |



#### Revoked Tokens Table

| token_id | JTI        |
| -------- | ---------- |
| PK       | JTI of JWT |

## Endpoints

### User Related:

/**registration**

- ​	POST. Registers given user credentials to database
  - Required Arguments:
    - **email** = Email of user, also login credential
    - **password**= Password of user, stored as hashed SHA256 in database.
    - **name**= Name of user
    - **phone_number**= Phone number of user
    - **address**= Address of user
    - **gender=** Gender of user
    - **sub_newsletter**= Newsletter subscription
    - **experience**= Experience with greenhouses

**/login**

- POST. Returns access token and refresh token upon succesful login.
  - Required Arguments:
    - **email** = Email of user
    - **password**= Password of user

**/logout**

- POST. Revokes the current access token and refresh token.

- Required Arguments:
  - Access Token = Access Token type JWT. Received during registration or login.
  - Refresh Token = Refresh Token type JWT. Received during registration or login.

### Greenhouse Related:

**/greenhouse/register**

- POST. Registers new greenhouse. Also creates n amount of plants assigned to this greenhouse.
  - Required Arguments:
  - **gh_type** = Type of greenhouse (Aquaponic etc. )
  - **gh_sensors** = Sensors installed in greenhouse.
  - **planting_date** = Date of planting the plants to the greenhouse
  - **reoccurring** = 1 , 0 depending on the reoccurrence of the current plant.
  - **number of spots** = Number of plant spots in greenhouse.
  - **plant type** = Type of plant in the greenhouse
  - **plant sensors** = Sensors installed on plants.
  - **reoccurring** = 1 , 0 . If the current plant is reoccurring or not.

**/greenhouse**

- GET. Returns all greenhouses assigned to the user.

  - Example Response:

  - ```json
    {
        "YourGreenhouses": [
            {
                "greenhouse_id": 66,
                "greenhouse_type": "Aquaponic",
                "plant_type": "Test",
                "planting_date": "2021-05-12"
            },
            {
                "greenhouse_id": 67,
                "greenhouse_type": "Aquaponic",
                "plant_type": "Carrot",
                "planting_date": "2021-05-05"
            }
        ]
    }
    ```

    

**/greenhouse/< int:id >**

- GET. Returns measurement details, number of plants , type for given greenhouse id. Only accessible by assigned users. (This also applies to the all sub routes in this section)

  - Example Response:

  - ```json
    {
        "type": "Aquaponic",
        "number_of_plants": 100,
        "ghmeasurements": [
            {
                "measurement_name": "Ammonia",
                "measurement": 36.36,
                "measurement_date": "2050-08-31 00:00:00"
            },
            {
                "measurement_name": "Co2",
                "measurement": 47.81,
                "measurement_date": "2051-04-29 00:00:00"
            }
        ],
        "plants": [
            {
                "plant_id": 0,
                "measurement_name": "Humidity",
                "measurement": 34.51,
                "measurement_date": "2038-02-01 00:00:00"
            },
            {
                "plant_id": 1,
                "measurement_name": "Humidity",
                "measurement": 47.8,
                "measurement_date": "2035-06-07 00:00:00"
            }
        ]
    }
    ```

    

**/greenhouse/< int:id >/harvest**

- POST. Registers a new produce from the greenhouse. Also, if plants are not reoccurring updates the (Greenhouse Table - Active) column to 0.
  - Required Arguments:
    - **produce_type** = type of produce
    - **produce_amount** = amount of produce
    - **harvesting_date** = date plants are harvested
      - If plant is reoccurring:
        - **planting_date** = Nullable. Date of planting

**/greenhouse/< int:id > / metrics**

- GET. Returns all measurements taken by greenhouse related sensors.

  - Example Response:

  - ```
    {
        "measurements": [
            {
                "measurement_name": "O2",
                "measurement": 58.55,
                "measurement_date": "2021-07-28 00:00:00"
            },
            {
                "measurement_name": "Light",
                "measurement": 38.9,
                "measurement_date": "2021-08-25 00:00:00"
            }
        ]
    }
    ```

    

### Plant Related

**/greenhouse/< int:id > / plants**

- GET. Returns all plants registered to this greenhouse.

  - Example Response:

  - ```json
    {
        "Plants in your greenhouse:": [
            {
                "greenhouse_id": 78,
                "plant_id": 484,
                "plant_type": "Carrot",
                "planting_date": "2021-05-13"
            },
            {
                "greenhouse_id": 78,
                "plant_id": 485,
                "plant_type": "Carrot",
                "planting_date": "2021-05-13"
            }
        ]
    }
    ```

    

**/greenhouse < int:greenhouse_id > / < int:plant_id>**

- GET. Returns all plant measurements for given plant id.

  - Example Response:

  - ```json
    {
        "measurements": [
            {
                "measurement_name": "O2",
                "measurement": 58.55,
                "measurement_date": "2021-07-28 00:00:00"
            },
            {
                "measurement_name": "O2",
                "measurement": 63.69,
                "measurement_date": "2025-08-25 00:00:00"
            }
        ]
    }
    ```

### Produce Related

/**products**

- GET. Returns all products registered to date.

  - Example Response:

  - ```json
    {
        "YourProducts": [
            {
                "produce_id": 2,
                "greenhouse_id": 57,
                "produce_amount": 500,
                "produce_type": "Wheat",
                "harvesting_date": "2021-05-23"
            }
        ]
    }
    ```

**/products/< int:produce_id >**

- GET. Returns average measurements for chosen product. 

  - Example Response:

  - ```json
    {
        "greenhouse": [
            [
                "Ammonia",
                24.12299919128418
            ]
        ],
        "plants": [
            [
                "Co2",
                1.1487142472040086
            ],
        ],
        "produce_name": "Yahni",
        "produce_amount": 500,
        "harvesting_date": "2021-08-30"
    }
    ```

### Sensor Related

Sensor related endpoints don't require  JWT to allow registration and data logging from microcontrollers easily.

**/sensor_register**

- POST. Registers sensor 
  - Required Arguments:
  - email = Email of the user
  - type = Type of sensor (1 = Plant , 0 = Greenhouse)
  - gh_id = ID of greenhouse sensor is registered to.
  - model = Model of sensor

**/sensor_list**

- GET. Returns all sensors assigned to the user.

  - Example Response:

  - ```json
    {
        "Sensors in your account:": [
            {
                "greenhouse_id": 57,
                "sensor_id": 37,
                "sensor_model": "PHL-BME-280",
                "Type of sensor": "Greenhouse (0)"
            },
            {
                "greenhouse_id": 58,
                "sensor_id": 39,
                "sensor_model": "BME123",
                "Type of sensor": "Plant (1)"
            }
        ]
    }
    ```

**/sensor_gh**

- POST. To log greenhouse related sensors.
  - Required Arguments:
  - **email** = Email of user
  - **password** = Password of user
  - **gh_id** = ID of greenhouse, sensor is registered to
  - **sensor_id** = ID of sensor
  - **sensor_status** = Status of sensor (1 = Correctly Working , 0 = Faulty)
  - **measurement_name** = Name of measurement
  - **measurement** = Measurement
    - Optional Arguments:
      - **maintenance_date** = Date of upcoming maintenance
      - **life_expectancy** = Estimated last working date for sensor

**/sensor_plant**

- POST. To log plant related sensors.
  - Required Arguments:
  - **email** = Email of user
  - **password** = Password of user
  - **gh_id** = ID of greenhouse, sensor is registered to
  - **plant_id** = ID of plant, sensor is registered to
  - **sensor_id** = ID of sensor
  - **sensor_status** = Status of sensor (1 = Correctly Working , 0 = Faulty)
  - **measurement_name** = Name of measurement
  - **measurement** = Measurement
    - Optional Arguments:
      - **maintenance_date** = Date of upcoming maintenance
      - **life_expectancy** = Estimated last working date for sensor

### Role Dashboards

**/admin**

- GET. Returns all user , greenhouse , plant data. Only accessible by "admin" type users.

  - Example Response:

  - ```
    {
        "Info": [
            {
                "user_name": "User",
                "user_email": "username",
                "phone_number": "+31000000000",
                "address": "Address",
                "gender": "Unknown",
                "newsletter": 1,
                "experience": "2",
                "greenhouse_id": 66,
                "greenhouse_type": "Aquaponic",
                "planting_date": "2021-05-12",
                "plant_type": "Test",
                "plant_sensor_amount": 2
            }
        ]
    }
    ```

**/maintenance**

- GET. Returns all user , greenhouse data assigned to the maintenance roles first three characters;

  - (If user has ASD-maintenance role, they can access users that have ASD-..... model sensors)

  - Example Response:

  - ```json
    {
        "Maintenance": [
            {
                "user_name": "User",
                "user_email": "username",
                "phone_number": "+31000000000",
                "address": "Address",
                "experience": "2",
                "greenhouse_id": 66,
                "greenhouse_type": "Aquaponic",
            }
        ]
    }
    ```

### Misc

**/token/refresh**

- POST. Returns new access token upon receiving a valid refresh token.

