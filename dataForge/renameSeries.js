module.exports = function(RED) {
    const dataForge = require('data-forge');

    function RenameSeriesNode(config) {
        RED.nodes.createNode(this, config);
        this.seriesMappings = JSON.parse(config.seriesMappings);
        let node = this;

        node.on('input', function(msg) {
            // if msg.dataFrame is set, use that as the payload and deserialize it to a dataframe
            // if not, use msg.payload as the payload
            const df = msg.dataFrame ? dataForge.DataFrame.deserialize(msg.dataFrame) : new dataForge.DataFrame(msg.payload);

            const renamedData = df.renameSeries(node.seriesMappings);

            msg.payload = renamedData.toArray();
            msg.dataFrame = renamedData.serialize();
            node.send(msg);
        });
    }

    RED.nodes.registerType("renameSeries", RenameSeriesNode);
}