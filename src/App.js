import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Grid, Header, List, Table } from "semantic-ui-react";

function App() {
  //Get a list of current Congress members
  const URL = 'https://theunitedstates.io/congress-legislators/legislators-current.json'
  let xhr=new XMLHttpRequest();
  xhr.open("GET", URL, false);
  xhr.send();
  let results = JSON.parse(xhr.responseText);
  //console.log(results)
  //console.log(Object.keys(results))
  //console.log(Object.values(results))
  //console.log(Object.values(Object.entries(results))) //[0]bioguide [1]official_full [2]birthday [3].length (#terms), party, type


  //members[0][1].bio.birthday = birthday
  //members[0][1].name.official_full
  let members = Object.values(Object.entries(results))
  console.log(members)

  return (
    <div className="App">
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header>United States Congress (2020)</Header>
            <List>
              {members.map(member => {
                return (
                  <List.Item  key={member[0]}>
                    <List.Content>{member[1].name.official_full}</List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    </div>
  );
}

export default App;
