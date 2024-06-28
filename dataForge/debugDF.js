module.exports = function(RED) {
    const dataForge = require('data-forge');

    const debuglength = RED.settings.debugMaxLength || 1000;

    function DebugDFNode(config) {
        RED.nodes.createNode(this, config);

        this.conditions = config.conditions;
        this.active = config.active;
        let node = this;

        node.on('input', function(msg) {
            if(node.active === false)  return;
            
            const df = new dataForge.DataFrame(msg.payload);
            
            debugMSG = RED.util.encodeObject(
                {id:node.id, z:node.z, _alias: node._alias,  path:node._flow.path, name:node.name, topic:msg.topic, msg:df},
                {maxLength:debuglength});
            RED.comms.publish("debug",debugMSG);
        });
    }

    RED.nodes.registerType("debugDF", DebugDFNode);
}