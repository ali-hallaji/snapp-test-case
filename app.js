const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send(`<h3>It's ${+ new Date()}</h3>`);
})


app.get('/about', function (req, res) {
  res.send('welcome to my test case. It is for snapp market')
})

app.get('/snapp-market', (req, res) => {
    res.send('<h3> Hello Dear to Snapp Market </h3>');
})

app.get('/host-info', (req, res) => {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var str = ''
    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
              // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
              return;
            }

            if (alias >= 1) {
              // this single interface has multiple ipv4 addresses
              str = ifname + ':' + alias  + ' ' +  iface.address + ' ' + os.hostname();
            } else {
              // this interface has only one ipv4 adress
              str = ifname + ' ' + iface.address + ' ' + os.hostname();
            }
            ++alias;
          });
        });
    res.send(`IPv4: ${str}`);
})

app.listen(port, () => {
    console.log(`Server Started on Port  ${port}`)
})
