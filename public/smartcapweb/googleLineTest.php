<html>
<head><script type="text/javascript" src="https://www.google.com/jsapi"></script></head>
<body>

    <div id="linechart_material"></div>
    
    <script type="text/javascript">
    google.load('visualization', '1.1', {packages: ['line']});
    google.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn({type: 'date', id: 'Date'});
      data.addColumn({type: 'number', id:'Time'});

      data.addRows([
        [ new Date(2011,01,25),  9],
        [ new Date(2011,01,26),  10],
        [ new Date(2011,01,27),  11],
        [ new Date(2011,01,28),  12],
        [ new Date(2011,01,29),  13],
        [ new Date(2011,01,30),  8],
        [ new Date(2011,01,31),  9],
        [ new Date(2011,02,1),  19],
      ]);

      var options = {
        chart: {
          title: 'Every Day Pill take time'
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, options);
    }
  </script>
</body>
</html>