import React, { Component } from 'react';
import '../styles/App.css';
import Header from '../layout/Header';
import '../styles/Sysinfo.css';
import Form from 'react-bootstrap/Form'
import {Table,ButtonToolbar,Button} from 'react-bootstrap';

export default class Systeminfo extends Component {

  constructor(props) {
    super(props);
    this.state={components : [], graphics : []}
    this.refreshList= this.refreshList.bind(this);
}


  UNSAFE_componentWillMount() {          
    this.refreshList();
  }
  

refreshList(e) {
    console.log('tehdaan refreshList')
    
    fetch('http://localhost:3001/data/systeminformation', {
      method: 'POST',
      header:{'Accept':'application/json',
      'Content-Type':'application/json'
  }
  })
  .then(response=> response.json())
  .then(data=> {
    console.log(data);
    this.setState({components:data});
  })

  fetch('http://localhost:3001/data/systemgraphics', {
    method: 'POST',
    header:{'Accept':'application/json',
    'Content-Type':'application/json'
}
})
.then(response=> response.json())
.then(data=> {
  console.log(data);
  this.setState({graphics:data});
})





      }
    render() {
      const {components,graphics} = this.state; 
        return (
            <div>
              <Header />
              <div className='maindiv' style={{display: 'flex', justifyContent: 'center'}}>
                  <Table className= "mt-4" striped bordered hover>
                    <thead>
                      <tr>
                          <th style={{width: 300, height: 50, color: '#f0ffff'}} >Processor manufacturer</th>
                          <th style={{width: 300, height: 50, color: '#f0ffff'}} >Processor model</th>
                          <th style={{width: 300, height: 50, color: '#f0ffff'}} >Number of cores</th>
                          <th style={{width: 300, height: 50, color: '#f0ffff'}} >Base speed (GHz)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {components.map(component=>
                      <tr>
                          <td>{component.procesManufacturer}</td>
                          <td>{component.procesName}</td>
                          <td>{component.procesCores}</td>
                          <td>{component.procesSpeed}</td>   
                      </tr>                     
                        )}
                    </tbody>
                  </Table>
                  </div>
              <div className='maindiv' style={{display: 'flex', justifyContent: 'center'}}>
            <Table className= "mt-4" striped bordered hover>
                   <thead>
                    <tr>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >Os</th>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >osBuild</th>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >osRelease</th>
                    </tr>
                   </thead>
                   <tbody>
                    
                    {components.map(component=>
                        <tr>
                        <td>{component.os}</td>
                        <td>{component.osBuild}</td>
                        <td>{component.osRelease}</td>                              
                        </tr>
                )}
                </tbody>
                </Table>
                </div>
                <div className='maindiv' style={{display: 'flex', justifyContent: 'center'}}>
                  <Table className= "mt-4" striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >Total RAM (MB)</th>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >RAM speed (MHz)</th>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >RAM type</th>
                      </tr>
                    </thead>
                    <tbody>
                    {components.map(component=>
                    <tr>
                        <td>{component.ramAmount}</td>
                        <td>{component.ramSpeed}</td>
                        <td>{component.ramType}</td> 
                        </tr>
                    )}                     
                    </tbody>
                  </Table>
                </div>
                <div className='maindiv' style={{display: 'flex', justifyContent: 'center'}}>
                  <Table className= "mt-4" striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >Used storage (GB)</th>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >Total storage (GB)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {components.map(component=>
                        <tr>
                        <td>{component.usedMemory}</td>
                        <td>{component.maxMemory}</td> 
                        </tr>
                        )}
                    </tbody>
                  </Table>
                </div>
                <div className='maindiv' style={{display: 'flex', justifyContent: 'center'}}>
                  <Table className= "mt-4" striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >Graphics card manufacturer</th>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >Model</th>
                        <th style={{width: 300, height: 50, color: '#f0ffff'}} >vRAM (GB)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {graphics.map(graphic=>
                        <tr>
                          <td>{graphic.vendor}</td>
                          <td>{graphic.model}</td>
                          <td>{graphic.vram}</td>
                        </tr>
                        )}
                    </tbody>
                  </Table>
                </div>
                </div>  
            



            
          
        )
    }
}