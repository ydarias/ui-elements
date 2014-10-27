var rangeChart = rangeChart || {};

(function() {

    var lines = '<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div>';

    function composeChartLine() {
        var dataInfo = '<div class="data-info"><div class="graph" style="width: 37.8%; height: 15px; background-color: green; border: 1px solid green; left: 10%;"></div></div>';
        return '<div class="range-chart-row">' + lines + dataInfo + '</div>';
    }

    function createChart() {
        return '<div class="range-chart">' + composeChartLine() + composeChartLine() + composeChartLine() + '</div>';
    }

    rangeChart.createChart = createChart;

})();