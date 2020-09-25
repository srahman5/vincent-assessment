import React from 'react';
import './App.css';
import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'

function App() {
  //Retrieve and parse list of current Congress members
  const URL = 'https://theunitedstates.io/congress-legislators/legislators-current.json'
  let xhr=new XMLHttpRequest();
  xhr.open("GET", URL, false);
  xhr.send();
  let response = JSON.parse(xhr.responseText);
  let members = Object.values(Object.entries(response))

  //Set title based on "type" and gender
  function repTitle(member){
    if(member[1].terms.[member[1].terms.length-1].type === "sen"){
      return "Senator "
    } else if (member[1].terms.[member[1].terms.length-1].type === "rep" && member[1].bio.gender === "M"){
      return "Congressman "
    } else if (member[1].terms.[member[1].terms.length-1].type === "rep" && member[1].bio.gender === "F"){
      return "Congresswoman "
    }
  }

  //Set up columns of Material Design table
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

  //Populate rows of Material Design table
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
      <MDBDataTable
        striped
        bordered
        small
        data={data}
      />
    </div>
  );
}

export default App;
