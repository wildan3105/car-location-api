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
| distance      | Number (float) | Total distance from certain point to each item in search result |
| distance_unit      | String | Unit that represents the length of distance, could be in kilometer/meter |

## General Knowledge
There are several responses from this set of APIs. These are the general reponses for every HTTP status code:
- 200 OK
```javascript
{
    status: true,
    timetamp: 1563941253850,
    data: [
        {
            name: 'some data will appear here'
        }
    ]
}
```
- 404 Not Found
```javascript
{
    status: false,
    timestamp: 1563941253850,
    message: 'Item with id `384738` is not found'
}
```
- 400 Bad Request
```javascript
{
    status: false,
    timestamp: 1563941253850,
    message: 'Wrong type of latitude/longitude!'
}
```

## Endpoints:

## Get all cars 

## Get a car by id
```sh
GET http://localhost:3000/cars/:id
```

### Parameter
| Name        | Type         | Description  |
| ------------- |-------------| -----|
| id      | String | **Required**. If not provided, it will be assumed as `/cars` endpoint. |

### Response

```
Status: 200 OK
Location: http://localhost:3000/cars/12
```
```javascript
{
  "status": true,
  "timestamp": 1564024053719,
  "data": [
    {
      "latitude": 1.3427646666,
      "is_on_trip": false,
      "id": 12,
      "longitude": 103.702624166,
      "location_name": "Kamar-Taj"
    }
  ]
}
```

```
Status: 404 NOT FOUND
Location: http://localhost:3000/cars/12345
```
```javascript
{
  "status": false,
  "message": "Car with id '12345' is not found"
}
```


## Search car