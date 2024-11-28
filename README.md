<p align="center">
   <a href="http://nestjs.com/" target="blank"><img src="https://github.com/user-attachments/assets/573f1a2b-9f5f-4f30-b516-faeb446dd9c4" width="200" alt="Tamnoon.io Logo" /></a>
</p>

# Tamnoon Take-Home Assignment Backend API

This project is a NestJS web API.

## Project Overview

Tamnoon API is a service built with NestJS that provides a way to manage assets and rules.

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

The Swagger UI includes all the API routes with documentation and the option to submit requests and retrieve responses.

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

## Key Features
- Manage assets - create, edit, and delete assets.
- Manage grouping assets rules - create, edit, and delete rules.
- Rule Engine Processing: Flexible rule definition and execution.

## Assets
Assets represent the resources or entities that rules are evaluated against. Each asset contains properties that can be used in rule conditions.

### Asset Model Structure
```json
{
  "id": "asset-123",
  "name": "prod-web-server",
  "type": "ec2-instance",
  "tags": [
    { "key": "env", "value": "prod" },
    { "key": "team", "value": "web" }
  ],
  "cloudAccount": {
    "id": "cloud-001",
    "name": "AWS"
  },
  "ownerId": "user-123",
  "region": "us-central1",
  "groupName": null
}
```

## Rules
Rules are defined using a combination of filters with logical operators and conditions and evaluated against assets.

### Rule Model Structure

```json
{
  "id": "1",
  "groupName": "instances",
  "filter": {
    "AND": [
      {
        "key": "type",
        "operator": "=",
        "value": "ec2-instance"
      },
      {
        "OR": [
          {
            "key": "tags",
            "operator": "CONTAINS",
            "value": {
              "key": "env",
              "value": "prod"
            }
          },
          {
            "key": "name",
            "operator": "CONTAINS",
            "value": "prod"
          }
        ]
      }
    ]
  }
}
```

### Structure Breakdown

`id`: Unique identifier for the rule

`name`: rule name

`groupName`: Name of the group this rule belongs to or creates

`filter`:  the rule's logic and conditions.

## Filter Structure

Supports nested logical operators (AND, OR)

Can contain multiple conditions at different levels

Condition Components
```json
{
  "key": "property_name",
  "operator": "comparison_operator",
  "value": "expected_value"
}
```

### Available Operators

`=,!=, >, <, >=, <=, EXISTS, NOT_EXISTS`

`CONTAINS` and `NOT CONTAINS`: Partial match or array inclusion

The condition value can be an object
```json
{
  "key": "tags",
  "operator": "CONTAINS",
  "value": {
    "key": "tag_key",
    "value": "tag_value"
  }
}
```


### Example Interpretations
Simple Type Check:
```json
{
  "key": "type",
  "operator": "=",
  "value": "ec2-instance"
}
```

Matches assets where type equals "ec2-instance"


Tag Check:
```json
{{
  "key": "tags",
  "operator": "CONTAINS",
  "value": {
    "key": "env",
    "value": "prod"
  }
}
```

Matches assets that have a tag with key "env" and value "prod"


Name Check:
```json
{{
  "key": "name",
  "operator": "CONTAINS",
  "value": "prod"
}
```

Matches assets where name contains "prod"


### Logical Operators

1. AND Operation -All conditions must be true and can contain nested OR conditions
```json
{
  "AND": ["condition1", "condition2"]
}
```

2. OR Operation - Any condition can be true and can be nested within AND conditions

```json
{
  "OR": ["condition1", "condition2"]
}
```

### Rule Evaluation Example
For an asset:
```json
{
  "id": "asset-1",
  "type": "ec2-instance",
  "name": "prod-server",
  "tags": [
    {
      "key": "env",
      "value": "prod"
    }
  ]
}
```
The example rule would match because:

1. The type equals "ec2-instance" (first AND condition)
2. Either:
   *The tags contain {key: "env", value: "prod"} OR
   *The name contains "prod" (second AND condition with nested OR)

## Notes

### Mock Data
- The project currently uses mock data for development and testing purposes
- Mock data files are located in:
  - `src/modules/assets/data/assets-mock-data.ts` folder: Contains assets mock data.
  - `src/modules/rules/data/rules-mock-data.ts` folder: Contains rule definition mock data.
- These mock data files serve as examples and can be used as templates for real data structures.
- The current implementation in controllers and services uses `async/await` syntax, although it's not strictly necessary in the current implementation. This is intentional and serves as preparation for future integration with real database clients and async operations.

### Development TODOs
1. Entity to DTO Mapping
   - Implement proper mapping between database entities and DTOs
   - Consider using tools like `class-transformer` or `automapper`
   - Ensure type safety and validation in the mapping process

2. Test Coverage
   - Increase unit test coverage across all services

3. Rule Schema Validation
   - Dedicate more time to improve and expand rule schema validation

## Contact

If you have any questions or need further clarification, please contact me at [ozshimon21@gmail.com](ozshimon21@gmail.com).

Thank you for reviewing this project!
