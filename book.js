const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
var app=express()
app.use(cors())
app.use(bodyParser.json())
const port=3000
var books=[{"title":"aggtm","author":"holly","id":"1"},{"title":"tss","author":"hoseinnni","id":"2"}]
app.post("/add",(req,res)=>{
    var book=req.body
    books.push(book)
    res.json(books)
})
app.get("/get",(req,res)=>{
    res.json(books)
})
app.get("/get/:id",(req,res)=>{
    var book=req.params.id
    var bookIn=books.find(boo=>boo.id===book)
    if (bookIn) {
        res.json(bookIn);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
})
app.delete("/delete/:id",(req,res)=>{
    var book=req.params.id
    var index=books.findIndex(boo=>boo.id===book)
    books.splice(index,1)
    res.json(books)
})
app.put("/update/:id",(req,res)=>{
    var book=req.params.id
    var index=books.findIndex(boo=>boo.id===book)
    books[index]={...books[index],...req.body}
    res.json(books)
})
app.listen(port, () => console.log("Listening on port " + port));