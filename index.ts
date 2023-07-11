

import server from './app';



















const PORT = process.env.PORT;
server.listen(PORT,()=>{
    console.log('running at http://localhost:' + PORT);
})

//export default server;