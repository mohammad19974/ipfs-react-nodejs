const express = require('express');
const app = express();
var cors = require('cors');
const fs = require('fs');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var ipfsAPI = require('ipfs-api');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var mime = require('mime-types');

app.use(cors({ origin: '*' }));

const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001'); //http => POST: SEND TO DATA IN THE REQUEST , GET =>FETCH TO DATA USED REQUEST,DELETE:,PUT update
app.get('/', async function(req, res) {
    // use `console.dir` to print nested objects

    // res.json({allUsers});
    //   res.send('Hello World')
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/getfiles', async function(req, res) {
    const allFile = await prisma.files.findMany();

    const dataF = allFile.map((data) => {
        return {...data, mimetype: mime.extension(data.mimetype) };
    });
    res.json(dataF);
});

app.get('/login/:username/:password',async function(req, res) {

  const user = await prisma.users.findMany({where:{username:req.params.username,password:req.params.password}});

if(user.length>0)
res.json({isLogin:true})
else{
res.json({isLogin:false})
}
});
app.post('/profile', upload.single('avatar'), function(req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    var data = Buffer.from(fs.readFileSync(req.file.path));
    try {
        ipfs.add(data, async function(err, file) {
            if (err) {
                console.log(err);
                return;
            }
            await prisma.files.create({
                data: {
                    hash: file[0].hash,
                    name: '',
                    fileName: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: file[0].size,
                },
            });

            res.send(file[0].hash);
        });
    } catch (e) {
        consoe.log('error ' + e);
    }
});

app.post('/upload', upload.single('file'), async function(req, res) {
    try {
        var data = Buffer.from(fs.readFileSync(req.file?.path));

        ipfs.add(data, async function(err, file) {
            if (err) {
                res.json(err);
                console.log(err);
                return;
            }
            console.log(req.body.password);

            await prisma.files.create({
                data: {
                    hash: file[0].hash,
                    name: '',
                    password: req.body?.password??null,
                    fileName: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: file[0].size,
                },
            });
            res.send(file[0].hash);
        });
    } catch (e) {
        res.json(err);
        console.log('error ' + e);
    }
});
app.get('/download/:ID', function(req, res) {
    console.log(req.params.ID);
    res.redirect('http://127.0.0.1:8080/ipfs/' + req.params.ID);
});

app.listen(3000);