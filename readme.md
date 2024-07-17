# Node-RED Contrib Data-Forge

This Node-RED package, `@nhi/node-red-contrib-data-forge`, provides a collection of nodes designed to facilitate data science tasks within Node-RED using the Data-Forge library. It includes nodes for filtering, melting data, renaming series (columns), and a custom debug node for displaying Data-Forge dataframes in a table format.

## Features
More functions from Data-Forge will be added over time, as of release 0.0.1 the following nodes/functions are avilable:
- **Filter**: Allows filtering of data based on specified criteria.
- **Melt**: Transforms data from wide format to long format.
- **Rename Series**: Enables renaming of one or more series (columns) in a DataFrame.
- **toCSV**: Converts data to CSV format for export or further processing.
- **DebugDF**: A custom debug node tailored for visualizing Data-Forge DataFrames in a user-friendly table format.

## Installation

To install this package, you can use Node-RED's Palette Manager or run the following command in your Node-RED user directory (typically `~/.node-red`):

```bash
npm install @nhi/node-red-contrib-data-forge
```

## Dependencies
This package relies on the following NPM packages:

- data-forge: A powerful data manipulation and analysis library for JavaScript.
After installation, the nodes will be available in the Node-RED editor under the dataForge category. Drag and drop the nodes into your flow and configure them according to your data processing needs.

## Contributing
Contributions to this package are welcome. Please ensure that your contributions adhere to the following guidelines:

- Follow existing coding styles and practices.
- Update the README.md with details of changes to the interface or significant functionality.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Ashley Davis and the Data-Forge library, for providing the data manipulation capabilities.