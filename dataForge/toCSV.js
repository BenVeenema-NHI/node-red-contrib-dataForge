module.exports = function(RED) {
    const dataForge = require('data-forge');
    function ToCSVNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;

        node.on('input', function(msg) {
            const df = msg.dataFrame ? dataForge.DataFrame.deserialize(msg.dataFrame) : new dataForge.DataFrame(msg.payload);
            const csvData = df.toCSV();

            msg.payload = csvData;
            msg.dataFrame = df.serialize();
            node.send(msg);
        });
    }
    RED.nodes.registerType("toCSV", ToCSVNode);
}