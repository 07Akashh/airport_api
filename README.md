# Assignment for the nodeJS internship
The Airport API project includes a GET endpoint that enables users to retrieve detailed information about airports by searching with an IATA code. The API provides comprehensive details such as the airport's name, location coordinates, elevation, and associated city and country information. This allows users to conveniently access specific airport data integrated with city and country details.

## Table of Contents

1. [Models](#models)
   - [Airport](#airport)
   - [City](#city)
   - [Country](#country)
2. [API Endpoints](#api-endpoints)
   - [GET /api/airport](#get-apiairport)
3. [Installation](#installation)
4. [How to Run](#how-to-run)
5. [API Endpoint URL](#api-url)
6. [Example output](#example-output)
7. [Contributing](#contributing)
8. [License](#license)

---

## Models

### Airport

The Airport model includes `id`, `icao_code`, `iata_code`, `name`, `type`, `latitude_deg`, `longitude_deg`, `elevation_ft`, `created_at`, `updated_at`, `wikipedia_link`, `website_url`, `country_id`, and `continent_id`. It manages airport details, geographical coordinates, elevation, timestamps, links, and relationships with countries and continents for efficient data organization and retrieval.

### City

The City model features `id`, `name`, `country_id`, `is_active`, `lat`, `long`, `alt_name`, `created_at`, and `updated_at`. It establishes a relationship with the Country table via `country_id` to identify the city's country. This structure supports efficient city data management and geographical associations within the database.
### Country
The Country model includes `id`, `name`, `country_code_two`, `country_code_three`, `mobile_code`, and `continent_id`, linking to the Continent table. This setup enables efficient management of country data and geographical associations. Each country record uniquely identifies its name, codes, dialing prefix, and continent location within the database.
## Folder Structure

```bash
airport_api/
├── node_modules/
├── routes/
│    └── airport.js
├── middleware/ 
│    └── errorHandling.js 
│── db/ 
│    └── index.js
├── .env
├── .gitignore
├── README.md
├── package.json
└── server.js
```

## API Endpoints

### GET /api/airport

- **Description:** Retrieve details of an airport by `iata_code`.
- **Parameters:**
  - `iata_code`: Required. The IATA code of the airport.
- **Response:** JSON object containing airport details or an error message.

---

## Installation

To install and configure the project, ensure Node.js and PostgreSQL are installed. Clone the repository, install dependencies. This setup ensures all dependencies are correctly installed and the database is configured for seamless project execution.

```bash
# Clone this repository
git clone https://github.com/07Akashh/airport_api.git
# Go to the directory airport_api
cd airport_api
# install node modules and dependencies
npm install
```
### Installation For Docker 
To install the docker image first please ensure you have installed docker.
```bash
# pull Docker Image
docker pull rahulksoftdev/airport-api
```
## How to Run
To start or run your application, use the following command:

```bash
# Run the API by using these codes
node server.js
```
or
```bash
npm start
```
### Run in Docker
To run in docker you can run the image from gui docker software or by running this comand 
```bash
docker run -d -p 3000:3000 --name airport-api-container rahulksoftdev/airport-api
```
## API URL
```bash
http://localhost:3000/api/airport?iata_code=DEL
```
## Example Output
```bash
{
    "airport": {
        "id": 1748,
        "icao_code": "VIDP",
        "iata_code": "DEL",
        "name": "Indira Gandhi International Airport",
        "type": "large_airport",
        "latitude_deg": "28.555630",
        "longitude_deg": "77.095190",
        "elevation_ft": 777,
        "address": {
            "city": {
                "id": 29289,
                "name": "New Delhi",
                "country_id": 76,
                "is_active": true,
                "lat": "28.613900",
                "long": "77.208900",
                "alt_name": null,
                "created_at": "2024-07-01T09:22:30.012Z",
                "updated_at": "2024-07-01T09:22:30.012Z"
            },
            "country": {
                "id": 76,
                "name": "India",
                "country_code_two": "IN",
                "country_code_three": "IND",
                "mobile_code": 91,
                "continent_id": 1
            }
        }
    }
}
```
## Contributing
Contributions to this project are welcome. To contribute, please follow these guidelines:

- Reporting Issues: Use the issue tracker to report any problems or bugs.
- Submitting Enhancements: Fork the repository, create a new branch, and submit a pull request with your enhancements.
- Pull Requests: Ensure your pull request adheres to any guidelines specified in the repository.
- 
## License
Specify the license under which your project is distributed. For example:

This project is licensed under the MIT License.

### Usage:
1. Copy the above Markdown content.
2. Replace placeholders (`link-to-license-file`, etc.) with actual links and details relevant to your project.
3. Save the content in a Markdown file (e.g., `README.md`) within your project's root directory.

This structured format provides clear instructions on running, testing, contributing, and licensing your project, making it easier for others to understand and engage with your work. Adjust the sections and details according to your specific project needs and preferences.
