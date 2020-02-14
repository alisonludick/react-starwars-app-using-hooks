import React, { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import StarWarsList from './components/StarWarsList';
import styled from "styled-components";

const People = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 50px 50px;
	.person {
		width: 100%;
		max-width: calc(33.33% - 20px);
		flex-basis: calc(33.33% - 20px);
		margin-top: 25px;
		padding: 20px;
		background-color: rgba(255,255,255, .65);
		h2 {
      color: salmon;
      text-shadow: 1px 1px darkgrey; 
			margin-bottom: 10px;
		}
		p {
			line-height: 1.5rem;
		}
		/* for tablets */
		@media only screen and (min-width: 741px) and (max-width: 1024px) {
			max-width: calc(50% - 5px);
			flex-basis: calc(50% - 20px); 	
    	}
		/* for mobile phones */
		@media only screen and (max-width: 740px) {
			max-width: calc(100% - 5px);
			flex-basis: calc(100% - 20px); 	
    	}
	}
`;

const App = () => {
	// Try to think through what state you'll need for this app before starting. Then build out
	// the state properties here.
	const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
	// Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
	// side effect in a component, you want to think about which state and/or props it should
	// sync up with, if any.
	useEffect(() => {
		axios.get(`https://swapi.co/api/people?page=${page}`)
		.then(response => {
			console.log(response);
			setPeople(response.data.results);
		})
		.catch(error => console.error(error))
		return () => {
			console.log('cleanup')
		}
	}, [page]);
	return (
		<div className="App">
			<div className="header">
				<h1>React Wars</h1>
				<div className="page">
          <label htmlFor="page"><b>Page:</b> </label>
					<input type="number" id="page" min="1" max="9" value={page} required onChange={(e) => setPage(e.target.value)} />
				</div>
			</div>
			<People>
			{
				people ? people.map(person => <StarWarsList data={person} key={person.url} />) : null
			}
			</People>
		</div>
	);
}

export default App;