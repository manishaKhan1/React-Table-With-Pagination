import React from 'react';
import DataTable  from 'react-data-table-component';
import axios from "axios"
import { useEffect, useState } from 'react';

const CountriesTables = () => {

    const [countries, setCountries]=useState([]);
    const [filteredCountries, setFilteredCountries]=useState([]);
    const [search, setSearch]=useState([]);
    

    //get api for the country details
  const getCountries=async()=>{
    try{
      const response= await axios.get('https://restcountries.com/v2/all')
      setCountries(response.data)
      setFilteredCountries(response.data)
    } catch(error) {
        console.log(error);
    }

  };


// columns for table and selected columns name from Api 
  const columns=[

    {
        name:"Select All",
        // selector:(row)=>row.name 
      },
    {
      name:"Country Name",
      selector:(row)=>row.name,
      sortable: true
    },

    {
      name:"Country Native Name",
      selector:(row)=>row.nativeName
    },

    {
      name:"Country Capital",
      selector:(row)=>row.capital
    },

    {
      name:"Country Flag",
      selector:(row)=> <img width={50} height={50} src={row.flag}></img>
    },

    // {
    //     name: "Action",
    //     cell : (row)=><button className='btn btn-primary' onClick={()=>alert(row.alpha2Code)}>Edit</button>
    // }
  ]

  useEffect(()=>{
    getCountries()
  },[])


    useEffect(()=>{
        const result=countries.filter(country=>{
            return country.name.toLowerCase().match(search.toLowerCase())
        });

        setFilteredCountries(result)
    }, [search])

  return <DataTable 
            title='Country List' 
            columns={columns} //columns name
            data={filteredCountries}  // countries details
            pagination  // Add pagination
            fixedHeader // header will not scroll
            fixedHeaderScrollHeight="450px" // size from header to footer
            selectableRows // add radio click space
            highlightOnHover // add hover on the each row
            actions={
                <button className='btn btn-sm btn-info'>Export</button>
            }
            subHeader
            subHeaderComponent={
                <input type='text' 
                placeholder='Search here'
                className=' w-25 form-control'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                 ></input>
            }
            
             />
}

export default CountriesTables