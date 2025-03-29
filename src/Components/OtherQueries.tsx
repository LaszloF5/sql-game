import React, { FC, useState } from "react";
import axios from "axios";

const OtherQueries: FC = () => {

    const [otherQuery, setOtherQuery] = useState<string>('');


    // insert query
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (otherQuery.length === 0) {
            alert('Please enter a query');
            return;
        }
        try {
            const response = await axios.put('/api/session', {
                otherQuery
            })
        } catch (e) {
            console.error('Error:', e);
            alert('An error occurred. Please try again later.');
        }
    }
  return (
    <div>
      <h2>Other Queries</h2>
      <main className="otherQueries-container">
        <form action="#" method="post">
            <label htmlFor="test">Test query</label>
            <input type="text" id="test" name='otherQuery' value={otherQuery} onChange={(e) => setOtherQuery(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default OtherQueries;
