# Welcome to Mina Monitor Docker part
Start from 2.0.0 you can use docker container with Mina Monitor Cluster.

### Run container
```shell
sudo docker run \ 
  --rm \ 
  --name mina_monitor_cluster \
  -p 2222:2222 \
  -d olton/mina_monitor_cluster:latest \
  -nodes 1.1.1.1:8000
  -nodes 2.2.2.2:8000:true
  -theme dark
```

### Set Mina Monitor Server parameters
you can redefine config parameters with command line arguments:
- `-nodes` - define Mina Monitor Server `name:host_or_ip:port:secure`, you can define several hosts
- `-theme` - set client theme, default `auto`
- `-chartLabels` - show\hide chart labels, default `false`
- `-precision` - Mina values precision, default `4`
- `-coinbase:regular` - Mina coinbase regular, default `720`
- `-coinbase:supercharge` - Mina coinbase supercharge, default `1440`

This command overwrite three config parameters:

```json
{
    "nodes": [
        {
            "name": "Alpha", // name
            "host": "host_or_ip:port", // host:port
            "https": false // secure http or https
        },
        ...
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
