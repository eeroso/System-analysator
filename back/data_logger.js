const os = require('os');
const osu = require('os-utils');
const si = require('systeminformation');



dataLogger = {
    memory: (db) => {
        setInterval(function() {
            var kayttoMuisti = os.totalmem() - os.freemem();
            var muisti =  Math.trunc(kayttoMuisti * 9.537*Math.pow(10,-7));
            var prosentteina = muisti/Math.trunc(os.totalmem()*9.537*Math.pow(10,-7));
            
            db.query(`INSERT INTO memory (usages, usagePercentage) VALUES(${muisti},${prosentteina.toFixed(2)})`);
            console.log('Muisti logattu');
            
        },5000);
    },
    cpu: (db) => {
            setInterval(() => {
                logCpu(db);
            },5000);
    },

    network: (db) => {
        setInterval(() => {
            logNetwork(db);
        },5000);
    },
    specsOs: (db) => {
        logOsSpecs(db);
    },
    specsRam: (db) => {
        logRamSpecs(db);
    },
    specsGpu: (db) => {
        logGpuSpecs(db);
    },
    specsProcessor: (db) => {
        logProcessorSpecs(db);
    },
    specsSysmem: (db)=> {
        logSysmemSpecs(db);
    }
}

async function logCpu(db) {
    var data = await si.currentLoad().then(data => {return data});
    var currentLoad = data.currentload;
    db.query(`INSERT INTO cpu (usagePercentage) VALUES (${currentLoad.toFixed(2)})`);
    console.log('Cpu käyttö logattu');

}

async function logNetwork(db){
    var data = await si.networkStats().then(data => {return data});  
    var received = Math.trunc(data[0].rx_bytes* 9.537*Math.pow(10,-7)) ;
    var transferred = Math.trunc(data[0].tx_bytes* 9.537*Math.pow(10,-7));

    db.query(`INSERT INTO network (received,transferred) VALUES (${received},${transferred})`);
    console.log("Network logattu ");   
}//data.distro, data.release, data.build, data.arch

async function logOsSpecs(db) {
    var data = await si.osInfo().then(data => {return data});
    var distro = data.distro;
    var release = data.release;
    var build = data.build;
    var arch = data.arch;
    var componentsId = 10;

    db.query(`INSERT INTO os (os, osBuild, osRelease, osArch, componentsId) VALUES ('${distro}',  ${build}, '${release}', '${arch}', ${componentsId})`);
    console.log('os logattu');

}

async function logRamSpecs(db) {
    var data = await si.memLayout().then(data => {return data});

    var ramAmmount= 0;
    for (let index = 0; index < data.length; index++) {
        ramAmmount=ramAmmount+data[index].size/1024/1024;
    }

    var ramSpeed = data[0].clockSpeed;
    var ramType = data[0].type;
    var componentsId = 10;

    db.query(`INSERT INTO ram (ramAmount, ramSpeed, ramType, componentsId) VALUES (${ramAmmount},  ${ramSpeed}, '${ramType}', ${componentsId})`);
    console.log('ram logattu');

}


async function logGpuSpecs(db) {
    var data = await si.graphics().then(data => {return data});
    var componentsId = 10;

    for(let index= 0; index<data.controllers.length; index++){// data.controllers.length
        vendor=data.controllers[index].vendor;
        model=data.controllers[index].model;
        vram=data.controllers[index].vram;
        gpuId=index;

    db.query(`INSERT INTO gpu (vendor, model, vram, componentsId,gpuId) VALUES ('${vendor}',  '${model}', ${vram}, ${componentsId}, ${gpuId})`);
    console.log('GPU logattu');
    }
}

async function logProcessorSpecs(db) {
    var data = await si.cpu().then(data => {return data});

    var manufacturer= data.manufacturer;
    var brand = data.brand;
    var cores = data.cores;
    var speed = data.speed;
    var componentsId = 10;

    db.query(`INSERT INTO processor (ProcesName, procesCores, procesSpeed, procesManufacturer, componentsId) VALUES ('${brand}',  ${cores}, ${speed}, '${manufacturer}', ${componentsId})`);
    console.log('prosessori logattu');

}

async function logSysmemSpecs(db) {
    var data = await si.fsSize().then(data => {return data});
    
    var maxSize=0;
    var used=0;
    for (let index = 0; index < data.length; index++) {
        if(!isNaN(data[index].size))
        maxSize=maxSize+data[index].size/1024/1024/1024;
    }
    for (let index = 0; index < data.length; index++) {
        if(!isNaN(data[index].used)){
        used=used+data[index].used/1024/1024/1024;
        }
    }

    usedMemory= used;
    maxMemory= maxSize;
    componentsId= 10;


    db.query(`INSERT INTO systemstorage (usedMemory, maxMemory, componentsId) VALUES (${usedMemory},  ${maxMemory}, ${componentsId})`);
    console.log('kovalevyt logattu');

}


module.exports = dataLogger;