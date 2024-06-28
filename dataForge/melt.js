module.exports = function(RED) {
    const dataForge = require('data-forge');
    function MeltNode(config) {
        RED.nodes.createNode(this,config);

        // Store local copies of the node configuration (as defined in the .html)
        this.idColumns = config.idColumns.split(",").map(column => column.trim());
        this.valueColumns = config.valueColumns ? config.valueColumns.split(",") : null;
        let node = this;

        // Handle incoming messages
        node.on('input', function(msg) {
            // if msg.dataFrame is set, use that as the payload and deserialize it to a dataframe
            // if not, use msg.payload as the payload
            const df = msg.dataFrame ? dataForge.DataFrame.deserialize(msg.dataFrame) : new dataForge.DataFrame(msg.payload);

            // Define an array of column names that we want to keep in the pivoted data
            const idColumns = node.idColumns;

            // Get all the keys from the first object in the payload array
            // Filter out the keys that are present in the idColumns array
            // const valueColumns = node.valueColumns || Object.keys(msg.payload[0]).filter(key => !idColumns.includes(key));
            const valueColumns = Object.keys(msg.payload[0]).filter(key => !node.idColumns.includes(key));

            // Unpivot the data
            const longData = df.melt(idColumns, valueColumns);

            // Set the payload property to the unpivoted dataframe, converted to an array. Node-Red can't handle the dataframe object
            // Set the dataFrame property to the dataframe object. This can be used in the next node to continue processing the data
            msg.payload = longData.toArray();
            msg.dataFrame = longData.serialize();
            node.send(msg);
        });
    }
    RED.nodes.registerType("melt",MeltNode);
}