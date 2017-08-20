(function (){
  var VIZ = {};
  var audio = $("<audio>");

  // vis on right top
  var margin = {top: 10, right: 80, bottom: 30, left: 70},
      labelSpace = 40,
      width  = 400,
      height = 300,
      innerMargin = width/2+labelSpace,
      outerMargin = 15,
      gap = 7,
      numOfTop = 10;

  /* edit with care */
  var chartWidth = width - innerMargin - outerMargin,
      barWidth = height / numOfTop,
      yScale = d3.scale.linear().domain([-0.5, numOfTop]).range([0, height-margin.top]),
      total = d3.scale.linear().domain([1, numOfTop + 1]).range([width - 1.5 * labelSpace, 0]),
      commas = d3.format(",.0f");


  var vis = d3.select("#word-bars").append("svg")
              .attr("width", width)
              .attr("height", height);

  // vis on right down
  var parseDate = d3.time.format("%Y").parse;
  var height_down = 250,
      width_down = 380;
  var x = d3.time.scale()
            .range([0, width_down]);

  var y = d3.scale.linear()
            .range([height_down, 0]);

  var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

  var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

  var line = d3.svg.line()
               .x(function(d) { return x(d.date); })
               .y(function(d) { return y(d.count); });

  var data_word_count;
  d3.json("data/wordchart.json", function(error, json) {
    if (error) return console.warn(error);

    data_word_count = json;
  });

  var vis_down = d3.select("#word-chart").append("svg")
                   .attr("width", width_down + margin.left + margin.right)
                   .attr("height", height_down + margin.top + margin.bottom)
                   .append("g")
                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  VIZ.bar = function (color, data) {
    VIZ.clearAll();

    var bar = vis.selectAll("g.bar")
                 .data(data)
                 .enter().append("g")
                 .attr("class", "bar")
                 .attr("transform", function(d, i) {
                   return "translate(0," + (yScale(i) + margin.top) + ")";
                 })
                 .on("click", click);

    bar.append("text")
        .attr("class", "below")
        .attr("x", 52)
        .attr("dy", "1.2em")
        .attr("text-anchor", "left")
        .text(function(d) {
            return d.word;
        })
        .style("fill", "#000000");

    bar.append("rect")
        .attr("class", "malebar")
        .attr("height", barWidth-gap)
        .attr("x", 50)
        .attr("width", function(d) { return total(d.word_rank); })
        .style("fill", color);

    bar.append("svg")
        .attr({
            height: barWidth-gap
        })
        .attr("width", function(d) { return total(d.word_rank) - 2 ; })
        .attr("x", 52)
        .append("text")
        .attr("class", "up")
        .attr("dy", "1.2em")
        .attr("text-anchor", "left")
        .text(function(d) { return d.word; })
        .style("fill", "#ffffff");

    bar.on("mouseover", mouseover);

    // add transition
    d3.select("#word-bars").select("svg")
                           .attr("width", 0)
                           .transition().duration(500)
                           .attr('width', 400);

    function click(d) {
      d3.select("#note").style("visibility", "");
      d3.select("#word").text(d.word);

      VIZ.chart(d.word, color);
    }

    function mouseover(d, i) {
        // remove all other infoAndPreview groups, so only 1 group will display
        var currentGroup = document.body.getElementsByClassName("bar")[i];
        if (currentGroup.getElementsByClassName("infoAndPreview").length) return;
        if (document.getElementsByClassName("infoAndPreview").length) {
            d3.selectAll(".infoAndPreview").remove();
        }

        var this_group = d3.select(this)
                           .append("svg")
                           .attr("class", "infoAndPreview");

        var fill = "#252525";
        this_group.append("rect")
           .attr("height", barWidth-gap)
           .style("fill", fill)
           .attr("width", 50)
           .style("opacity", "0.5");

        var preview = this_group.append("g").attr("id", "preview").style("opacity", "0").attr("stat", "Finding preview...");
        preview.append("text")
                .attr("x", 8)
                .attr("dy", "1.2em")
                .attr('font-family', 'FontAwesome')
                .attr('font-size', function(d) { return '1em'} )
                .text(function(d) { return '\uf001' });
        preview.append("rect")
               .attr("height", barWidth-gap)
               .attr("x", 7)
               .attr("width", "15px")
               .style("opacity", "0")
               .on("click", function() { playTrack(d.spotify_id); });
        // add tooltip
        $(document.getElementById("preview")).tipsy({
            delayOut: 100,
            fade: true,
            opacity: 0.7,
            html: true,
            title: "stat"
        });
        console.log(d.spotify_id);
        if (!d.spotify_id) {
            preview.attr("stat", "No preview found");
        }
        var url = "https://api.spotify.com/v1/tracks/" + d.spotify_id;
        $.getJSON(url, function(data) {
            console.log("got data");
            var preview_url = data.preview_url;
            if (preview_url === null) {
                preview.attr("stat", "No preview found");
            } else if (preview_url === undefined) {
                preview.attr("stat", "Finding preview...");
            } else {
                preview.attr("stat", "Click to play");
            }
        });

        var info = this_group.append("g").attr("id", "info").style("opacity", "0");
        info.append("text")
                .attr("x", 30)
                .attr("dy", "1.2em")
                .attr('font-family', 'FontAwesome')
                .attr('font-size', function(d) { return '1em'} )
                .text(function(d) { return '\uf05a' });
        info.append("rect")
               .attr("height", barWidth-gap)
               .attr("x", 29)
               .attr("width", "15px")
               .style("opacity", "0");
        // add tooltip
        $(document.getElementById("info")).tipsy({
            delayOut: 100,
            fade: true,
            opacity: 0.7,
            html: true,
            title: function() {
                return "Word in Song<br/> Title: " + d.title + "<br/>Artist: " + d.artist;
            }
        });

        // add transitions
        this_group.select("rect").attr("width", 0).attr("x", 50)
                  .transition().duration(300)
                  .attr("width", 50).attr("x", 0);
        preview.transition().duration(1000).style("opacity", "1");
        info.transition().duration(1000).style("opacity", "1");

    }

    function playTrack(ID) {
        var url = "https://api.spotify.com/v1/tracks/" + ID;
        $.getJSON(url).then(
            function(response) {
                play_(response.preview_url);
            },
            function() {
                error('get top track trouble');
            }
        );
    }

    function play_(url) {
      audio.attr('src', url);
      console.log(url);
      audio.get(0).play();
    }
  };

  VIZ.chart = function(word, color) {
      vis_down.selectAll("*").remove();
      data_word_count[word].forEach(function(d) {
        if (typeof d.date == "string") { d.date = parseDate(d.date); }
        d.count = +d.count;
      });

      x.domain(d3.extent(data_word_count[word], function(d) { return d.date; }));
      y.domain(d3.extent(data_word_count[word], function(d) { return d.count; }));

      vis_down.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height_down + ")")
              .call(xAxis);

      vis_down.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Count");

      vis_down.append("path")
              .datum(data_word_count[word])
              .attr("class", "line")
              .attr("d", line);
  };

  VIZ.clearAll = function () {
    vis.selectAll("*").remove();
    vis_down.selectAll("*").remove();
    d3.select("#note").style("visibility", "hidden");
  };

  window.VIZ = VIZ;

}());