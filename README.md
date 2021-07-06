<p align="center">
    <img src="https://pimenov.com.ua/assets/project-images/mina-monitor-cluster-06-07-2021.jpg">
</p>  
  
# mina-monitor-cluster
Mina Monitor is an extended graphical version of the `mina client status` command with additional indicators.
The Monitor shows a Mina network status and health of mina nodes (up to 3x nodes in one frame).
This is an extended version of [Mina Monitor](https://github.com/olton/mina-node-monitor).

## Installation
To install `Monitor`:

Clone repository to your computer
```shell
git clone https://github.com/olton/mina-monitor-cluster.git
``` 

Install dependencies
```shell
cd mina-monitor-cluster
npm install
```

Create config file `config.json` in the `src` folder. Below you can see example of the `config`:
```json
{
    "theme": "auto",
    "nodes": [
        {
            "name": "server1",
            "host": "ip_address:port",
            "secure": false
        },
        {
            "name": "server2",
            "host": "ip_address:port",
            "secure": false
        },
        {
            "name": "server3",
            "host": "ip_address:port",
            "secure": false
        }
    ],
    "intervals": {
        "system": 60000,
        "daemon": 30000,
        "resources": 2000
    },
    "uptime": {
        "update_interval": 600000,
        "address": "B62qr..."
    },
    "price": {
        "currency": "usd",
        "update_interval": 60000
    },
    "blockDiff": 2
}
```

In the `host` property you must define addresses of the Mina Monitor Server interfaces.
In the `uptime.address` you must define address for which it is necessary to obtain information about the position in the `uptime rating`.

Run Monitor
```shell
npm run
```

If you want to install the `Monitor` on a `web server`, you must first **compile** the files.
To compile files run command:
```shell
npm run build
```
After the command will execute, in folder `build` you can find files, which you can put into a web server.