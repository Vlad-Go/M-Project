onmessage = function(e) {
  console.log('Message received from main script');
  setTimeout(()=>{
    postMessage(e.data);
  }, e.data);

};