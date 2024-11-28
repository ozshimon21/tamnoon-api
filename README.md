<p align="center">
   <a href="http://nestjs.com/" target="blank"><img src="https://github.com/user-attachments/assets/573f1a2b-9f5f-4f30-b516-faeb446dd9c4" width="200" alt="Tamnoon.io Logo" /></a>
</p>

# Tamnoon Take-Home Assignment Backend API

This project is a NestJS web API.

## Project Overview

Tamnoon API is a service built with NestJS that provides a way to manage assets and rules.

## Key Features
- Manage assets - create, edit, and delete assets.
- Manage grouping assets rules - create, edit, and delete rules.
- Rule Engine Processing: Flexible rule definition and execution.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16 or higher recommended)
- npm (v6.0.0 or later)

## Installation

To install the project, follow these steps:

1. Clone the repository:
   `git clone https://github.com/ozshimon21/tamnoon-api.git`

2. Navigate to the project directory:
   `cd tamnoon`

3. Install the dependencies:
   `npm install`

## Development

Linting: `npm run lint`

Formatting: `npm run format`

## Running the Application

To run the application in development mode, use the following command:

`npm run start:dev`

This will start the development server. Open [http://localhost:3000/swagger](http://localhost:3000/swagger) to view Swagger web UI.

## Running the Tests

`npm run test`

This will run the project tests.

`npm run test:watch`

This will run the project tests in interactive watch mode.

## Building for Production

To build the app for production, use: `npm run build`

This builds the app for production to the `dist` folder.

## Technical Stack
- NestJS as the primary framework
- Swagger for API documentation
- TypeScript for type-safe code
- Jest for unit testing

## Notes

### Mock Data
- The project currently uses mock data for development and testing purposes
- Mock data files are located in:
  - `src/modules/assets/data/assets-mock-data.ts` folder: Contains assets mock data.
  - `src/modules/rules/data/rules-mock-data.ts` folder: Contains rule definition mocks data.
- These mock data files serve as examples and can be used as templates for real data structures.

### Development TODOs
1. Entity to DTO Mapping
   - Implement proper mapping between database entities and DTOs
   - Consider using tools like `class-transformer` or `automapper`
   - Ensure type safety and validation in the mapping process

2. Test Coverage
   - Increase unit test coverage across all services

## Contact

If you have any questions or need further clarification, please contact me at [ozshimon21@gmail.com](ozshimon21@gmail.com).

Thank you for reviewing this project!
