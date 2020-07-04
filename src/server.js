const express = require('express');
const session = require('express-session');

const knex = require('./database/index');

const app = express();

const users = [
    { id: 1, name: 'samuel', email: 'samuel@gmail.com', password: 'securet'},
    { id: 2, name: 'samuel', email: 'samuel@gmail.com', password: 'securet'},
    { id: 3, name: 'samuel', email: 'samuel@gmail.com', password: 'securet'},
];

//config data in body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//config session and auth
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'cats and keyboards',
    cookie: {
        maxAge: 1000*60*60*2,
        sameSite: true,
        secure: false,
    }
}));

app.get('/login', (req, res) => {

    return res.send(`
        <h3>Login</h3>
        <form action="/login" method="post" >
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" name="password" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(
        !email || typeof email == undefined || email == undefined || email == null ||
        !password || typeof password == undefined || email == undefined ||password == null
    ){
        return res.redirect('/auth_error');
    }else{
        const thisUser = users.find(user => {
            if(email == user.email && password == user.password){
                return user;
            }else{
                return null;
            }
        });
        
        if(thisUser != undefined || thisUser != null){
            req.session.authenticated = true;
            return res.redirect('/dashboard');
        }else{
            return res.redirect('/auth_error');
        }
    }

});

app.get('/dashboard', (req, res) => {
    if(req.session.authenticated != true){
        return res.redirect('/auth_error');
    }else{
        return res.send(`
            <h3>Dashboard</h3>
        `);
    }
});

app.get('/auth_error', (req, res) => {
    return res.send(`
        <h3>Error in auth</h3>
    `);
});

app.get('/register', (req, res) => {
    return res.send(`
        <h3>register</h3>
        <form action="/register" method="post" >
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" name="username">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" name="password" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `);
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if( !username || typeof username == undefined || username == null ||
        !email || typeof email == undefined || email == null ||
        !password || typeof password == undefined || password == null ){

            res.redirect('/auth_error');
    }else{
        users.push({id: (users.length + 1), username, email, password});
        
        req.session.authenticated = true;

        return res.redirect('/dashboard');
    }
} )

app.listen(8181, console.log('running in port: 8181'));