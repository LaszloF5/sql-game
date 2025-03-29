import React, { FC } from "react";
import '../Styles/DataBaseStructure.css';

const DataBaseStructure: FC = () => {
  return (
    <div>
      <h2>Database Structure</h2>
      <pre className='db-structure'>
        {`
               Table Relationships and Data Types (SQLite Structure)

1. Persons Table
   Stores basic information about persons.
   - id (INTEGER, AUTOINCREMENT) - Unique identifier for the person
   - name (TEXT) - Name
   - age (INTEGER) - Age
   - ssn (INTEGER) - Social Security Number
   - gender (TEXT) - Gender
   - email (TEXT) - Email address
   - phone (TEXT) - Phone number
   - address (TEXT) - Address
   - city (TEXT) - City
   - eye_color (TEXT) - Eye color
   - hair_color (TEXT) - Hair color
   - car_type (TEXT) - Car type
   - bike_type (TEXT) - Bike type
   - car_registration_number (TEXT) - Car registration number
   - motorbike_registration_number (TEXT) - Motorbike registration number
   - annual_income (INTEGER) - Annual income

2. Police_db Table  
   Stores crime-related data.
   - id (INTEGER, AUTOINCREMENT) - Unique crime identifier
   - crime_type (TEXT) - Type of crime
   - city (TEXT) - City where the crime occurred
   - crime_report (TEXT) - Crime report

3. Secret_hacker_db Table  
   Stores secret hacker-related data.
   - id (INTEGER, AUTOINCREMENT) - Unique identifier
   - witness_testimony (TEXT) - Witness testimony

4. Crimes Table  
   Stores data related to crimes committed.
   - id (INTEGER, AUTOINCREMENT) - Unique crime identifier
   - date (TEXT) - Date of the crime
   - crime_type (TEXT) - Type of crime
   - name (TEXT) - Name of the person who committed the crime
   - location (TEXT) - Location of the crime
   - person_id (INTEGER) - Reference to the Persons table (foreign key) indicating the person who committed the crime
   - Relationship: The id in this table refers to the id from the Persons table. If a person is deleted, the corresponding crimes will also be deleted (ON DELETE CASCADE).

5. Zoo Table  
   Stores data about zoo visitors.
   - id (INTEGER, AUTOINCREMENT) - Unique identifier for the visitor
   - name (TEXT) - Name of the visitor
   - visit_date (TEXT) - Date of the visit
   - hair_color (TEXT) - Hair color of the visitor
   - ticket_type (TEXT) - Type of ticket (e.g., adult, child)
   - person_id (INTEGER) - Reference to the Persons table (foreign key) indicating the person who visited the zoo
   - Relationship: The id in this table refers to the id from the Persons table. If a person is deleted, the corresponding zoo visit will also be deleted (ON DELETE CASCADE).

### Relationships Between Tables:

- Crimes Table: The 'person_id' column references the id column of the Persons table. This ensures that each crime is associated with a specific person.
  
- Zoo Table: The 'person_id' column references the id column of the Persons table. This relationship allows you to associate zoo visits with a specific person.

### Example Data for Tables:

Persons Table
| id  | name         | age | ssn    | gender | email           | phone     | address          | city    | eye_color | hair_color | ...  |
|-----|--------------|-----|--------|--------|-----------------|-----------|------------------|---------|-----------|------------|------|
| 1   | John Doe     | 30  | 123456 | Male   | john@example.com| 555-1234  | 123 Main St, NY  | New York| Blue      | Brown      | ...  |
| 2   | Jane Smith   | 28  | 789012 | Female | jane@example.com| 555-5678  | 456 Oak St, LA   | Los Angeles| Green     | Black      | ...  |

Police_db Table
| id  | crime_type | city        | crime_report    |
|-----|------------|-------------|-----------------|
| 1   | Theft      | New York    | Report 1        |
| 2   | Robbery    | Los Angeles | Report 2        |

Crimes Table
| id  | date       | crime_type | name       | location    | person_id |
|-----|------------|------------|------------|-------------|-----------|
| 1   | 2025-03-01 | Theft      | John Doe   | 123 Main St | 1         |
| 2   | 2025-03-02 | Robbery    | Jane Smith | 456 Oak St  | 2         |

Zoo Table
| id  | name        | visit_date  | hair_color | ticket_type | person_id |
|-----|-------------|-------------|------------|-------------|-----------|
| 1   | John Doe    | 2025-03-15  | Brown      | Adult       | 1         |
| 2   | Jane Smith  | 2025-03-16  | Black      | Child       | 2         |

               `}
      </pre>
    </div>
  );
};

export default DataBaseStructure;
