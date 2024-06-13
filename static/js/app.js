// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(sample);
    // get the metadata field
    let metadata = data.metadata;


    // Filter the metadata for the object with the desired sample number
    let resultsample = metadata.filter(sampledata => sampledata.id == sample);
    let result = resultsample[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in result) {
      panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let dataSamples = data.samples

    // Filter the samples for the object with the desired sample number
    let resultArray = dataSamples.filter(results => results.id == sample)
    let results = resultArray[0]

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = results.otu_ids
    let sample_values = results.sample_values
console.log(results)

    //     // Build a Bubble Chart
    //     let trace = {title:,
    // x:otu_ids, 
    // y:otu_labels}]
    //       let layout = {}
    
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids, 
        colorscale: "Earth"
      }
    };
    
    var trace = [trace1];
    
    var layout = {
      margin: {t:0},
      title: 'Bacteria Cultures per Sample',
      showlegend: false,
      margin: {t:30}, 
      xaxis: {title: "OTU ID"}, 
      yaxis: {title: "Number of Bacteria"}

    };
    


    //     // Render the Bubble Chart
  Plotly.newPlot("bubble", trace, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(otuID => `OTU ${otuID} `);
    var trace2 = {
      x: sample_values.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      type: 'bar',
      orientation:
      "h"
    };
    
    var trace3 = [trace2];
    
    var layout2 = {
      title: 'Bacteria Cultures per Sample',
      margin: {t:30, l:150}, 
      xaxis: {title: "OTU ID"}, 

    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    Plotly.newPlot("bar", trace3, layout2);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    // for loop iterate over the names
    for (let i = 0; i < names.length; i++) {

      dropdown.append('option').text(names[i]).property("value", names[i])

    }

    // Get the first sample from the list
    let morrie = names[0]

    // Build charts and metadata panel with the first sample
    buildCharts(morrie);
    buildMetadata(morrie);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
