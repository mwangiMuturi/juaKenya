const express=require ("express")
const mongoose=require ("mongoose")
const app=express()
const path=require ("path")
const {engine}=require ('express-handlebars')
const {home,create, findmember, getaddfact, addfact}=require ("./controllers/countyController")
 
//Atlas connection
try {
    mongoose.connect('mongodb+srv://gacimi:James123@cluster0.tmbay.mongodb.net/?retryWrites=true&w=majority');
    console.log("connected to DB")
} catch (error) {
 console.log(`FOUND ${error}`)   
}

//set up handlebars
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//static folder 
app.use('/static', express.static(path.join(__dirname, '/public')))
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//end points
app.get('/',home)

app.get('/create',(req,res)=>{res.render('create' )})

app.post('/create',create)

app.get('/counties/:id',findmember)

app.get('/addfact/:id',getaddfact)

app.post('/addfact/:id',addfact)
// 404 not found
app.use(function(req, res, next) {
    res.status(404).render('404');
  });
  //starting server
app.listen(3000, console.log("Server started on port 3000")) 