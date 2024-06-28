module.exports = function(RED) {
    const dataForge = require('data-forge');

    const debuglength = RED.settings.debugMaxLength || 1000;

    function FilterNode(config) {
        RED.nodes.createNode(this, config);

        this.conditions = config.conditions;
        let node = this;

        node.on('input', function(msg) {
            // if msg.dataFrame is set, use that as the payload and deserialize it to a dataframe
            // if not, use msg.payload as the payload
            const df = msg.dataFrame ? dataForge.DataFrame.deserialize(msg.dataFrame) : new dataForge.DataFrame(msg.payload);

            const conditionFunction = new Function('row', `return ${node.conditions};`);

            const filteredData = df.filter(conditionFunction);

            msg.payload = filteredData.toArray();
            msg.dataFrame = filteredData.serialize();
            node.send(msg);
        });
    }

    RED.nodes.registerType("filter", FilterNode);
}