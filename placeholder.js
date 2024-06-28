  // Create a dataframe from the payload
  const df = new dataForge.DataFrame(msg.payload);

  // Define an array of column names that we want to keep in the pivoted data
  const columnsToKeep = ["CustomerPartNumber", "CustomerDescription", "Unit"];

  // Get all the keys from the first object in the payload array
  // Filter out the keys that are present in the columnsToKeep array
  const columnsToPivot = Object.keys(msg.payload[0]).filter(key => !columnsToKeep.includes(key));

  // Unpivot the data
  const longData = df.melt(columnsToKeep, columnsToPivot);

  // Drop rows where the value is 0
  const filteredData = longData.filter(row => row["value"] !== 0);

  // Rename value row to QTY and variable to DueDate
  const renamedData = filteredData.renameSeries({ "value": "QTY", "variable": "DueDate" });

  // Set the sourceData property of the msg object to the original dataframe and the payload property to the unpivoted dataframe
  // They should be converted to arrays because Node-Red can't handle the data-forge dataframe object
  msg.sourceData = df.toArray();
  msg.payload = renamedData.toArray();

  return msg;


  msg.payload = new dataForge.DataFrame(msg.payload).toCSV();