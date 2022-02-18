const express = require('express')


//init express
const app = express()

//Enable JSON incomming data
app.use(express.json()); 


const users=[
    {name: "Tony", edad: 27},
    {name: "Gaston", edad: 35},
    {name: "Alvaro", edad: 38}
];

const posts = [
    { id: 1, title: "Post 1", content: "Some content", author: "Max" },
    { id: 2, title: "Post 2", content: "Some content 2", author: "John" },
    { id: 3, title: "Post 3", content: "Some content 3", author: "Jill" },
  ];


app.get('/users', (req, res)=>{
    res.status(200).json({status: 'succes', data: {
        users: users,
    },
    });

})
app.post("/posts", (req, res) => {
    const { title, content } = req.body;
  
    const newPOst = {
      id: Math.floor(Math.random() * 100),
      title,
      content,
    };
  
    posts.push(newPOst);
  
    res.status(201).json({
      status: "success",
      data: { newPOst },
    });
  });

app.put('/posts', (req, res)=>{
    const {id}=req.params

    //find post by id, and get the index
    //Extract tittle, content and author from req.body
    //Validate the data has some value
    

    const {title, content, author}=req.body;


    if(!title || 
        !content ||
        !author){
        title.length===0;
        content.length===0;
        author.length===0;
        res.status(400).json({
            status: 'error',
            mesagge: 'Must provide a title, content and the author for this request'
        });
        return;
    }
    const postIndex =posts.findIndex(post=> post.id===+id);


    if(postIndex===-1){
        res.status(404).json({
            status: 'Error',
            mesagge: 'Cant update post, invalid ID'
        });
        return;
    }

    const updatePost = posts[postIndex];
    updatePost.title=title;
    updatePost.content=content;
    updatePost.author=author;

    posts[postIndex]=updatePost;
    //Update post and save it in the list 
    res.status(204).json({status: 'sucess'})
})

app.patch('/posts/:id', (req, res)=>{
    const {id}=req.params;

    const filterObj =(obj, allowedField)=>{
         //{title, content, comment}

        const newObj={};

        //Get the properties [title, content, email, comment]

        Object.keys(obj).forEach(el=>{
            if(allowedField.includes(el)){
                newObj(el)=''; // newObj.title
                newObj[el]=obj[el];
            }
        })

        return newObj;
    }

    const data =filterObj(req.body, 'title', 'content', 'author'); //title content author
        
    const postIndex = posts.findIndex(post=>post.id===+id);

    if(postIndex===-1){
        res.status(404).json({
            status: 'error',
            mesagge: 'Cant update the post, invalid ID'
        });
        return;
    }

    let updatePost = posts[postIndex];

    updatePost ={...updatePost, ...data};
    posts[postIndex]=updatePost;
    res.status(204).json({
        status: 'succes'
    })
})

//Delete http://localhost:4000/posts/:id

app.delete('/post/:id', (req, res)=>{
    const {id}=req.params;

    //Find post index, by the given id

    const postIndex=posts.findIndex(post=>post.id===+id);
    if(postIndex===-1){
        res.status(404).json({
            status: 'error',
            mesagge: 'Cant delete post, invalid ID',
        });
        return;
    }

    posts.splice(postIndex, 1);
    res.status(204).json({
        status: 'success'
    })
})

app.listen(4000,()=>{
    console.log('Express app running!!!')
})
