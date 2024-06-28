module.exports = function(RED) {
    const dataForge = require('data-forge');

    function RenameSeriesNode(config) {
        RED.nodes.createNode(this, config);
        this.seriesMappings = JSON.parse(config.seriesMappings);
        let node = this;

        node.on('input', function(msg) {
            const df = new dataForge.DataFrame(msg.payload);
            const renamedData = df.renameSeries(node.seriesMappings);

            msg.payload = renamedData.toArray();
            msg.dataFrame = renamedData;
            node.send(msg);
        });
    }

    RED.nodes.registerType("renameSeries", RenameSeriesNode);
}