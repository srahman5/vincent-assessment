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

  //SEN. John Smith (R-KY)
  let members = Object.values(Object.entries(results))
  console.log(members)

  function repTitle(member){
    if(member[1].terms.[member[1].terms.length-1].type === "sen"){
      return "Senator "
    } else if (member[1].terms.[member[1].terms.length-1].type === "rep" && member[1].bio.gender === "M"){
      return "Congressman "
    } else if (member[1].terms.[member[1].terms.length-1].type === "rep" && member[1].bio.gender === "F"){
      return "Congresswoman "
    }
  }

  return (
    <div className="App">
    <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {members.map(member => {
                return (
                  <Table.Row key={member[0]}>
                    <Table.Cell>{repTitle(member)} {' '}
                    {member[1].name.official_full} (
                    {(member[1].terms.[member[1].terms.length-1].party)[0]}-
                    {member[1].terms.[member[1].terms.length-1].state})
                    </Table.Cell>
                    <Table.Cell><img src={"https://theunitedstates.io/images/congress/225x275/"+member[1].id.bioguide+".jpg"} /></Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
    </div>
  );
}

export default App;
