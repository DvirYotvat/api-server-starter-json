const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');
const port = 3001;

const app=express();


app.use('/', express.static(path.join(__dirname, 'html')));
app.use('/SiteList', express.static(path.join(__dirname, 'html/SiteList.html')));
app.use('/add_tour', express.static(path.join(__dirname, 'html/add_tour_form.html')));
app.use('/update_tour', express.static(path.join(__dirname, 'html/update_tour_form.html')));

// app.use('/js', express.static(path.join(__dirname, 'js/SiteList.js')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// let client_path = path.join(__dirname , "/html/");
// app.use('/')
/*app.get('/',(req,res) => {fs.readFile('html/index.html',  (err, html) => {
    if (err) {
        throw err; 
    }       
    
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(html);  
    res.end();  
    })
});*/

app.use('/public', express.static(path.join(__dirname, 'public')));


//restfull 
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});