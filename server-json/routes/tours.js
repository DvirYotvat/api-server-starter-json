const fs = require('fs');
// variables
const dataPath = './data/tours.json';


//////////////////////////////////////////////////////////////////////////////
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (!data) data="{}";
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                console.log(err);
            }

            callback();
        });
    };


module.exports = {
    // get tours from file data
    getTours: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else 
            {
                let arr = [];
                let getData = data ? JSON.parse(data) : null;
                for(let i in getData)
                    arr.push([i, getData[i]]);
                res.send(!arr ? "{}" : arr.sort()) ;
            }
        });
    },

   createTour: function (req, res) {

        readFile(data => {
            const tripId = req.params["id"];
            // console.log(data);
            if (!tripId) return res.sendStatus(500);   
            data[tripId] = req.body;
            // console.log(data);

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('Tour added');
            });
        },
            true);
    },

    updateTour: function (req, res) {

        readFile(data => {

            const tripId = req.params["id"];
            if (data[tripId])
                data[tripId] = req.body;
            else res.sendStatus(400);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`trips id:${tripId} updated`);
            });
        },
            true);
    },

    createSiteInPath: function (req, res) 
    {
        readFile(data => {

            const tripId = req.params["id"];
            let msg = "sites id: " + tripId + "added";
            let existFlag = false;
            let array = [];
            if (data[tripId])
            {
                for(let i in data)
                    array.push([i, data[i]]);

                for(let i = 0 ; i < array.length ; i++)
                {
                    if(array[i][0] == tripId)
                    {
                        existFlag = true;
                        for(let j = 0; j < array[i][1].path.length ; j++)
                        {
                            if(array[i][1].path[j].name === req.body.name)
                            {
                                msg = "The site in trip:" + tripId +  "already exist";
                                existFlag = false;
                            }
                        }
                        flag ? array[i][1].path.push(req.body) : null;
                    }
                }
            }

            else res.sendStatus(400);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(msg);
            });
        },
            true);
    },

    getTour: function (req, res)
    {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            let dataToReturn;

            if (err) 
            {
                console.log(err);
                res.sendStatus(500);                 
            }
            else
            {
                const tripId = req.params["id"];
                dataToReturn = JSON.parse(data);
                res.send(!dataToReturn[tripId] ? "{}" :dataToReturn[tripId]);
            }
        });
    },

    deleteSite: function (req, res)
    {
        readFile(data => {

            const tripId = req.params["id"];
            const site = req.params["site_name"];

            let msg = "";        
            let array = [];

            if (data[tripId])
            {
                if(site == null)
                {
                    res.sendStatus(400);
                    return;
                }

                if(site == "")
                {
                    delete data[tripId].path;
                    msg = 'tours id:' + tripId + 'removed';
                }
                else
                {
                    for(let i in data)
                    {
                        array.push([i, data[i]]);
                    }
                    for(let i = 0 ; i < array.length ; i++)
                    {
                        if(array[i][0] == tripId)
                        {
                            let flag = true;
                            for(let j = 0; j < array[i][1].path.length ; j++)
                            {
                                if(array[i][1].path[j].name === site)
                                {
                                    array[i][1].path.splice(j,1);
                                }
                            }
                        }
                    }
                }
            }
            else res.sendStatus(400);
           
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(msg);
            });
        },
        true);
    },
        
    deleteTour: function (req, res) {

        readFile(data => {
            const tripId = req.params["id"];
            console.log(data);
            delete data[tripId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id:${tripId} removed`);
            });
        },
            true);
    }
};