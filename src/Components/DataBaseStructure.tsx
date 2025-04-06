import React, { FC } from "react";
import "../Styles/DataBaseStructure.css";

const DataBaseStructure: FC = () => {
  return (
    <div>
      <h2>Database Structure</h2>

      <h3>Persons table</h3>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Column Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>INTEGER, AUTOINCREMENT</td>
              <td>Unique identifier for the person</td>
            </tr>
            <tr>
              <td>name</td>
              <td>TEXT</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>age</td>
              <td>INTEGER</td>
              <td>Age</td>
            </tr>
            <tr>
              <td>ssn</td>
              <td>INTEGER</td>
              <td>Social Security Number</td>
            </tr>
            <tr>
              <td>gender</td>
              <td>TEXT</td>
              <td>Gender</td>
            </tr>
            <tr>
              <td>email</td>
              <td>TEXT</td>
              <td>Email address</td>
            </tr>
            <tr>
              <td>phone</td>
              <td>TEXT</td>
              <td>Phone number</td>
            </tr>
            <tr>
              <td>address</td>
              <td>TEXT</td>
              <td>Address</td>
            </tr>
            <tr>
              <td>city</td>
              <td>TEXT</td>
              <td>City</td>
            </tr>
            <tr>
              <td>eye_color</td>
              <td>TEXT</td>
              <td>Eye color</td>
            </tr>
            <tr>
              <td>hair_color</td>
              <td>TEXT</td>
              <td>Hair color</td>
            </tr>
            <tr>
              <td>car_type</td>
              <td>TEXT</td>
              <td>Car type</td>
            </tr>
            <tr>
              <td>bike_type</td>
              <td>TEXT</td>
              <td>Bike type</td>
            </tr>
            <tr>
              <td>car_registration_number</td>
              <td>TEXT</td>
              <td>Car registration number</td>
            </tr>
            <tr>
              <td>motorbike_registration_number</td>
              <td>TEXT</td>
              <td>Motorbike registration number</td>
            </tr>
            <tr>
              <td>annual_income</td>
              <td>INTEGER</td>
              <td>Annual income</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Example</h4>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>ssn</th>
              <th>gender</th>
              <th>email</th>
              <th>phone</th>
              <th>address</th>
              <th>city</th>
              <th>eye_color</th>
              <th>hair_color</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>30</td>
              <td>123456</td>
              <td>Male</td>
              <td>john@example.com</td>
              <td>555-1234</td>
              <td>123 Main St, NY</td>
              <td>New York</td>
              <td>Blue</td>
              <td>Brown</td>
              <td>...</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>28</td>
              <td>789012</td>
              <td>Female</td>
              <td>jane@example.com</td>
              <td>555-5678</td>
              <td>456 Oak St, LA</td>
              <td>Los Angeles</td>
              <td>Green</td>
              <td>Black</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Police_db</h3>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Column Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>INTEGER, AUTOINCREMENT</td>
              <td>Unique crime identifier</td>
            </tr>
            <tr>
              <td>crime_type</td>
              <td>TEXT</td>
              <td>Type of crime</td>
            </tr>
            <tr>
              <td>city</td>
              <td>TEXT</td>
              <td>City where the crime occurred</td>
            </tr>
            <tr>
              <td>crime_report</td>
              <td>TEXT</td>
              <td>Crime report</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Example</h4>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>crime_type</th>
              <th>city</th>
              <th>crime_report</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Theft</td>
              <td>New York</td>
              <td>Report 1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Robbery</td>
              <td>Los Angeles</td>
              <td>Report 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Secret_hacker_db</h3>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Column Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>INTEGER, AUTOINCREMENT</td>
              <td>Unique identifier</td>
            </tr>
            <tr>
              <td>witness_testimony</td>
              <td>TEXT</td>
              <td>Witness testimony</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Example</h4>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>witness_testimony</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Part of a story</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Zoo</h3>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Column Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>INTEGER, AUTOINCREMENT</td>
              <td>Unique identifier for the visitor</td>
            </tr>
            <tr>
              <td>name</td>
              <td>TEXT</td>
              <td>Name of the visitor</td>
            </tr>
            <tr>
              <td>visit_date</td>
              <td>TEXT</td>
              <td>Date of the visit</td>
            </tr>
            <tr>
              <td>hair_color</td>
              <td>TEXT</td>
              <td>Hair color of the visitor</td>
            </tr>
            <tr>
              <td>ticket_type</td>
              <td>TEXT</td>
              <td>Type of ticket (e.g., adult, child, vip)</td>
            </tr>
            <tr>
              <td>person_id</td>
              <td>INTEGER</td>
              <td>Foreign key referencing the Persons table</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Relationships Between Tables:</h4>
      <p>
        This table's 'person_id' column references 'id' in the Persons table. If
        a person is deleted, the corresponding zoo visit is also deleted ('ON
        DELETE CASCADE').
      </p>

      <h4>Example</h4>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>visit_date</th>
              <th>hair_color</th>
              <th>ticket_type</th>
              <th>person_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>2023-03-10</td>
              <td>Brown</td>
              <td>Adult</td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>2022-06-26</td>
              <td>Black</td>
              <td>Child</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Session</h3>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Column Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>INTEGER, AUTOINCREMENT</td>
              <td>Unique identifier for each fruit</td>
            </tr>
            <tr>
              <td>fruit_name</td>
              <td>TEXT</td>
              <td>Name of the fruit</td>
            </tr>
            <tr>
              <td>quantity</td>
              <td>TEXT</td>
              <td>Quantity of the fruit</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Example</h4>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>fruit_type</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>apple</td>
              <td>1kg</td>
            </tr>
            <tr>
              <td>2</td>
              <td>banana</td>
              <td>2kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataBaseStructure;
