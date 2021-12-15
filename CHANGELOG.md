### 2.1.0
+ [x] Added data from Mina Explorer: latest block, current block height
+ [x] Added information about Mina Monitor Version for each node

### 2.0.3
+ [x] Fixed adding health alert class
+ [x] Minor visual improvements 

### 2.0.2
+ [x] Next block info updates only from synced nodes
+ [x] Fixed displaying cpu temp when no cores 
+ [x] Added multi-currency support
+ [x] Fixed update rewards for new epoch
+ [x] Fixed displaying uptime position group places

### 2.0.1
+ [x] Added config parameter `explorer: "staketab"|"mina"`
+ [x] Added link for addresses to StakeTab Validator Dashboard or Mina Explorer, use config param `explorer`
+ [x] Added a timestamp when the data was updated for uptime and blockchain data

### 2.0.0
+ [x] Changed protocol to websocket
+ [x] Improved **price** visualization
+ [x] Improved **uptime** block
+ [x] Added config parameter `precision`, now you control balance precision, default `4`
+ [x] Config parameters `price:*`, `intervals:*`, `blockDiff`, `timesToSwitchNode` deprecated
+ [x] To set using host via `HTTPS/WSS` use parameter `https` instead of `secure` in `nodes`
+ [x] Added supercharge info to rewards
+ [x] Added config parameters `coinbase:regular`, `coinbase:supercharge` 

### 1.0.4
+ [x] Increased chart size to 100 points
+ [x] Added node response chart
+ [x] Cluster get price from Monitor Server, so you can set different currencies on the server and see price for defined ones

### 1.0.3
+ [x] Added node `response time` indicator
+ [x] Added info about BP and SW to node panel
+ [x] Mode for `two` and `one` node
+ [x] Updated for using new responses
 
### 1.0.2
+ [x] Fixed calculating next block
+ [x] Improved next block visibility

### 1.0.1
+ [x] Fixed memory leaks for setTimeout circular links
+ [x] Added process memory usage chart

### 1.0.0
First release