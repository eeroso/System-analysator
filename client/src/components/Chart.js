import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import PropTypes from "prop-types";

const lineOptions = { //asetuksia
    scales: {
      xAxes: [{
        gridLines: {
          display: true,
        },
      }],
      yAxes: [{
        gridLines: {
          display: true,
        },
        ticks: {
          beginAtZero: true,

        },
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true,
    },
  };

export default class Chart extends Component {
        //propsien datatyyppi   
         static propsTypes = {
            data: (PropTypes.object | PropTypes.func).isRequired
        };
        
       
        
    render() {
        return (
            <div className='chart'>
                <Line
                    data={this.props.data} //chartin tiedot propseista data.js tiedoston kautta
                    width= {800}
                    height= {200}
                    options = {lineOptions} //asetuksia, ei kiveenhakattuja 
                />
            </div>
        )
    }
}
