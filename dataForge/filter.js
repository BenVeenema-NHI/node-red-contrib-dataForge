module.exports = function(RED) {
    const dataForge = require('data-forge');

    const debuglength = RED.settings.debugMaxLength || 1000;

    function FilterNode(config) {
        RED.nodes.createNode(this, config);

        this.conditions = config.conditions;
        let node = this;

        node.on('input', function(msg) {
            const df = new dataForge.DataFrame(msg.payload);

            const conditionFunction = new Function('row', `return ${node.conditions};`);

            const filteredData = df.filter(conditionFunction);

            msg.payload = filteredData.toArray();
            msg.dataFrame = filteredData;
            node.send(msg);
        });
    }

    RED.nodes.registerType("filter", FilterNode);
}