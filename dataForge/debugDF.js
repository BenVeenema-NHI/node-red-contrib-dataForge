module.exports = function(RED) {
    const dataForge = require('data-forge');

    const debuglength = RED.settings.debugMaxLength || 1000;

    function DebugDFNode(config) {
        RED.nodes.createNode(this, config);

        this.conditions = config.conditions;
        this.active = config.active;
        let node = this;

        node.on('input', function(msg) {
            // if node is not active, prevent the printing of debug messages
            if(node.active === false)  return;
            
            // if msg.dataFrame is set, use that as the payload and deserialize it to a dataframe
            // if not, use msg.payload as the payload
            const df = msg.dataFrame ? dataForge.DataFrame.deserialize(msg.dataFrame) : new dataForge.DataFrame(msg.payload);
            
            debugMSG = RED.util.encodeObject(
                {id:node.id, z:node.z, _alias: node._alias,  path:node._flow.path, name:node.name, topic:msg.topic, msg:df},
                {maxLength:debuglength});
            RED.comms.publish("debug",debugMSG);
        });
    }

    RED.nodes.registerType("debugDF", DebugDFNode);
}