const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dataLogger = require('./data_logger');

const PORT = 3001;
const HOST = '127.0.0.1';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  next();
 
  });
  
//yhteys
const db = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'qjwax2ic', //<-- passu jolla kirjaudut heidiqsql
  database  : 'systeemianalysaattori' //<-- databasen nimi
});

//yhdistä
db.connect((err) => {
  if(err){
    throw err;
  } 
  console.log("Mysql yhdistetty");
});

 /* <-----------expressmetodit-------------> */
app.post('/', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM credentials WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				response.send(true);
			} else {
				response.send(false);
			}			
			response.end();
		});
	} else {
		response.send(false);
		response.end();
	}
});

app.post('/data/cpu', (request, response) => {
	var startDatetime = request.body.startDatetime.replace('T', ' ');
	var endDatetime = request.body.endDatetime.replace('T', ' ');
	console.log(startDatetime + ' ' + endDatetime);
	db.query(`SELECT usagePercentage, TIME from cpu WHERE TIME BETWEEN '${startDatetime}' AND '${endDatetime}';`, (error, results) => {
	  if (error) throw error;
	  response.send(results);
	});
  });

  app.post('/data/memory', (request, response) => {
	var startDatetime = request.body.startDatetime.replace('T', ' ');
	var endDatetime = request.body.endDatetime.replace('T', ' ');
	console.log(startDatetime + ' ' + endDatetime);
	db.query(`SELECT usagePercentage, TIME from memory WHERE TIME BETWEEN '${startDatetime}' AND '${endDatetime}';`, (error, results) => {
	  if (error) throw error;
	  response.send(results);
	});
  });

  app.post('/data/network', (request, response) => {
	var startDatetime = request.body.startDatetime.replace('T', ' ');
	var endDatetime = request.body.endDatetime.replace('T', ' ');
	console.log(startDatetime + ' ' + endDatetime);
	db.query(`SELECT received, TIME from network WHERE TIME BETWEEN '${startDatetime}' AND '${endDatetime}';`, (error, results) => {
	  if (error) throw error;
	  response.send(results);
	  
	});
  });

  app.post('/data/networks', (request, response) => {
	var startDatetime = request.body.startDatetime.replace('T', ' ');
	var endDatetime = request.body.endDatetime.replace('T', ' ');
	console.log(startDatetime + ' ' + endDatetime);
	db.query(`SELECT transferred, TIME from network WHERE TIME BETWEEN '${startDatetime}' AND '${endDatetime}';`, (error, results) => {
	  if (error) throw error;
	  response.send(results);
	  console.log(results);
	});
  });

  app.post('/data/systeminformation', (request, response) => {
	console.log('haetaan tiedot jarjestelmasta');
	db.query(`SELECT os,osBuild,osRelease,procesManufacturer,procesName, procesCores, procesSpeed, ramAmount,ramSpeed,ramType,usedMemory, maxMemory FROM processor, ram,os,systemstorage WHERE processor.componentsId=10;`, (error, results) => {
	  if (error) throw error;
	  //console.log(results);
	  response.send(results);
	});
  });  

  app.post('/data/systemgraphics', (request, response) => {
	console.log('haetaan naytonohjaiten tiedot jarjestelmasta');
	db.query(`SELECT vendor,model,vram FROM gpu WHERE gpu.componentsId=10;`, (error, results) => {
	  if (error) throw error;
	  //console.log(results);
	  response.send(results);
	});
  });  

/*<-----------------------------------> */

app.listen(PORT, HOST, function() {
  console.log("server up and running @ http://" + HOST + ":" + PORT);
});

dataLogger.cpu(db);
dataLogger.memory(db);
dataLogger.network(db);


// alemmilla lyödään kaikki koneen specsit tietokantaan
//dataLogger.specsOs(db);
//dataLogger.specsRam(db);
//dataLogger.specsGpu(db);
//dataLogger.specsProcessor(db);
//dataLogger.specsSysmem(db);


module.exports = app;