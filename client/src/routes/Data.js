import React, { Component } from 'react';
import Chart from '../components/Chart';
import '../styles/App.css';
import '../styles/Data.css';
import Header from '../layout/Header';


//taulukot datalle
var cpulabelz = [];
var cpudatasetz = [];
var memorylabelz = [];
var memorydatasetz = [];
var networkdatasetz= [];
var networklabelz = [];
var networksdatasetz = [];
var networkslabelz = [];

//taulukoiden tyhjennys funktio
function emptycpu() { 
  cpulabelz = [];
  cpudatasetz = [];
}

function emptymemory() { 
  memorylabelz = [];
  memorydatasetz = [];
}

function emptynetwork() { 
  networklabelz = [];
  networkdatasetz = [];
}

function emptynetworks(){
  networksdatasetz = [];
  networkslabelz = [];
}

export default class Systeminfo extends Component {
  constructor(props) {
    super(props);
    this.handleCpuSubmit = this.handleCpuSubmit.bind(this);
    this.handleMemorySubmit = this.handleMemorySubmit.bind(this);
    this.handleNetworkSubmit = this.handleNetworkSubmit.bind(this);
    this.handleNetworksSubmit = this.handleNetworksSubmit.bind(this);

    this.state = {
      startDatetime: '',
      endDatetime: '',
      startDatetimeMem: '',
      endDatetimeMem: '',
      startDatetimeNet: '',
      endDatetimeNet: '',
      startDatetimeNets: '',
      endDatetimeNets: '',
      
      cpuChartData: [],
      memoryChartData: [],
      networkChartData: [],
      networksChartData: [],
  }
}

  handleCpuSubmit(e) {
    e.preventDefault();

    if(this.state.startDatetime.length === 0 || this.state.endDatetime.length === 0){
      alert("Incorrect date parameter/s");
      return;
    }
    
    fetch('http://localhost:3001/data/cpu', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          startDatetime: this.state.startDatetime,
          endDatetime: this.state.endDatetime
      })
    }).then(res => res.json())
    .then((result) => {

      if(result.length === 0){
        alert('Data not found on selected timescale');
      }
      //haettu data mapataan, datasetz taulukkoon prosentit ja labelz taulukkoon timestampit
    result.map(item => {
       
      cpudatasetz.push(item.usagePercentage);
         
      cpulabelz.push(new Date(item.TIME).toLocaleString());
    })

    //oikeanlaisessa muodossa olevaan muuttujaan tiedot
    var datat1 = {
      labels: cpulabelz,
      datasets: [
        {
          label: 'CPU Usage',
          data: cpudatasetz,
          borderColor: 'rgba(30, 139, 195, 1)',

        }
      ]
    }

    emptycpu();    //tyhjennetään taulukot, jos halutaan eri tiedoilla hakea uusi chartti niin vanhat tiedot ei näin tule mukaan
    console.log(datat1);
    
    //stateen yllä määritelty muuttuja
    this.setState({cpuChartData : datat1})
      
          })

      }

      handleMemorySubmit(e) {
        e.preventDefault();

        if(this.state.startDatetimeMem.length === 0 || this.state.endDatetimeMem.length === 0){
          alert("Incorrect date parameter/s");
          return;
        }
        
        fetch('http://localhost:3001/data/memory', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              startDatetime: this.state.startDatetimeMem,
              endDatetime: this.state.endDatetimeMem
          })
        }).then(res => res.json())
        .then((result) => {

          if(result.length === 0){
            alert('Data not found on selected timescale');
          }
          //haettu data mapataan, datasetz taulukkoon prosentit ja labelz taulukkoon timestampit
        result.map(item => {
           
          memorydatasetz.push(item.usagePercentage);
             
          memorylabelz.push(new Date(item.TIME).toLocaleString());
        })
    
        //oikeanlaisessa muodossa olevaan muuttujaan tiedot
        var datat2 = {
          labels: memorylabelz,
          datasets: [
            {
              label: 'Memory Usage',
              data: memorydatasetz,
              borderColor: 'rgba(30, 139, 195, 1)',
    
            }
          ]
        }
    
        emptymemory();    //tyhjennetään taulukot, jos halutaan eri tiedoilla hakea uusi chartti niin vanhat tiedot ei näin tule mukaan
        
        
        //stateen yllä määritelty muuttuja
        this.setState({memoryChartData : datat2})
          
              })
    
          }

          handleNetworkSubmit(e) {
            e.preventDefault();
            
            if(this.state.startDatetimeNet.length === 0 || this.state.endDatetimeNet.length === 0){
              alert("Incorrect date parameter/s");
              return;
            }

            fetch('http://localhost:3001/data/network', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  startDatetime: this.state.startDatetimeNet,
                  endDatetime: this.state.endDatetimeNet
              })
            }).then(res => res.json())
            .then((result) => {
        
              if(result.length === 0){
                alert('Data not found on selected timescale');
              }
              //haettu data mapataan, datasetz taulukkoon prosentit ja labelz taulukkoon timestampit
            result.map(item => {
               
              networkdatasetz.push(item.received);
                 
              networklabelz.push(new Date(item.TIME).toLocaleString());
            })
        
            //oikeanlaisessa muodossa olevaan muuttujaan tiedot
            
            var datat3 = {
              labels: networklabelz,
              datasets: [
                {
                  label: 'Network Usage',
                  data: networkdatasetz,
                  borderColor: 'rgba(30, 139, 195, 1)',
        
                }
              ]
            }
        
            emptynetwork();    //tyhjennetään taulukot, jos halutaan eri tiedoilla hakea uusi chartti niin vanhat tiedot ei näin tule mukaan
            
            
            //stateen yllä määritelty muuttuja
            this.setState({networkChartData : datat3})
              
                  })
        
              }



              handleNetworksSubmit(e) {
                e.preventDefault();
                
                if(this.state.startDatetimeNets.length === 0 || this.state.endDatetimeNets.length === 0){
                  alert("Incorrect date parameter/s");
                  return;
                }

                fetch('http://localhost:3001/data/networks', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      startDatetime: this.state.startDatetimeNets,
                      endDatetime: this.state.endDatetimeNets
                  })
                }).then(res => res.json())
                .then((result) => {
            
                  if(result.length === 0){
                    alert('Data not found on selected timescale');
                  }
                  //haettu data mapataan, datasetz taulukkoon prosentit ja labelz taulukkoon timestampit
                result.map(item => {
                   
                  networksdatasetz.push(item.transferred);
                     
                  networkslabelz.push(new Date(item.TIME).toLocaleString());
                })
            
                //oikeanlaisessa muodossa olevaan muuttujaan tiedot
                
                var datat4 = {
                  labels: networkslabelz,
                  datasets: [
                    {
                      label: 'Network Usage',
                      data: networksdatasetz,
                      borderColor: 'rgba(30, 139, 195, 1)',
            
                    }
                  ]
                }
            
                emptynetworks();    //tyhjennetään taulukot, jos halutaan eri tiedoilla hakea uusi chartti niin vanhat tiedot ei näin tule mukaan
                
                
                //stateen yllä määritelty muuttuja
                this.setState({networksChartData : datat4})
                  
                      })
            
                  }
    
            


         

  render() {
      return (
          <div>
          <Header />
          <div>
            <section className='contentblock'>
              <p>cpu load %</p>
              <Chart data={this.state.cpuChartData}/>
              <section style={{margin:0,padding:0}}>
                <p>start date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({startDatetime : e.target.value})}/> 
              </section>
              <section style={{margin:0,padding:0}}>
                <p>end date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({endDatetime : e.target.value})}/> 
              </section>
              <button onClick={this.handleCpuSubmit}>Submit</button>
            </section>
            <section className='contentblock'>
              <p>Memory usage %</p>
              <Chart data={this.state.memoryChartData}/>
              <section style={{margin:0,padding:0}}>
                <p>start date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({startDatetimeMem : e.target.value})}/>
              </section>
              <section style={{margin:0,padding:0}}>
                <p>end date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({endDatetimeMem : e.target.value})}/>
              </section>
              <button onClick={this.handleMemorySubmit}>Submit</button>
            </section>
            <section className='contentblock'>
              <p>Network received</p>
              <Chart data = {this.state.networkChartData} />
              <section style={{margin:0,padding:0}}>
                <p>start date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({startDatetimeNet : e.target.value})}/>
              </section>
              <section style={{margin:0,padding:0}}>
                <p>end date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({endDatetimeNet : e.target.value})}/>
              </section>
              <button onClick={this.handleNetworkSubmit} >Submit</button>
            </section>
            <section className='contentblock'>
              <p>Network transferred</p>
              <Chart data = {this.state.networksChartData} />
              <section style={{margin:0,padding:0}}>
                <p>start date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({startDatetimeNets : e.target.value})}/>
              </section>
              <section style={{margin:0,padding:0}}>
                <p>end date</p>
                <input className='datetime' type='datetime-local' onChange={e => this.setState({endDatetimeNets : e.target.value})}/>
              </section>
              <button onClick={this.handleNetworksSubmit} >Submit</button>
            </section>
          </div>
        </div>
      )
  }
}


