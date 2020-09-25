import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Grid, Header, List, Table } from "semantic-ui-react";
import { MDBDataTableV5 } from 'mdbreact';

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

  let columns = [
    {
      label: 'Image',
      field: 'image',
      sort: 'asc',
      width: 225
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Title',
      field: 'title',
      sort: 'asc',
      width: 200
    },
    {
      label: 'State',
      field: 'state',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Party',
      field: 'party',
      sort: 'asc',
      width: 200
    }
  ]
  let rows = []
  members.forEach((member)=>{
    rows.push(
      {
        image: <img src={"https://theunitedstates.io/images/congress/225x275/"+member[1].id.bioguide+".jpg"} alt={member[1].name.official_full} />,
        name: member[1].name.official_full,
        title: repTitle(member),
        party: member[1].terms.[member[1].terms.length-1].party,
        state: member[1].terms.[member[1].terms.length-1].state
      }
    )
  })
  let data = {rows: rows, columns: columns}

  return (
    <div className="App">
      <MDBDataTableV5
        striped
        bordered
        small
        data={data}
      />
    </div>
  );
}

export default App;
