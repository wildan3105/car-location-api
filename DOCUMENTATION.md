# API DOCUMENTATION

## Data fields definition: 
| Field        | Type         | Description  |
| ------------- |-------------| -----|
| id      | Number | Unique ID of the car |
| is_on_trip      | Boolean | Car availability status; if it's true then the car is currently on trip and can't be booked and vice versa |
| latitude      | Number (float) | Unit that represents the coordinates of the car location in a range of -90 to 90 |
| longitude      | Number (float) | Unit that represents the coordinates of the car location in a range of -180 to 180 |
| location_name      | String | Name of the location |

When use the endpoint `/cars/search`, there will be two additional fields:

| Field        | Type         | Description  |
| ------------- |-------------| -----|
| distance      | Number | Total distance from certain point to each item in search result |
| distance_unit      | String | Unit that represents the length of distance, could be in meters/km |

## Endpoints:

1. /cars

2. /cars/:id

3. /cars/search