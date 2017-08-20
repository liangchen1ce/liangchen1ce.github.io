(function (){
  var VIZ = {};
  
  var graphList = [];

  var format = d3.time.format("%Y-%m-%d");

  var margin = {top: 20, right: 80, bottom: 30, left: 80},
      width  = 1000 - margin.left - margin.right,
      height = 500  - margin.top  - margin.bottom;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height-10, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3.time.years, 2);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  
  var svg = d3.select("#chart").append("svg")
      .attr("id", "thesvg")
      .attr("viewBox", "0 0 1000 500")
      .attr("width",  width  + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  VIZ.chart = function (csvpath, color, offset, chartType, rank) {
    VIZ.clearAll();
    d3.csv("data/" + csvpath, function(data) {
      if (chartType == "stream") {
        VIZ.percentageChart($.extend(true, [], data), color, offset, rank);
      } else if (chartType == "line") {
        VIZ.lineChart($.extend(true, [], data), rank);
      }
    });
  };

  VIZ.lineChart = function (data, rank) {
    var datearray = [];
    var color = d3.scale.category20().domain(d3.range(100));

    var line = d3.svg.line()
        .interpolate("cardinal")
        .x(function(d) { return x(d.date); })
        .y(function (d) { return y(d.value); });

    var nest = d3.nest()
        .key(function(d) { return d.key; });

    data.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value = +d.value;
    });

    var layers = nest.entries(data);

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var series = svg.selectAll(".series")
        .data(layers)
        .enter().append("g")
        .attr("class", "series");

    series.append("path")
      .attr("class", "line")
      .attr("d", function (d) { return line(d.values); })
      .style("stroke", function (d) { return color(d.key); })
      .style("stroke-width", "4px")
      .style("fill", "none");

    svg.selectAll(".series")
        .on("mousemove", function(d, i) {
          mousex = d3.mouse(this);
          mousex = mousex[0];
          var invertedx = x.invert(mousex);
          
          invertedx = [invertedx.getFullYear(), invertedx.getMonth(), Math.round(invertedx.getDate()/10)];

          var selected = (d.values);
          var scores = [];
          for (var k = 0; k < selected.length; k++) {
            datearray[k] = selected[k].date;
            datearray[k] = [datearray[k].getFullYear(), datearray[k].getMonth(), Math.round(datearray[k].getDate()/10)];
            scores.push(0);
            for (var j = 0; j < 3; j++) {
              if (datearray[k][j] == invertedx[j]) {
                scores[k]++;
              }

            }
          }

          mousedate = scores.indexOf(3);
          pro = d.values[mousedate].value;

          d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px");
          
          tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");
      
        })
        .on("click", function(d, i) {
          if (rank == "base") {
              var tag = d.key;
              VIZ.chart("data_" + tag + ".csv", "", "", "line", "nonbase");
          } else if (rank == "nonbase") {
              VIZ.chart("data.csv", "", "", "line", "base");
          }
        });
  };

  VIZ.percentageChart = function (data, color, offset, rank) {
    var datearray = [];
    var colorrange = [];

    // set color
    if (color == "blue") {
      colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
    }
    else if (color == "pink") {
      colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
    }
    else if (color == "orange") {
      colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
    }
    strokecolor = colorrange[0];

    var z = d3.scale.ordinal()
        .range(colorrange);

    var stack = d3.layout.stack()
        .offset(offset)
        .values(function(d) { return d.values; })
        .x(function(d) { return d.date; })
        .y(function(d) { return d.value; });

    var nest = d3.nest()
        .key(function(d) { return d.key; });

    var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

    data.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value = +d.value;
    });

    var layers = stack(nest.entries(data));

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.selectAll(".layer")
        .data(layers)
        .enter().append("path")
        .attr("class", "layer")
        .attr("d", function(d) { return area(d.values); })
        .style("fill", function(d, i) { return z(i); });

    svg.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function(d, i) {
          svg.selectAll(".layer")
          // .transition()
          // .duration(250)
          .attr("opacity", function(d, j) {
            return j != i ? 0.6 : 1;
          })
        })
        .on("mousemove", function(d, i) {
          mousex = d3.mouse(this);
          mousex = mousex[0];
          var invertedx = x.invert(mousex);

          invertedx = [invertedx.getFullYear(), invertedx.getMonth(), Math.round(invertedx.getDate()/10)];

          var selected = (d.values);
          var scores = [];
          for (var k = 0; k < selected.length; k++) {
            datearray[k] = selected[k].date;
            datearray[k] = [datearray[k].getFullYear(), datearray[k].getMonth(), Math.round(datearray[k].getDate()/10)];
            scores.push(0);
            for (var j = 0; j < 3; j++) {
              if (datearray[k][j] == invertedx[j]) {
                scores[k]++;
              }
            }
          }

          mousedate = scores.indexOf(3);
          pro = d.values[mousedate].value;

          d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px");
          
          tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");
      
        })
        .on("mouseout", function(d, i) {
          svg.selectAll(".layer")
             // .transition()
             // .duration(250)
             .attr("opacity", "1");

          d3.select(this)
            .classed("hover", false)
            .attr("stroke-width", "0px");
          
          tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
        })
        .on("click", function(d, i) {
            graphList.push([color, rank]);
            if (color == "blue") {
              if (rank == "base") {
                var tag = d.key;
                VIZ.chart("data_normalized_" + tag + ".csv", color, offset, "stream", "nonbase");
              } else if (rank == "nonbase") {
                VIZ.chart("data_normalized.csv", color, offset, "stream", "base");
              }
            } else if (color == "orange") {
              if (rank == "base") {
                var tag = d.key;
                VIZ.chart("data_" + tag + ".csv", color, offset, "stream", "nonbase");
              } else if (rank == "nonbase") {
                VIZ.chart("data.csv", color, offset, "stream", "base");
              }
            } else if (color == "pink") {
              if (rank == "base") {
                var tag = d.key;
                VIZ.chart("data_" + tag + ".csv", color, offset, "stream", "nonbase");
              } else if (rank == "nonbase") {
                VIZ.chart("data.csv", color, offset, "stream", "base");
              }
            }
        });
  };

  VIZ.clearAll = function () {
    svg.selectAll("*").remove();
  };

  window.VIZ = VIZ;

}())