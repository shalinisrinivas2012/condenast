import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import axios from 'axios';

function NewsList() {
    const [newsList, setNewsList] = useState([]);

    const columns = [
        {dataField:'title', text:'title', sort:true, filter:textFilter(), formatter: (cell,row) => {
          return <a href={row.url} target="_blank">{cell}</a>
        },},
        {dataField:'source.name', text:'Source Name', sort:true, filter:textFilter(), formatter: (cell,row) => {
          return <a href={row.url} target="_blank">{cell}</a>
        },},
        {dataField:'author', text:'Author', sort:true, filter:textFilter(), formatter: (cell,row) => {
          return <a href={row.url} target="_blank">{cell}</a>
        },},
        {dataField:'content', text:'Content', filter:textFilter(), formatter: (cell,row) => {
          return <a href={row.url} target="_blank">{cell}</a>
        },},
        {dataField:'description', text:'Description', filter:textFilter(), formatter: (cell,row) => {
          return <a href={row.url} target="_blank">{cell}</a>
        },},
        {dataField:'publishedAt', text:'Published At', sort:true, filter:textFilter(), formatter: (cell,row) => {
          return <a href={row.url} target="_blank">{cell}</a>
        },},
    ];

  const pagination = paginationFactory ({
    page : 1,
    sizePerPage : 3,
    lastPageText : '>>',
    firstPageText : '<<',
    nextPageText : '>',
    prePageText : '<',
    showTotal : true,
    onPageChange : function(page, sizePerPage) {
      console.log("page",page);
      console.log("sizePerPage",sizePerPage);
    },
    onSizePerPageChange : function(page, sizePerPage) {
      console.log("page",page);
      console.log("sizePerPage",sizePerPage);
    }
  });

    useEffect(() => {
        axios({
          "method": "GET",
          "url": "https://newsapi.org/v2/everything?q=bitcoin&apiKey=ba62d3caab684e00b8f66a63cb01ffbc",
        //   "url": "http://localhost:5020/news",
        })
        .then((response) => {
          console.log("response = ",response.articles);
          setNewsList(response.data.articles)
        })
        .catch((error) => {
          console.log(error)
        })

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BootstrapTable 
        bootstrap4 
        keyField = "title" 
        columns = {columns} 
        data = {newsList} 
        pagination = {pagination}
        filter = {filterFactory()}
        />
      </header>
    </div>
  );
}

export default NewsList;

