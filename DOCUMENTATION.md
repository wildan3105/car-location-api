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
These are the general reponses for every HTTP status code:
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
```sh
GET http://localhost:3000/cars
```

### Query
| Name        | Type         | Description  |
| ------------- |-------------| -----|
| where      | Object | **Optional**. Exact match for car with `id` (number), `location_name` (string), and `is_on_trip` (boolean). If not provided, it will return all cars. |
| order_name | String | **Optional**. Order car(s) by `id` / `location_name` / `is_on_trip`. If not provided, it will order car(s) by id ascendingly. |
| order_type | String | **Optional**. Order type whether `asc` (from smallest to largest) or `desc` (from largest to smallest). If not provided but `order_name` is provided, it will order car(s) by id ascendingly. |
| from       | Number | **Optional**. Skip n-items. Default is 0. Minimum is 0 and maximum is total data (25). |
| size       | Number | **Optional**. Display n-items. Default is 10. Minimum is 0 (will display empty data) and maximum is total data (25). |

### Response
- WHERE FILTER (id)
```
Status: 200 OK
Query: where: { "id": 1}
Location: http://localhost:3000/cars?where=%7B%22id%22%3A%201%20%7D
```
```javascript
{
  "status": true,
  "timestamp": 1563981291594,
  "total": 1,
  "data": [
    {
      "latitude": "1.3258246666",
      "is_on_trip": true,
      "id": 1,
      "longitude": "103.775143166",
      "location_name": "Gotham City"
    }
  ]
}
```
- WHERE FILTER (location_name)
```
Status: 200 OK
Query: where: { "location_name": "Gotham City" }
Location: http://localhost:3000/cars?where=%7B%20%22location_name%22%3A%20%22Gotham%20City%22%20%7D
```
```javascript
{
  "status": true,
  "timestamp": 1564026468206,
  "total": 1,
  "data": [
    {
      "latitude": 1.3258246666,
      "is_on_trip": false,
      "id": 1,
      "longitude": 103.775143166,
      "location_name": "Gotham City"
    }
  ]
}
```
- WHERE FILTER (is_on_trip)
```
Status: 200 OK
Query: where: { "is_on_trip": true }
Location: http://localhost:3000/cars?where=%7B%20%22is_on_trip%22%3A%20true%20%7D
```
```javascript
{
  "status": true,
  "timestamp": 1564026391561,
  "total": 3,
  "data": [
    {
      "latitude": 1.2892128333,
      "is_on_trip": true,
      "id": 3,
      "longitude": 103.812455333,
      "location_name": "Blüdhaven"
    },
    {
      "latitude": 1.3393671666,
      "is_on_trip": true,
      "id": 18,
      "longitude": 103.907343,
      "location_name": "The Citadel"
    },
    {
      "latitude": 1.3420098333,
      "is_on_trip": true,
      "id": 23,
      "longitude": 103.705182,
      "location_name": "Bedrock"
    }
  ]
}
```
- ORDER FILTER
```
Status: 200 OK
Query: order_name: id & order_type: desc
Location: http://localhost:3000/cars?order_name=id&order_type=desc
```
```javascript
{
  "status": true,
  "timestamp": 1564026510417,
  "total": 25,
  "data": [
    {
      "latitude": 1.4353171666,
      "is_on_trip": false,
      "id": 25,
      "longitude": 103.780482333,
      "location_name": "South Park"
    },
    {
      "latitude": 1.3984893333,
      "is_on_trip": false,
      "id": 24,
      "longitude": 103.745537333,
      "location_name": "New Vegas"
    },
    ...
    ]
}
```
- PAGINATION FILTER
```
Status: 200 OK
Query: from: 1 & size: 2
Location: http://localhost:3000/cars?from=1&size=2
```
```javascript
{
  "status": true,
  "timestamp": 1564026796089,
  "total": 25,
  "data": [
    {
      "latitude": 1.3435921666,
      "is_on_trip": false,
      "id": 2,
      "longitude": 103.701648666,
      "location_name": "Metropolis"
    },
    {
      "latitude": 1.2892128333,
      "is_on_trip": true,
      "id": 3,
      "longitude": 103.812455333,
      "location_name": "Blüdhaven"
    }
  ]
}
```
- INTEGRATION FILTER
```
Status: 200 OK
Query: where: { "is_on_trip": true }, order_name: location_name, order_type: desc, from: 0, size: 2
Location: http://localhost:3000/cars?where=%7B%22is_on_trip%22%3A%20true%7D&order_name=location_name&order_type=desc&from=0&size=2
```
```javascript
{
  "status": true,
  "timestamp": 1564026876087,
  "total": 3,
  "data": [
    {
      "latitude": 1.3393671666,
      "is_on_trip": true,
      "id": 18,
      "longitude": 103.907343,
      "location_name": "The Citadel"
    },
    {
      "latitude": 1.2892128333,
      "is_on_trip": true,
      "id": 3,
      "longitude": 103.812455333,
      "location_name": "Blüdhaven"
    }
  ]
}
```

## Get a car by id
```sh
GET http://localhost:3000/cars/:id
```

### Parameter
| Name        | Type         | Description  |
| ------------- |-------------| -----|
| id      | Number | **Required**. The id of the car. If not provided, it will be assumed as `/cars` endpoint. |

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
```sh
GET http://localhost:3000/cars/search
```

### Query
| Name        | Type         | Description  |
| ------------- |-------------| -----|
| coordinates      | Object | **Required**. The coordinates of the certain point. Accepts an object with a `lat / latitude` AND a `lon / lng / longitude` property . If not provided, it will throw an error. |
| radius      | Object | **Optional**. The search radius from certain point in meter. If not provided, it will be set to default 5000 meters. |
| unit      | Object | **Optional**. The unit of distance from certain point to each result item's point (kilometer / meter). If not provided, it will be set to default in meters. |
| from       | Number | **Optional**. Skip n-items. Default is 0. Minimum is 0 and maximum is total data (25). |
| size       | Number | **Optional**. Display n-items. Default is 10. Minimum is 0 (will display empty data) and maximum is total data (25). |

### Response
```
Status: 200 OK
Query: coordinates: { "lat": 1.3258246666, "lon": 103.775143166 }, radius: 4000, unit: kilometer, size: 3
Location: http://localhost:3000/cars/search?coordinates=%7B%22latitude%22%3A1.3258246666,%20%22lon%22%3A103.775143166%7D&radius=4000&unit=kilometer&size=2
```
```javascript
{
  "status": true,
  "timestamp": 1564028268111,
  "total": 5,
  "data": [
    {
      "latitude": 1.3258246666,
      "is_on_trip": false,
      "id": 1,
      "longitude": 103.775143166,
      "location_name": "Gotham City",
      "distance": 0,
      "distance_unit": "kilometer"
    },
    {
      "latitude": 1.3144906666,
      "is_on_trip": false,
      "id": 14,
      "longitude": 103.765355499,
      "location_name": "Thugz Mansion",
      "distance": 1.66,
      "distance_unit": "kilometer"
    },
    {
      "latitude": 1.314859,
      "is_on_trip": false,
      "id": 9,
      "longitude": 103.764875499,
      "location_name": "Smallville",
      "distance": 1.666,
      "distance_unit": "kilometer"
    }
  ]
}
```