<p align="center">
    <img src="https://pimenov.com.ua/assets/project-images/mina-monitor-cluster-banner.jpg">
</p>  
  
# mina-monitor-cluster
Mina Monitor is an extended graphical version of the `mina client status` command with additional indicators.
The Monitor shows a Mina network status and health of mina nodes (up to 3x and more nodes in one frame).
This is an extended version of [Mina Monitor](https://github.com/olton/mina-node-monitor).


**Important!**
> For using Mina Monitor Cluster you must install actual (>=2.0.0) [Mina Monitor Server Side](https://github.com/olton/mina-node-monitor) to the required Mina nodes.


## Key Features

- [x] Display of the main indicators of the Mina network (Block height, uptime, epoch and slot info)
- [x] Displaying the status of the node daemon (SYNCED, CATCHUP, BOOTSTRAP, ...)
- [x] Displaying the health of node (OK, Fork, Hanging)
- [x] Displaying the server resources consumed by the node (CPU, RAM, NETWORK)
- [x] Displaying the balance of the specified address and the value of this balance in different currencies
- [x] Displaying information about delegations to the specified validator address
- [x] Displaying information about blocks won and rewards received in the current era
- [x] Displays general information about the site server
- [x] Convenient live graphs for displaying consumed resources
- [x] Responsive interface (It is comfortable to look at both PC and phone and tablet)
- [x] Displaying the status of several nodes on one page
- [x] Cyclic bypass of nodes, polling of general information for the address is carried out sequentially from synchronized nodes
- [x] Displaying the response rate of a GraphQL node to the main request


## Installation

### Install via Bash

To install default `master` branch into folder `~/mina-monitor-cluster`, you can use command:

```shell
curl -s https://raw.githubusercontent.com/olton/scripts/master/mina/monitor/cluster/install.sh | bash -s
```

If you need to install specified branch or tag into a specified folder, you must define ones on the end of command:

```shell
curl -s https://raw.githubusercontent.com/olton/scripts/master/mina/monitor/cluster/install.sh | bash -s -- branch_or_tag target_folder
```

***Important! If you need to specify the target folder, you must indicate a branch or tag.***

### Run
To run client:
```shell
npm start
```

### Install via Docker

To install Server via Docker, please read [DOCKER.md](DOCKER.md)

### Install `Mina Monitor Cluster` sources from GitHub

Clone repository to your computer
```shell
git clone https://github.com/olton/mina-monitor-cluster.git
``` 

Install dependencies
```shell
cd mina-monitor-cluster
npm install
```

### Create config file
To create config file with default parameters, you can run:
```shell
node src/start --no-start
```

or create text file `config.json` in the `src` folder manually. Below you can see example of the `config`:
```json
{
    "nodes": [
        {
            "name": "Alpha",
            "host": "host1:8000",
            "https": false
        },
        {
            "name": "Beta",
            "host": "host2:8000",
            "https": false
        },
        {
            "name": "Gamma",
            "host": "host3:8000",
            "https": false
        }
    ],
    "theme": "auto",
    "chartLabels": false,
    "precision": 4,
    "coinbase": {
        "regular": 720,
        "supercharge": 1440
    }
}
```

> In the `host` property you must define addresses of the Mina Monitor Server interfaces.

Run Monitor
```shell
npm start
```

If you want to install the `Monitor` to the `web server`, you must first **compile** the files.
To compile files run command
```shell
npm run build
```

After the command will execute, in folder `build` you can find files, which you can put into a web server.